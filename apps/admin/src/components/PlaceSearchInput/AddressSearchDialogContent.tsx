import { useEffect, useRef } from 'react';

const POSTCODE_SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

interface DaumPostcodeData {
  roadAddress: string;
  address: string;
  zonecode: string;
}

interface DaumPostcodeConstructor {
  new (options: {
    oncomplete: (data: DaumPostcodeData) => void;
    width: string | number;
    height: string | number;
  }): { embed: (element: HTMLElement) => void };
}

declare global {
  interface Window {
    daum?: { Postcode: DaumPostcodeConstructor };
  }
}

let scriptPromise: Promise<void> | null = null;

const loadPostcodeScript = () => {
  if (window.daum?.Postcode) {
    return Promise.resolve();
  }
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = POSTCODE_SCRIPT_URL;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error('우편번호 스크립트 로드 실패'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
};

interface AddressSearchDialogContentProps {
  /** 도로명주소 선택 시 호출. 좌표 변환은 호출 측(PlaceSearchInput)에서 처리한다. */
  onComplete: (roadAddress: string) => void;
}

// 다음 우편번호 서비스를 다이얼로그 안에 embed 하고, 선택한 도로명주소를 상위로 전달한다.
const AddressSearchDialogContent = ({ onComplete }: AddressSearchDialogContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadPostcodeScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.daum?.Postcode) {
          return;
        }
        containerRef.current.innerHTML = '';
        new window.daum.Postcode({
          width: '100%',
          height: '100%',
          oncomplete: (data) => onComplete(data.roadAddress || data.address),
        }).embed(containerRef.current);
      })
      .catch(() => {
        // 스크립트 로드 실패는 조용히 무시한다. 사용자는 공연장명 검색으로 대체 가능.
      });
    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return <div ref={containerRef} style={{ width: '100%', height: 466 }} />;
};

export default AddressSearchDialogContent;

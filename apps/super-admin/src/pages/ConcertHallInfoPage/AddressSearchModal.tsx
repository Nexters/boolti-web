import { Modal } from 'antd';
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
        reject(new Error('카카오 우편번호 스크립트 로드 실패'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
};

interface AddressSearchModalProps {
  open: boolean;
  onClose: () => void;
  /** 도로명주소 선택 시 호출. 호출 측에서 모달을 닫는다. */
  onComplete: (roadAddress: string) => void;
  /** 닫힘 애니메이션 완료 후 호출 — 상세주소 포커스는 이 시점에 해야 antd의 포커스 복원에 덮이지 않는다. */
  afterClose?: () => void;
}

// 카카오(다음) 우편번호 서비스를 embed한 주소 찾기 모달
const AddressSearchModal = ({ open, onClose, onComplete, afterClose }: AddressSearchModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }
    let cancelled = false;
    loadPostcodeScript().then(() => {
      if (cancelled || !containerRef.current || !window.daum?.Postcode) {
        return;
      }
      containerRef.current.innerHTML = '';
      new window.daum.Postcode({
        width: '100%',
        height: '100%',
        oncomplete: (data) => {
          onComplete(data.roadAddress || data.address);
        },
      }).embed(containerRef.current);
    });
    return () => {
      cancelled = true;
    };
  }, [open, onComplete]);

  return (
    <Modal
      title="주소 찾기"
      open={open}
      onCancel={onClose}
      footer={null}
      width={490}
      focusTriggerAfterClose={false}
      afterClose={afterClose}
    >
      <div ref={containerRef} style={{ width: '100%', height: 466, marginTop: 16 }} />
    </Modal>
  );
};

export default AddressSearchModal;

import { NaverGeocodeProvider, useNaverGeocode, type GeocodeCoordinates } from '@boolti/ui';
import { Modal } from 'antd';
import { useEffect, useRef } from 'react';

const NCP_KEY_ID = import.meta.env.VITE_X_NCP_APIGW_API_KEY_ID;

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

type Geocode = (address: string) => Promise<GeocodeCoordinates | null>;

interface AddressSearchModalProps {
  open: boolean;
  onClose: () => void;
  /** 도로명주소 선택 시 호출. 좌표는 지오코딩 실패 시 null. 호출 측에서 모달을 닫는다. */
  onComplete: (roadAddress: string, coordinates: GeocodeCoordinates | null) => void;
  /** 닫힘 애니메이션 완료 후 호출 — 상세주소 포커스는 이 시점에 해야 antd의 포커스 복원에 덮이지 않는다. */
  afterClose?: () => void;
}

// 우편번호 서비스 embed + 선택 주소를 네이버 geocode로 좌표 변환
const AddressSearchModalView = ({
  open,
  onClose,
  onComplete,
  afterClose,
  geocode,
}: AddressSearchModalProps & { geocode: Geocode | null }) => {
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
        oncomplete: async (data) => {
          const roadAddress = data.roadAddress || data.address;
          // 우편번호 서비스는 좌표를 주지 않으므로 선택 주소를 네이버 geocode로 변환한다.
          const coordinates = geocode ? await geocode(roadAddress) : null;
          onComplete(roadAddress, coordinates);
        },
      }).embed(containerRef.current);
    });
    return () => {
      cancelled = true;
    };
  }, [open, onComplete, geocode]);

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

// NaverGeocodeProvider 컨텍스트 안에서 geocode 함수를 얻어 View에 주입한다.
const GeocodeEnabledModal = (props: AddressSearchModalProps) => {
  const geocode = useNaverGeocode();
  return <AddressSearchModalView {...props} geocode={geocode} />;
};

// NCP 키가 있으면 네이버 geocode를 붙이고, 없으면 좌표 없이 동작한다.
// 키 유무는 런타임 고정값이라 트리 구조가 바뀌지 않는다(모달 애니메이션 보존).
const AddressSearchModal = (props: AddressSearchModalProps) => {
  if (NCP_KEY_ID) {
    return (
      <NaverGeocodeProvider ncpKeyId={NCP_KEY_ID}>
        <GeocodeEnabledModal {...props} />
      </NaverGeocodeProvider>
    );
  }
  return <AddressSearchModalView {...props} geocode={null} />;
};

export default AddressSearchModal;

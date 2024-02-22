import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';

import Styled from './EntranceConfirmDialogContent.styles';

const EntranceConfirmDialogContent = () => {
  useBodyScrollLock();
  return (
    <Styled.Container>
      <Styled.Title>QR 스캐너</Styled.Title>
      <Styled.Description>
        {'티켓 한 장당 1개씩 발급되는 QR코드로 빠르고 쉽게 예매자의 입장을 확인해 보세요.' +
          '\n' +
          '각 공연에 부여된 QR 스캐너는 불티앱 ‘마이 > QR 스캔 > 해당 공연’으로 접근할 수 있습니다.'}
      </Styled.Description>
      <Styled.Image src="/qr.png" alt="" />
      <Styled.Seperator />
      <Styled.Title>인증 코드</Styled.Title>
      <Styled.Description>
        {'QR 리더기가 작동하지 않을 때는 인증 코드로 예매자의 입장을 확인해 보세요.' +
          '\n' +
          '각 공연에 부여된 인증 코드는 [앱] 해당 공연의 QR 스캐너 화면, [웹] 공연 상세 > 입장 관리 화면에서 확인 가능하며,' +
          '\n' +
          '예매자 앱 화면 ‘티켓 상세 > 화면 하단 버튼’을 통해 코드 입력 및 인증을 진행할 수 있습니다.'}
      </Styled.Description>
      <Styled.Image src="/code.png" alt="" />
    </Styled.Container>
  );
};

export default EntranceConfirmDialogContent;

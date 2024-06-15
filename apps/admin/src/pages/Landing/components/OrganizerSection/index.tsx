import mobileAdminPreviewImg from '~/assets/images/mobile-admin-preview.png';
import pcAdminPreviewImg from '~/assets/images/pc-admin-preview.png';
import { PATH } from '~/constants/routes';

import Styled from './OrganizerSection.styles';

const OrganizerSection = () => {
  return (
    <Styled.Container>
      <Styled.BackgroundLight />
      <Styled.Title>누구보다 바쁜{'\n'}주최자를 위한 웹</Styled.Title>
      <Styled.Description>
        공연을 등록하고 예매자 명단과{'\n'}
        정산된 수익을 한눈에 확인해 보세요
      </Styled.Description>
      <Styled.Button to={PATH.HOME}>공연 준비하기</Styled.Button>
      <Styled.MobileAdminPrevieImage src={mobileAdminPreviewImg} />
      <Styled.PcAdminPreviewImage src={pcAdminPreviewImg} />
    </Styled.Container>
  );
};

export default OrganizerSection;

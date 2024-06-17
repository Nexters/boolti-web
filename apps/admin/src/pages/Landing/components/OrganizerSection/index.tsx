import createShowImg from '~/assets/images/create-show.png';
import manageEnteranceImg from '~/assets/images/manage-entrance.png';
import mobileAdminPreviewImg from '~/assets/images/mobile-admin-preview.png';
import pcAdminPreviewImg from '~/assets/images/pc-admin-preview.png';
import { PATH } from '~/constants/routes';

import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import FeatureItem from '../FeatureItem';
import Styled from './OrganizerSection.styles';

const OrganizerSection = () => {
  const { ref: sectionRef } = useVisibleSectionAtom('organizer');
  return (
    <Styled.Section ref={sectionRef} id="organizer">
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
      <FeatureItem
        category="공연 등록"
        title={'쉽고 간편한\n공연 등록'}
        description={'예매에 필요한 정보를 입력하고\n판매할 티켓을 생성하면 끝!'}
        position="left"
        imageSrc={createShowImg}
        maxWidth={[360, 712]}
      />
      <FeatureItem
        category="입장 관리"
        title={'언제 어디서든\n빠른 입장 관리'}
        description={'모바일 뷰로 PC를 사용하기 어려운\n공연장에서도 쉽게 입장을 확인해요'}
        position="right"
        imageSrc={manageEnteranceImg}
        maxWidth={[360, 724]}
      />
    </Styled.Section>
  );
};

export default OrganizerSection;

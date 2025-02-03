import { Footer } from '@boolti/ui';

import { Header, KeyVisual, MoreInformation, OrganizerSection, UserSection } from './components';
import Styled from './LandingPage.styles';
import { usePopup } from '@boolti/api';
import usePopupDialog from '~/hooks/usePopupDialog';

const LandingPage = () => {
  const { data: popupData } = usePopup('HOME');
  usePopupDialog(popupData);
  return (
    <>
      <Styled.Container>
        <Header />

        <KeyVisual />

        <OrganizerSection />

        <UserSection />

        <MoreInformation />

        <Styled.FooterContainer>
          <Footer />
        </Styled.FooterContainer>
      </Styled.Container>
    </>
  );
};

export default LandingPage;

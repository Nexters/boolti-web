import { useTheme } from '@emotion/react';

import ticketPreviewImg from '~/assets/images/ticket-preview.png';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';

import { useVisibleSectionAtom } from '../../atoms/visibleSectionAtom';
import Styled from './UserSection.styles';

const UserSection = () => {
  const { ref: sectionRef } = useVisibleSectionAtom('user');
  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  return (
    <Styled.Section ref={sectionRef} id="user">
      <Styled.Container>
        <Styled.Title>빠른 입장을 원하는{'\n'}예매자를 위한 앱</Styled.Title>
        <Styled.Description>
          번거로운 티켓 찾기는 이제 그만!{'\n'}앱에서 바로 티켓을 제시해 보세요
        </Styled.Description>
        <Styled.Button
          colorTheme="primary"
          size={deviceWidth >= parseInt(theme.breakpoint.mobile, 10) ? 'bold' : 'regular'}
        >
          앱 바로가기
        </Styled.Button>
        <Styled.TicketPreviewImage src={ticketPreviewImg} />
      </Styled.Container>
    </Styled.Section>
  );
};

export default UserSection;

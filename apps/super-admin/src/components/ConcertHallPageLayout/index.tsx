import { ConfigProvider } from 'antd';

import Styled from './ConcertHallPageLayout.styles';

/** 카드 body 패딩 (Figma node 9160:11961). ConcertHallInfoPage의 사진 줄 음수 마진과 값이 맞아야 한다. */
export const CARD_BODY_PADDING = 28;

interface ConcertHallPageLayoutProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const ConcertHallPageLayout = ({ title, children, action }: ConcertHallPageLayoutProps) => {
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>{title}</Styled.Title>
        {action && <Styled.ActionArea>{action}</Styled.ActionArea>}
      </Styled.Header>
      <Styled.Content>
        <ConfigProvider theme={{ components: { Card: { paddingLG: CARD_BODY_PADDING } } }}>
          {children}
        </ConfigProvider>
      </Styled.Content>
    </Styled.Container>
  );
};

export default ConcertHallPageLayout;

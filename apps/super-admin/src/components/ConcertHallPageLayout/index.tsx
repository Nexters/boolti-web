import Styled from './ConcertHallPageLayout.styles';

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
      <Styled.Content>{children}</Styled.Content>
    </Styled.Container>
  );
};

export default ConcertHallPageLayout;

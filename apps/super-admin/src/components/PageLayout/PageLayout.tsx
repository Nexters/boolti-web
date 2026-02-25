import Styled from './PageLayout.styles';

interface PageLayoutProps {
  breadscrumb: string;
  title: string;
  description: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const PageLayout = ({ breadscrumb, title, description, children, action }: PageLayoutProps) => {
  return (
    <Styled.Container>
      <Styled.TopRow>
        <Styled.Breadcrumb>{breadscrumb}</Styled.Breadcrumb>
        {action && <Styled.ActionArea>{action}</Styled.ActionArea>}
      </Styled.TopRow>
      <Styled.PageHeader>
        <Styled.PageTitle>{title}</Styled.PageTitle>
        <Styled.PageDescription>{description}</Styled.PageDescription>
      </Styled.PageHeader>
      {children}
    </Styled.Container>
  );
};

export default PageLayout;

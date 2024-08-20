import Styled from './PageLayout.styles';

interface PageLayoutProps {
  breadscrumb: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

const PageLayout = ({ breadscrumb, title, description, children }: PageLayoutProps) => {
  return (
    <Styled.Container>
      <Styled.Breadcrumb>{breadscrumb}</Styled.Breadcrumb>
      <Styled.PageHeader>
        <Styled.PageTitle>{title}</Styled.PageTitle>
        <Styled.PageDescription>{description}</Styled.PageDescription>
      </Styled.PageHeader>
      {children}
    </Styled.Container>
  );
};

export default PageLayout;

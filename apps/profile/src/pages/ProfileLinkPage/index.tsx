import { useParams } from 'react-router-dom';
import Styled from './ProfileLinkPage.styles';
import { ChainLink } from '@boolti/icon';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import { useUserLinks } from '@boolti/api';

export const ProfileLinkPage = () => {
  const { userCode } = useParams<{ userCode: string }>();
  const { data } = useUserLinks(userCode as string);

  return (
    <Layout>
      <Header title="링크" />
      <Styled.Container>
        <Styled.CountText>총 {data?.length || 0}개</Styled.CountText>
        {data?.map((link, index) => (
          <Styled.LinkItem
            key={`${link.link}-${index}`}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Styled.IconWrapper>
              <ChainLink />
            </Styled.IconWrapper>
            <Styled.LinkInfo>
              <Styled.Title>{link.title}</Styled.Title>
            </Styled.LinkInfo>
          </Styled.LinkItem>
        ))}
      </Styled.Container>
    </Layout>
  );
};

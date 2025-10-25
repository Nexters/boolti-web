import Styled from './ProfileLinkPage.styles';
import { ChainLink } from '@boolti/icon';
import Header from '~/components/Header';
import Layout from '~/components/Layout';

const LINKS = [
  {
    id: 1,
    title: 'COLORED (BLACK) 셋리스트',
    description: '불티 프로젝트 공연 셋리스트',
    url: '#',
  },
  {
    id: 2,
    title: 'TUNE HALLOWEEN 셋리스트',
    description: 'Halloween Party Live',
    url: '#',
  },
  {
    id: 3,
    title: 'TUNEFLIX 셋리스트',
    description: '영상 모음 링크',
    url: '#',
  },
  {
    id: 4,
    title: 'link 4',
    description: '추가 링크 설명',
    url: '#',
  },
];

export const ProfileLinkPage = () => {
  return (
    <Layout>
      <Header title="링크" />
      <Styled.Container>
        {LINKS.map((link) => (
          <Styled.LinkItem key={link.id} href={link.url}>
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

import { InstagramIcon, GithubIcon, KakaotalkIcon } from '@boolti/icon';

import Styled from './Footer.styles';

const Footer = () => {
  return (
    <Styled.Container>
      <Styled.Content>
        <Styled.TextGroup>
          <Styled.BoldTtext>
            {'불티' + '\n' + 'Copyright ⓒ Boolti. All Rights Reserved'}
          </Styled.BoldTtext>
          <Styled.Text>
            {'사업자 등록번호 : 120-88-01280 | 대표 : 김혜선 (더미 텍스트)' +
              '\n' +
              '호스팅 서비스 : 주식회사 비바리퍼블리카 | 통신판매업 신고번호 : 2014-서울강남-03377'}
          </Styled.Text>
          <Styled.LinkTextGroup>
            <Styled.Text>
              <Styled.Link>개인정보 처리방침</Styled.Link>
              {` | `}
              <Styled.Link>서비스 이용약관</Styled.Link>
            </Styled.Text>
          </Styled.LinkTextGroup>
        </Styled.TextGroup>
        <Styled.IconGroup>
          <Styled.IconLink>
            <InstagramIcon size={24} />
          </Styled.IconLink>
          <Styled.IconLink>
            <GithubIcon size={24} />
          </Styled.IconLink>
          <Styled.IconLink>
            <KakaotalkIcon size={24} />
          </Styled.IconLink>
        </Styled.IconGroup>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Footer;

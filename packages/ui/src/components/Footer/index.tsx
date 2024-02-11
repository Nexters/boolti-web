import { GithubIcon, InstagramIcon, KakaotalkIcon } from '@boolti/icon';

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
            {'사업자 등록번호 : 202-43-63442 | 대표 : 김혜선' +
              '\n' +
              '호스팅 서비스 : 스튜디오 불티 | 제2024-서울00-0000호(더미)' +
              '\n' +
              'TEL : 0507-0000-0000(더미) | 이메일 : studio.boolti@gmail.com'}
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
            <InstagramIcon />
          </Styled.IconLink>
          <Styled.IconLink>
            <GithubIcon />
          </Styled.IconLink>
          <Styled.IconLink>
            <KakaotalkIcon />
          </Styled.IconLink>
        </Styled.IconGroup>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Footer;

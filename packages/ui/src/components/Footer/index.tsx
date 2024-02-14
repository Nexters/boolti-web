import { KakaotalkIcon } from '@boolti/icon';

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
              '호스팅 서비스 : 스튜디오 불티 | 통신판매업 신고번호 : 2024-화도수동-0518' +
              '\n' +
              'TEL : 0507-1363-5690 | 이메일 : studio.boolti@gmail.com'}
          </Styled.Text>
          <Styled.LinkTextGroup>
            <Styled.Text>
              <Styled.Link
                href="https://boolti.notion.site/5f73661efdcd4507a1e5b6827aa0da70"
                target="_blank"
                rel="noreferrer noopener nofollow"
              >
                개인정보 처리방침
              </Styled.Link>
              {` | `}
              <Styled.Link
                href="https://boolti.notion.site/b4c5beac61c2480886da75a1f3afb982"
                target="_blank"
                rel="noreferrer noopener nofollow"
              >
                서비스 이용약관
              </Styled.Link>
            </Styled.Text>
          </Styled.LinkTextGroup>
        </Styled.TextGroup>
        <Styled.IconGroup>
          {/* <Styled.IconLink>
            <InstagramIcon />
          </Styled.IconLink>
          <Styled.IconLink>
            <GithubIcon />
          </Styled.IconLink> */}
          <Styled.IconLink
            href="http://pf.kakao.com/_pVxfxaG/chat"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            <KakaotalkIcon />
          </Styled.IconLink>
        </Styled.IconGroup>
      </Styled.Content>
    </Styled.Container>
  );
};

export default Footer;

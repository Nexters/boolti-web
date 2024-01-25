import Styled from './LoginPage.styles';
import kakaoIconUrl from '../../assets/svg/kakao.svg';
import appleIconUrl from '../../assets/svg/apple.svg';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Styled.LoginPage>
      <Styled.LoginContent>
        <Styled.Card>
          <Styled.CardHeader>
            <Styled.CardHeaderTitle>로그인</Styled.CardHeaderTitle>
          </Styled.CardHeader>
          <Styled.CardContent>
            <Styled.CardContentTitle>
              지금 불티에서
              <br />
              티켓을 불티나게 팔아보세요!
            </Styled.CardContentTitle>
            <Styled.LoginButtonContainer>
              <Styled.KakaoLoginButton
                onClick={() => {
                  navigate('/signup/complete');
                }}
              >
                <Styled.LoginButtonIcon>
                  <img src={kakaoIconUrl} alt="카카오톡" />
                </Styled.LoginButtonIcon>
                카카오톡으로 시작하기
              </Styled.KakaoLoginButton>
              <Styled.AppleLoginButton
                onClick={() => {
                  navigate('/signup/complete');
                }}
              >
                <Styled.LoginButtonIcon>
                  <img src={appleIconUrl} alt="Apple" />
                </Styled.LoginButtonIcon>
                Apple로 시작하기
              </Styled.AppleLoginButton>
            </Styled.LoginButtonContainer>
            <Styled.BottomLinkContainer>
              {/* Note: 추후 실제 링크로 교체 */}
              <Styled.BottomLink to="https://naver.com">개인정보 처리방침</Styled.BottomLink>
              <Styled.BottomLink to="https://naver.com">서비스 이용약관</Styled.BottomLink>
            </Styled.BottomLinkContainer>
          </Styled.CardContent>
        </Styled.Card>
        {/* Note: 추후 로고로 교체 */}
        <p style={{ textAlign: 'center' }}>Boolti logo</p>
      </Styled.LoginContent>
    </Styled.LoginPage>
  );
};

export default LoginPage;

import { useUserProfile } from '@boolti/api';
import { useNavigate } from 'react-router-dom';

import { LINK } from '~/constants/link';
import { PATH } from '~/constants/routes';

import Styled from './SignUpCompletePage.styles';

const SignUpCompletePage = () => {
  const navigate = useNavigate();

  const { data: userProfile } = useUserProfile();

  if (userProfile === undefined) return null;

  return (
    <Styled.SignUpCompletePage>
      <Styled.SignUpCompleteContent>
        <Styled.Card>
          <Styled.CardContent>
            {/* Note: 추후 이미지 교체 */}
            {/* <div
              style={{
                width: '388px',
                height: '230px',
                backgroundColor: '#F2F3F5',
                marginBottom: '28px',
              }}
            >
              img
            </div> */}
            <Styled.CardContentTitle>어서오세요 {userProfile.nickname}님!</Styled.CardContentTitle>
            <Styled.CardContentDescription>
              원활한 이용을 위해{' '}
              <Styled.CardContentLink to={LINK.TERMS} target="_blank">
                서비스 이용약관{'\n'}
              </Styled.CardContentLink>{' '}
              확인 후 동의해주세요.
            </Styled.CardContentDescription>
            <Styled.StartButton
              onClick={() => {
                navigate(PATH.HOME, { replace: true });
              }}
            >
              약관 동의하고 시작하기
            </Styled.StartButton>
          </Styled.CardContent>
        </Styled.Card>
      </Styled.SignUpCompleteContent>
    </Styled.SignUpCompletePage>
  );
};

export default SignUpCompletePage;

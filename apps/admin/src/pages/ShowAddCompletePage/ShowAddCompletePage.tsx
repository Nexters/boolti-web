import { ArrowLeftIcon } from '@boolti/icon';
import { Button } from '@boolti/ui';
import { useNavigate } from 'react-router-dom';

import congratulationSvgUrl from '~/assets/svg/congratulation.svg';
import { PATH } from '~/constants/routes';

import Styled from './ShowAddCompletePage.styles';

const ShowAddCompletePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Styled.ShowAddCompletePage>
        <Styled.HeaderContainer>
          <Styled.Header>
            <Styled.BackButton
              type="button"
              onClick={() => {
                navigate(PATH.HOME);
              }}
            >
              <ArrowLeftIcon />
            </Styled.BackButton>
            <Styled.HeaderText>주최자 홈</Styled.HeaderText>
          </Styled.Header>
        </Styled.HeaderContainer>
        <Styled.CardContainer>
          <Styled.Card>
            <Styled.CardHeader>
              <Styled.CardHeaderText>공연 등록</Styled.CardHeaderText>
            </Styled.CardHeader>
            <Styled.CardContent>
              <Styled.CardContentImage
                src={congratulationSvgUrl}
                alt="공연 등록이 완료되었습니다."
              />
              <Styled.CardContentTitle>공연 등록이 완료되었습니다.</Styled.CardContentTitle>
              <Styled.CardContentDescription>
                내가 주최한 공연을 관리하고 불티나게 티켓을 팔아보세요!
              </Styled.CardContentDescription>
              <Styled.CardContentButtonContainer>
                <Button
                  size="bold"
                  colorTheme="primary"
                  onClick={() => {
                    navigate(PATH.HOME);
                  }}
                >
                  주최자 홈 바로 가기
                </Button>
              </Styled.CardContentButtonContainer>
            </Styled.CardContent>
          </Styled.Card>
        </Styled.CardContainer>
      </Styled.ShowAddCompletePage>
      <Styled.MobileShowAddCompletePage>
        <Styled.MobileHeader>
          <Styled.BackButton
            type="button"
            onClick={() => {
              navigate(PATH.HOME);
            }}
          >
            <ArrowLeftIcon />
          </Styled.BackButton>
          <Styled.MobileHeaderText>공연 등록</Styled.MobileHeaderText>
        </Styled.MobileHeader>
        <Styled.MobileContent>
          <Styled.MobileContentImage src={congratulationSvgUrl} alt="공연 등록이 완료되었습니다." />
          <Styled.MobileContentTitle>공연 등록이 완료되었습니다.</Styled.MobileContentTitle>
          <Styled.MobileContentDescription>
            내가 주최한 공연을 관리하고 불티나게 티켓을 팔아보세요!
          </Styled.MobileContentDescription>
        </Styled.MobileContent>
        <Styled.MobileContentButtonContainer>
          <Button
            size="bold"
            colorTheme="primary"
            onClick={() => {
              navigate(PATH.HOME);
            }}
          >
            주최자 홈 바로 가기
          </Button>
        </Styled.MobileContentButtonContainer>
      </Styled.MobileShowAddCompletePage>
    </>
  );
};

export default ShowAddCompletePage;

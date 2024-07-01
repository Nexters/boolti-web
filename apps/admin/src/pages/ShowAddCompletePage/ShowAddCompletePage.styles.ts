import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const ShowAddCompletePage = styled.div`
  display: none;
  background-color: ${({ theme }) => theme.palette.grey.g00};

  ${mq_lg} {
    display: block;
  }
`;

const HeaderContainer = styled.div``;

const Header = styled.header`
  display: flex;
  align-items: center;
  max-width: ${({ theme }) => theme.breakpoint.desktop};
  height: 68px;
  padding: 0 20px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;

const HeaderText = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-left: 8px;
`;

const CardContainer = styled.div`
  height: calc(100vh - 68px);
  padding: 40px 20px 68px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 0px 20px 0px ${({ theme }) => theme.palette.shadow};
  border-radius: 8px;
`;

const CardHeader = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
`;

const CardHeaderText = styled.h2`
  ${({ theme }) => theme.typo.h2_m};
  color: ${({ theme }) => theme.palette.grey.g70};
  text-align: center;
`;

const CardContent = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContentImage = styled.img`
  margin-bottom: 28px;
`;

const CardContentTitle = styled.h3`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.palette.grey.g80};
  margin-bottom: 4px;
`;

const CardContentDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin-bottom: 40px;
`;

const CardContentButtonContainer = styled.div`
  margin-bottom: 28px;

  button {
    width: 195px;
  }
`;

const MobileShowAddCompletePage = styled.div`
  width: 100%;
  height: 100vh;

  ${mq_lg} {
    display: none;
  }
`;

const MobileHeader = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g10};
`;

const MobileHeaderText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const MobileContent = styled.div`
  height: calc(100% - 52px - 80px);
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MobileContentImage = styled.img`
  margin-bottom: 28px;

  ${mq_lg} {
    margin-bottom: 0;
  }
`;

const MobileContentTitle = styled.h3`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g80};
  text-align: center;
  margin-bottom: 4px;

  ${mq_lg} {
    ${({ theme }) => theme.typo.h2};
  }
`;

const MobileContentDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  text-align: center;
  margin-bottom: 32px;
`;

const MobileContentButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  padding: 16px 20px;

  button {
    width: 100%;
  }
`;

export default {
  ShowAddCompletePage,
  HeaderContainer,
  Header,
  BackButton,
  HeaderText,
  CardContainer,
  Card,
  CardHeader,
  CardHeaderText,
  CardContent,
  CardContentImage,
  CardContentTitle,
  CardContentDescription,
  CardContentButtonContainer,
  MobileShowAddCompletePage,
  MobileHeader,
  MobileHeaderText,
  MobileContent,
  MobileContentImage,
  MobileContentTitle,
  MobileContentDescription,
  MobileContentButtonContainer,
};

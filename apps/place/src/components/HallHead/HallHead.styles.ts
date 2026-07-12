import styled from '@emotion/styled';

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 32px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g90};
  border-radius: 0 0 20px 20px;
  overflow: hidden;
`;

const ImageArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BackgroundDim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 19, 24, 0.2) 0%, #121318 100%);
`;

const AppBar = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const HallNameArea = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  align-items: flex-end;
  padding: 0 20px;
`;

const HallName = styled.h1`
  font-family: 'SB Aggro';
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.72px;
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  word-break: break-word;
`;

const SummaryArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px 20px 24px;
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  font-size: 15px;
  line-height: 23px;
`;

const SummaryLabel = styled.span`
  flex-shrink: 0;
  width: 88px;
  color: ${({ theme }) => theme.palette.mobile.grey.g50};
`;

const SummaryValue = styled.span`
  flex: 1;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  word-break: break-word;
`;

const SubwayStationList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;

const SubwayStationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SubwayStationName = styled.span`
  font-size: 15px;
  line-height: 23px;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  white-space: nowrap;
`;

const ContactButtonArea = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 0 20px;
`;

// 데이터가 없어도 버튼은 노출하되 색상만 어둡게 처리한다 (클릭 시 토스트 안내)
const ContactButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.mobile.grey.g30 : theme.palette.mobile.grey.g70};
  cursor: pointer;
`;

const ContactButtonLabel = styled.span`
  font-size: 14px;
  line-height: 22px;
`;

export default {
  Container,
  ImageArea,
  BackgroundImage,
  BackgroundDim,
  AppBar,
  ShareButton,
  HallNameArea,
  HallName,
  SummaryArea,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  SubwayStationList,
  SubwayStationRow,
  SubwayStationName,
  ContactButtonArea,
  ContactButton,
  ContactButtonLabel,
};

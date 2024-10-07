import styled from '@emotion/styled';
import { mq_lg } from '../../systems';

interface ShowInfoDescriptionProps {
  isFullContent?: boolean;
}

const ShowPreview = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

const ShowPreviewHeader = styled.div`
  padding: 0 38px;
  padding-top: 16px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.palette.mobile.grey.g90};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  .swiper-pagination-bullet {
    width: 7px;
    height: 7px;
    opacity: 0.5;
    background-color: ${({ theme }) => theme.palette.mobile.grey.w};
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;

const ShowImage = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 299 / 419;
  object-fit: cover;
`;

const ShowName = styled.h2`
  ${({ theme }) => theme.typo.point.p3};
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  text-align: center;
`;

const ShowPreviewContent = styled.div`
  padding: 40px 20px 0;
  position: relative;
`;

const ShowPreviewTicketPeriod = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g70};
  border-radius: 8px;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
  }

  &::before {
    top: 30px;
    left: -10px;
  }

  &::after {
    top: 30px;
    right: -10px;
  }
`;

const ShowPreviewTicketPeriodInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
`;

const ShowPreviewTicketPeriodTitle = styled.h3`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.mobile.grey.g15};
  display: flex;
  align-items: center;
  gap: 12px;

  &::before,
  &::after {
    content: '';
    width: 5px;
    height: 5px;
    background-color: ${({ theme }) => theme.palette.mobile.grey.g30};
    border-radius: 5px;
  }
`;

const ShowPreviewTicketPeriodText = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
`;

const ShowInfo = styled.div``;

const ShowInfoGroup = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.mobile.grey.g85};

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

const ShowInfoTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ShowInfoTitle = styled.h3`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

const ShowInfoTitleButton = styled.button`
  padding: 0 12px;
  height: 30px;
  border-radius: 4px;
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
  cursor: pointer;
`;

const ShowInfoTitleTextButton = styled.button`
  height: 22px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.mobile.grey.g50};
  cursor: pointer;
`;

const ShowInfoSubtitle = styled.h4`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  margin-bottom: 8px;
`;

const ShowInfoDescription = styled.div<ShowInfoDescriptionProps>`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  overflow-wrap: break-word;
  word-break: break-word;

  ${({ isFullContent }) =>
    isFullContent &&
    `
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 10;
    `}

  a {
    color: #46a6ff;
    text-decoration: underline;
  }
`;

const ShowInfoBox = styled.div`
  height: 56px;
  padding: 0 20px;
  border-radius: 8px;
  ${({ theme }) => theme.typo.b3};
  background-color: ${({ theme }) => theme.palette.mobile.grey.g85};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  display: flex;
  align-items: center;
`;

const ShowHost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
`;

const ShowHostName = styled.span`
  ${({ theme }) => theme.typo.b3};
`;

const ShowHostLink = styled.div`
  display: none;

  ${mq_lg} {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  a {
    cursor: pointer;
  }
`;

const ShowHostLinkMobile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  ${mq_lg} {
    display: none;
  }

  a {
    cursor: pointer;
  }
`;

const Tab = styled.div`
  display: flex;
  padding: 0 20px;
  margin: 40px 0;
`;

const TabButton = styled.button<{ isSelected: boolean }>`
  position: relative;
  flex: 1;
  padding: 13px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme, isSelected }) => theme.palette.mobile.grey[isSelected ? 'g10' : 'g70']};
  &::after {
    display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.mobile.grey.g10};
  }
`;

export default {
  ShowPreview,
  ShowPreviewHeader,
  ShowImage,
  ShowName,
  ShowPreviewContent,
  ShowPreviewTicketPeriod,
  ShowPreviewTicketPeriodInfo,
  ShowPreviewTicketPeriodTitle,
  ShowPreviewTicketPeriodText,
  ShowInfo,
  ShowInfoGroup,
  ShowInfoTitleContainer,
  ShowInfoTitle,
  ShowInfoTitleButton,
  ShowInfoTitleTextButton,
  ShowInfoSubtitle,
  ShowInfoDescription,
  ShowInfoBox,
  ShowHost,
  ShowHostName,
  ShowHostLink,
  ShowHostLinkMobile,
  Tab,
  TabButton,
};

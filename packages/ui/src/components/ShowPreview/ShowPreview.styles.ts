import styled from '@emotion/styled';
import { mq_lg } from '../../systems';

interface ShowInfoDescriptionProps {
  collapse?: boolean;
  isOverflow?: boolean;
}

const ShowPreview = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

const ShowPreviewHeader = styled.div`
  padding: 0 38px;
  padding-top: 16px;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
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

const ShowPreviewNavbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 20px 10px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g90};
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  cursor: ${({ href }) => (href ? 'pointer' : 'default')};

  svg {
    width: 53px;
    height: 24px;
  }
`;

const ShareButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:disabled {
    cursor: default;
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
  margin-top: 24px;
  margin-bottom: 12px;
`;

const ShowHeaderInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ShowHeaderInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
`;

const ShowPreviewContent = styled.div`
  padding: 20px 20px 0;
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

const ShowInfo = styled.div`
  padding: 8px 0;
`;

const CastInfo = styled.div`
  padding-bottom: 16px;
`;

const ShowInfoGroup = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.mobile.grey.g85};

  &:last-of-type {
    border-bottom: none;
  }
`;

const ShowInfoTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const ShowInfoTitle = styled.h3`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

const ShowInfoMoreButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0 24px;
  text-align: center;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  cursor: pointer;
`;

const ShowInfoSubtitle = styled.h4`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  margin-bottom: 4px;
`;

const ShowInfoDescription = styled.div<ShowInfoDescriptionProps>`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  overflow-wrap: break-word;
  word-break: break-word;
  display: flex;
  align-items: center;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  ${({ collapse }) =>
    collapse && `
      display: block;
      overflow: hidden;
      height: 100%;
      max-height: 300px;

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 40px;
        bottom: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(9, 10, 11, 0) 0%, #090A0B 100%);
      }
    `
  }
`;

const ShowInfoDescriptionText = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  overflow-wrap: break-word;
  word-break: break-word;
`

const ShowInfoDescriptionButton = styled.button`
  display: inline;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.status.link};
  cursor: pointer;
  white-space: nowrap;
`;

const ShowTicketInfoDescription = styled.div`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  overflow-wrap: break-word;
  word-break: break-word;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

const TicketIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const ShowInfoDescriptionBadge = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.mobile.grey.g50};
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  padding: 0 8px;
  height: 22px;
  border-radius: 999px;
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

const ShowCastList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 0;
`;

const ShowCastListItem = styled.li`
  display: flex;
  width: calc(50% - 8px);
  overflow: hidden;

  &:nth-of-type(2n + 1) {
    margin-right: 8px;
  }

  &:nth-of-type(2n) {
    margin-left: 8px;
  }
`;

const UserImage = styled.div`
  box-sizing: border-box;
  width: 46px;
  height: 46px;
  border-radius: 46px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: var(--imgPath);
  margin-right: 8px;
  flex: 0 0 auto;
`;

const UserInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const UserNickname = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const UserRoleName = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.mobile.grey.g50};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const EmptryCastTeam = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 100%;
`;

const EmptyCastTeamTitle = styled.h3`
  ${({ theme }) => theme.typo.point.p2};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
`;

const EmptyCastTeamDescription = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
`;

export default {
  ShowPreview,
  ShowPreviewHeader,
  ShowPreviewNavbar,
  LogoLink,
  ShareButton,
  ShowImage,
  ShowName,
  ShowHeaderInfoList,
  ShowHeaderInfoItem,
  ShowPreviewContent,
  ShowPreviewTicketPeriod,
  ShowPreviewTicketPeriodInfo,
  ShowPreviewTicketPeriodTitle,
  ShowPreviewTicketPeriodText,
  CastInfo,
  ShowInfo,
  ShowInfoGroup,
  ShowInfoTitleContainer,
  ShowInfoTitle,
  ShowInfoMoreButton,
  ShowInfoSubtitle,
  ShowInfoDescription,
  ShowInfoDescriptionText,
  ShowInfoDescriptionButton,
  ShowTicketInfoDescription,
  TicketIcon,
  ShowInfoDescriptionBadge,
  ShowInfoBox,
  ShowHost,
  ShowHostName,
  ShowHostLink,
  ShowHostLinkMobile,
  ShowCastList,
  ShowCastListItem,
  UserImage,
  UserInfoWrap,
  UserNickname,
  UserRoleName,
  EmptryCastTeam,
  EmptyCastTeamTitle,
  EmptyCastTeamDescription,
};

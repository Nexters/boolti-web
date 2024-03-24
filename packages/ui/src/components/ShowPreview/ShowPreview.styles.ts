import styled from '@emotion/styled';

const ShowPreview = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

const ShowPreviewHeader = styled.div`
  padding: 0 38px;
  padding-top: 60px;
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
`;

const ShowImage = styled.img`
  width: 299px;
  height: 419px;
  object-fit: contain;
`;

const ShowName = styled.h2`
  ${({ theme }) => theme.typo.point.p3};
  color: ${({ theme }) => theme.palette.mobile.grey.g05};
`;

const ShowPreviewContent = styled.div`
  padding: 36px 20px;
  position: relative;
`;

const ShowPreviewTicketPeriod = styled.div`
  border-radius: 8px;
  height: 88px;
  position: relative;
  margin-bottom: 8px;
`;

const ShowPreviewTicketPeriodBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 88px;
`;

const ShowPreviewTicketPeriodInfo = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 12px 0;
`;

const ShowPreviewTicketPeriodTitle = styled.h3`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.mobile.grey.g15};
`;

const ShowPreviewTicketPeriodText = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
`;

const ShowInfo = styled.div``;

const ShowInfoGroup = styled.div`
  padding: 32px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.mobile.grey.g85};

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

const ShowInfoDescription = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};

  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
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

export default {
  ShowPreview,
  ShowPreviewHeader,
  ShowImage,
  ShowName,
  ShowPreviewContent,
  ShowPreviewTicketPeriod,
  ShowPreviewTicketPeriodBackground,
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
};

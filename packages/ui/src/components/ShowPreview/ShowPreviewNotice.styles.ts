import styled from '@emotion/styled';

const ShowPreviewNotice = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

const ShowPreviewNoticeHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 0;
    width: 100%;
    height: 30px;
    background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
  }
`;

const ShowPreviewNoticeTitle = styled.h3`
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.mobile.grey.g10};
`;

const ShowPreviewNoticeNav = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  height: 44px;
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;

    path {
      stroke: ${({ theme }) => theme.palette.mobile.grey.g10};
    }
  }
`;

const ShowPreviewNoticeText = styled.div`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.mobile.grey.g30};
  padding: 20px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
`;

export default {
  ShowPreviewNotice,
  ShowPreviewNoticeHeader,
  ShowPreviewNoticeTitle,
  ShowPreviewNoticeNav,
  BackButton,
  ShowPreviewNoticeText,
};

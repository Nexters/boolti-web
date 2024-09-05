import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const ShowInfoPage = styled.div`
  padding: 0 20px;
  margin: 20px 0 32px;

  ${mq_lg} {
    margin: 40px 0 68px;
  }
`;

const ShowInfoForm = styled.form``;

const ShowInfoFormContent = styled.div`
  max-width: 600px;
`;

const ShowInfoFormDivider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  margin: 48px 0;

  ${mq_lg} {
    margin: 52px 0;
  }
`;

const ShowInfoFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 52px;

  button {
    width: 100%;
    padding: 0;
  }
`;

const SaveButton = styled.div`
  width: 96px;

  ${mq_lg} {
    width: 128px;
  }
`;

const DeleteButton = styled.div`
  width: 96px;

  ${mq_lg} {
    width: 128px;
  }
`;

const ShowInfoPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ShowInfoPreview = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-y: auto;

  ${mq_lg} {
    overflow-y: initial;
  }
`;

const ShowInfoPreviewMobile = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 999;
  padding-bottom: 84px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};

  ${mq_lg} {
    padding-bottom: 0;
    display: none;
  }
`;

const ShowInfoPreviewFrameContainer = styled.div`
  width: 314px;
  height: 586px;
  position: relative;
`;

const ShowInfoPreviewFrame = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ShowPreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  clip-path: url(#preview-frame);
  padding: 30px 34px 38px 39px;
`;

const ShowPreview = styled.div`
  width: 375px;
  height: 100%;
  zoom: 0.64266667;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ShowInfoPreviewFooter = styled.div`
  height: 84px;
  display: flex;
  padding: 20px 16px;
  gap: 8px;
  background-color: ${({ theme }) => theme.palette.mobile.grey.g95};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  ${mq_lg} {
    height: 52px;
    padding: 0;
    gap: 0;
    background-color: none;

    position: initial;
    bottom: initial;
    left: initial;
    width: initial;
  }
`;

const ShowInfoPreviewCloseButton = styled.button`
  flex: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.grey.g90};
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.sh1};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;

  ${mq_lg} {
    width: 220px;
    flex: initial;
    border-radius: none;
  }
`;

const ShowInfoPreviewSubmitButton = styled.button`
  flex: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.primary.o1};
  color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.sh1};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;

  ${mq_lg} {
    border-radius: none;
  }
`;

export default {
  ShowInfoPage,
  ShowInfoForm,
  ShowInfoFormContent,
  ShowInfoFormDivider,
  ShowInfoFormFooter,
  SaveButton,
  DeleteButton,
  ShowInfoPreviewContainer,
  ShowInfoPreview,
  ShowInfoPreviewMobile,
  ShowInfoPreviewFrameContainer,
  ShowInfoPreviewFrame,
  ShowPreviewContainer,
  ShowPreview,
  ShowInfoPreviewFooter,
  ShowInfoPreviewCloseButton,
  ShowInfoPreviewSubmitButton,
};

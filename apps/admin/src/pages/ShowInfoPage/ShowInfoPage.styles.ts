import styled from '@emotion/styled';

const ShowInfoPage = styled.div`
  padding: 0 20px;
  margin: 40px 0 68px;
`;

const ShowInfoForm = styled.form``;

const ShowInfoFormContent = styled.div`
  max-width: 600px;
`;

const ShowInfoFormDivider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  margin: 52px 0;
`;

const ShowInfoFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 52px;

  button:first-of-type {
    width: 128px;
  }
`;

export default {
  ShowInfoPage,
  ShowInfoForm,
  ShowInfoFormContent,
  ShowInfoFormDivider,
  ShowInfoFormFooter,
};

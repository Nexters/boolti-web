import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const ShowTicketPage = styled.div`
  padding: 0 20px;
  margin: 20px 0 32px;

  ${mq_lg} {
    margin: 40px 0 68px;
  }
`;

const ShowTicketForm = styled.form``;

const ShowTicketFormTitle = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.typo.sh2};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 16px;

  ${mq_lg} {
    ${({ theme }) => theme.typo.h1};
  }
`;

const ShowTicketFormContentContainer = styled.div`
  max-width: 600px;
`;

const ShowTicketFormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const ShowTicketSubmitContainer = styled.div`
  margin-top: 32px;

  button {
    width: 120px;
  }
`;

const ShowTicketFormDivider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  margin: 48px 0;

  ${mq_lg} {
    margin: 52px 0;
  }
`;

export default {
  ShowTicketPage,
  ShowTicketForm,
  ShowTicketFormTitle,
  ShowTicketFormContentContainer,
  ShowTicketFormContent,
  ShowTicketSubmitContainer,
  ShowTicketFormDivider,
};

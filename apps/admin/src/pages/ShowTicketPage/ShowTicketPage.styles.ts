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

const ShowTicketFormContent = styled.div`
  max-width: 600px;
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
  ShowTicketFormContent,
  ShowTicketSubmitContainer,
  ShowTicketFormDivider,
};

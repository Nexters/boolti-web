import styled from '@emotion/styled';

const ShowTicketPage = styled.div`
  padding: 0 20px;
  margin: 40px 0 68px;
`;

const ShowTicketForm = styled.form``;

const ShowTicketFormContent = styled.div`
  max-width: 600px;
`;

const ShowTicketFormDivider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  margin: 52px 0;
`;

export default {
  ShowTicketPage,
  ShowTicketForm,
  ShowTicketFormContent,
  ShowTicketFormDivider,
};

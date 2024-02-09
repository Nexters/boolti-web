import styled from '@emotion/styled';

const TicketForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const TicketFormRow = styled.div`
  margin-bottom: 28px;
  display: flex;
  gap: 24px;
`;

const TicketFormContent = styled.div`
  flex: 1;
`;

const TicketFormLabel = styled.label`
  display: block;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const TextField = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  div {
    width: auto;
    flex: 1;
  }
`;

const TextFieldSuffix = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g50};
  flex: 0;
`;

const TicketFormButton = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: flex-end;
`;

export default {
  TicketForm,
  Description,
  TicketFormRow,
  TicketFormContent,
  TicketFormLabel,
  TicketFormButton,
  TextField,
  TextFieldSuffix,
};

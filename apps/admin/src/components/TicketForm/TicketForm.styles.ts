import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

const TicketForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};

  ${mq} {
    ${({ theme }) => theme.typo.b3};
    color: ${({ theme }) => theme.palette.grey.g70};
  }
`;

const TicketFormRow = styled.div`
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  ${mq} {
    flex-direction: row;
    gap: 24px;
  }
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
  display: flex;
  justify-content: flex-end;
  padding-bottom: 16px;

  button {
    width: 100%;
  }

  ${mq} {
    margin-top: 4px;

    button {
      width: auto;
    }
  }
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

import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const TicketForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TicketFormDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  ${mq_lg} {
    margin-bottom: 28px;
  }
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
  margin-bottom: 0;

  ${mq_lg} {
    ${({ theme }) => theme.typo.b3};
    color: ${({ theme }) => theme.palette.grey.g70};
    margin-bottom: 4px;
  }
`;

const SubDescription = styled.p`
  display: none;

  ${mq_lg} {
    display: block;
    ${({ theme }) => theme.typo.b1};
    color: ${({ theme }) => theme.palette.grey.g50};
  }
`;

const TicketFormRow = styled.div`
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 28px;

  ${mq_lg} {
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

  ${mq_lg} {
    margin-top: 4px;

    button {
      width: auto;
    }
  }
`;

export default {
  TicketForm,
  TicketFormDescription,
  Description,
  SubDescription,
  TicketFormRow,
  TicketFormContent,
  TicketFormLabel,
  TicketFormButton,
  TextField,
  TextFieldSuffix,
};

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
    gap: 28px;
  }
`;

const TicketFormContent = styled.div`
  flex: 1;
`;

const TicketFormLabel = styled.label`
  display: block;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  white-space: nowrap;
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

  button {
    width: 100%;
  }

  ${mq_lg} {
    button {
      width: auto;
    }
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;
`;

const QuantityDisplay = styled.div`
  margin-top: 8px;
  padding: 13px 0px;
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme }) => theme.typo.b3};
  border-radius: 4px;
  border: 1px solid transparent;
`;

const QuantityRow = styled.div`
  margin-bottom: 28px;
  display: flex;
  gap: 28px;
  flex-direction: row;
  justify-content: space-between;
`;

const SoldQuantityContent = styled.div`
  ${mq_lg} {
    width: 118px;
    flex-shrink: 0;
  }
`;

const TotalQuantityContent = styled.div`
  ${mq_lg} {
    width: 240px;
    flex-shrink: 0;
  }
`;

const ConcurrencyBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #fceace;
  background-color: rgba(254, 250, 243, 0.95);
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g90};

  svg {
    flex-shrink: 0;
  }
`;

const TicketFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  gap: 36px;

  & > button:first-of-type {
    min-width: auto;
    flex-shrink: 0;
    white-space: nowrap;
  }

  & > button:last-of-type {
    flex: 1;
    width: auto;
  }

  ${mq_lg} {
    padding-bottom: 0;
    gap: 16px;

    & > button:first-of-type {
      min-width: auto;
      flex-shrink: 0;
      white-space: nowrap;
    }

    & > button:last-of-type {
      flex: initial;
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
  RadioGroup,
  QuantityDisplay,
  QuantityRow,
  SoldQuantityContent,
  TotalQuantityContent,
  ConcurrencyBanner,
  TicketFormFooter,
};

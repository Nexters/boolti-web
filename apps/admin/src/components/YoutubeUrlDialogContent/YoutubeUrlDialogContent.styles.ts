import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const YoutubeUrlDialogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 12px 0;

  ${mq_lg} {
    margin: 0;
  }
`;

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;

  div {
    width: 100%;
  }

  ${mq_lg} {
    margin-bottom: 32px;
  }
`;

const Label = styled.label`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export default {
  YoutubeUrlDialogContent,
  TextFieldContainer,
  Label,
  ButtonContainer,
};

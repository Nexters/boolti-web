import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const ShowDeleteForm = styled.form`
  position: relative;
  margin: 16px 0;
  height: calc(100vh - 148px);

  ${mq_lg} {
    margin: 0;
    height: auto;
  }
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  line-height: 24px;
  margin-bottom: 28px;
`;

const TextFieldContainer = styled.div`
  margin-bottom: 32px;

  div {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  display: flex;

  button {
    width: 100%;
  }

  ${mq_lg} {
    position: initial;
    bottom: auto;
    justify-content: flex-end;

    button {
      width: auto;
    }
  }
`;

export default {
  ShowDeleteForm,
  Description,
  TextFieldContainer,
  ButtonContainer,
};

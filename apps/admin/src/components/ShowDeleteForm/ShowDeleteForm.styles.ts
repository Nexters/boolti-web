import styled from '@emotion/styled';

const ShowDeleteForm = styled.form``;

const Description = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  margin-bottom: 28px;
`;

const TextFieldContainer = styled.div`
  margin-bottom: 32px;

  div {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export default {
  ShowDeleteForm,
  Description,
  TextFieldContainer,
  ButtonContainer,
};

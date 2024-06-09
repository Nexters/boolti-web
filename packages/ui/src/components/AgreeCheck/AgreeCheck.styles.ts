import styled from '@emotion/styled';

const AgreeCheck = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;

const Description = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g60};
`;

export default {
  AgreeCheck,
  Input,
  Description,
};

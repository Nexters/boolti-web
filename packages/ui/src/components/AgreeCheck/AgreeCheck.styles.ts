import styled from '@emotion/styled';

const AgreeCheck = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Icon = styled.div`
  flex-shrink: 0;
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
  Icon,
  Input,
  Description,
};

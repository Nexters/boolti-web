import styled from '@emotion/styled';

export const CheckboxContainer = styled.div<{ checked?: boolean; variant: 'main' | 'sub' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  ${({ variant, checked, theme }) => {
    switch (variant) {
      case 'main': {
        return `
          border: 1px solid ${checked ? theme.palette.grey.g90 : theme.palette.grey.g30};
          border-radius: 4px;
          background-color: ${checked ? theme.palette.grey.g90 : 'transparent'};
          color: ${checked ? theme.palette.grey.w : theme.palette.grey.g30};

          &:hover {
            border-color: ${theme.palette.grey.g90};
          }
        `;
      }
      case 'sub': {
        return `
          color: ${checked ? theme.palette.grey.g90 : theme.palette.grey.g20};
        `;
      }
    }
  }}
`;

export const CheckboxInput = styled.input`
  appearance: none;
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
`;

export default {
  CheckboxContainer,
  CheckboxInput,
};

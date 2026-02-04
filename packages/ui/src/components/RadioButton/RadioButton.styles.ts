import styled from '@emotion/styled';

export const RadioButtonCircle = styled.div<{ checked?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid
    ${({ checked, disabled, theme }) => {
      if (disabled) {
        return theme.palette.grey.g20;
      }
      return checked ? theme.palette.grey.g90 : theme.palette.grey.g30;
    }};
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
`;

export const RadioButtonInner = styled.div<{ checked?: boolean; disabled?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ checked, disabled, theme }) => {
    if (!checked) {
      return 'transparent';
    }
    if (disabled) {
      return theme.palette.grey.g30;
    }
    return theme.palette.grey.g90;
  }};
  transition: background-color 0.2s ease;
`;

export const RadioButtonInput = styled.input`
  appearance: none;
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
`;

export const RadioButtonLabel = styled.span`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

export const RadioButtonContainer = styled.label<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover ${RadioButtonCircle} {
    border-color: ${({ theme, disabled }) =>
      disabled ? theme.palette.grey.g20 : theme.palette.grey.g90};
  }
`;

export default {
  RadioButtonCircle,
  RadioButtonInner,
  RadioButtonInput,
  RadioButtonLabel,
  RadioButtonContainer,
};

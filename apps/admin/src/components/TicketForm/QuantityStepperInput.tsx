import styled from '@emotion/styled';
import { forwardRef } from 'react';

interface QuantityStepperInputProps extends Omit<React.ComponentProps<'input'>, 'size' | 'type'> {
  disableDecrement?: boolean;
  errorMessage?: string;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const QuantityStepperInput = forwardRef<HTMLInputElement, QuantityStepperInputProps>(
  function QuantityStepperInput(
    { disabled, disableDecrement, errorMessage, onIncrement, onDecrement, ...rest },
    ref,
  ) {
    return (
      <Container>
        <InputWrapper>
          <StyledInput
            ref={ref}
            type="number"
            disabled={disabled}
            hasError={!!errorMessage}
            {...rest}
          />
          {!disabled && (
            <StepperContainer>
              <StepperButton type="button" onClick={onIncrement} aria-label="증가">
                <ArrowUp />
              </StepperButton>
              <StepperDivider />
              <StepperButton
                type="button"
                onClick={disableDecrement ? undefined : onDecrement}
                disabled={disableDecrement}
                aria-label="감소"
              >
                <ArrowDown disabled={disableDecrement} />
              </StepperButton>
            </StepperContainer>
          )}
        </InputWrapper>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Container>
    );
  },
);

export default QuantityStepperInput;

const ArrowUp = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 7.5L6 4.5L3 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowDown = ({ disabled }: { disabled?: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: disabled ? '#D8DBE5' : 'currentColor' }}
  >
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  border-radius: 4px;
  padding: 12px 40px 12px 13px;
  color: ${({ theme }) => theme.palette.grey.g90};
  border: 1px solid
    ${({ hasError, theme }) =>
      hasError ? `${theme.palette.status.error1} !important` : theme.palette.grey.g20};
  background: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b3};
  &:placeholder-shown {
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    color: ${({ theme }) => theme.palette.grey.g30};
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  }
  &:disabled {
    background: ${({ theme }) => theme.palette.grey.g10};
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    color: ${({ theme }) => theme.palette.grey.g40};
  }

  /* 네이티브 spinner 숨기기 */
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StepperContainer = styled.div`
  position: absolute;
  right: 1px;
  top: 1px;
  bottom: 1px;
  display: flex;
  flex-direction: column;
  width: 28px;
  border-left: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 0 3px 3px 0;
  overflow: hidden;
`;

const StepperDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.palette.grey.g20};
`;

const StepperButton = styled.button<{ disabled?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${({ theme }) => theme.palette.grey.w};
  color: ${({ disabled, theme }) => (disabled ? theme.palette.grey.g20 : theme.palette.grey.g60)};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  padding: 0;
  transition: background-color 0.15s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.palette.grey.g00};
  }
`;

const ErrorMessage = styled.span`
  margin-top: 4px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error1};
`;

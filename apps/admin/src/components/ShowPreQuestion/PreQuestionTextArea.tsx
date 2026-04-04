import styled from '@emotion/styled';
import { useCallback, useEffect, useRef } from 'react';

interface PreQuestionTextAreaProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  hasError?: boolean;
  disabled?: boolean;
}

const StyledTextArea = styled.textarea<{ hasError?: boolean; disabled?: boolean }>`
  width: 100%;
  min-height: 48px;
  max-height: 200px;
  padding: 12px;
  border: 1px solid
    ${({ theme, hasError, disabled }) =>
      disabled ? 'transparent' : hasError ? theme.palette.status.error1 : theme.palette.grey.g20};
  border-radius: 4px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.grey.g00 : theme.palette.grey.w};
  color: ${({ theme, disabled }) => (disabled ? theme.palette.grey.g50 : theme.palette.grey.g90)};
  ${({ theme }) => theme.typo.b3};
  resize: none;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError, disabled }) =>
      disabled ? 'transparent' : hasError ? theme.palette.status.error1 : theme.palette.grey.g90};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const PreQuestionTextArea = ({
  placeholder,
  value,
  onChange,
  hasError,
  disabled,
}: PreQuestionTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    onChange(e);
    adjustHeight();
  };

  useEffect(() => {
    adjustHeight();
  }, [adjustHeight, value]);

  return (
    <StyledTextArea
      ref={textareaRef}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      hasError={hasError}
      disabled={disabled}
      rows={1}
      onInput={adjustHeight}
    />
  );
};

export default PreQuestionTextArea;

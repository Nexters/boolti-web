import { PlusIcon } from '@boolti/icon';
import styled from '@emotion/styled';
import { useCallback, useRef } from 'react';

export interface PreQuestion {
  id?: number;
  questionText: string;
  description?: string;
  isRequired: boolean;
}

const MAX_LENGTH = 100;

// 로컬 스타일
const PreQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PreQuestionItem = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  overflow: hidden;
`;

const PreQuestionRow = styled.div`
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const PreQuestionLabel = styled.label<{ required?: boolean }>`
  display: block;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;

  &::after {
    content: '*';
    color: ${({ theme }) => theme.palette.status.error1};
    display: ${({ required }) => (required ? 'inline' : 'none')};
    margin-left: 2px;
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  min-height: 48px;
  max-height: 200px;
  padding: 12px;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.palette.status.error1 : theme.palette.grey.g20)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.b3};
  resize: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.palette.status.error1 : theme.palette.grey.g90};
  }
`;

const ErrorMessage = styled.p`
  margin-top: 4px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error1};
`;

const PreQuestionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
`;

const DeleteButton = styled.button`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;

  &:hover {
    color: ${({ theme }) => theme.palette.grey.g90};
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleLabel = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
`;

const ToggleSwitch = styled.button<{ isOn: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  background-color: ${({ theme, isOn }) =>
    isOn ? theme.palette.primary.o1 : theme.palette.grey.g20};
  transition: background-color 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ isOn }) => (isOn ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.palette.grey.w};
    transition: left 0.2s ease;
  }
`;

const EmptyState = styled.div<{ questionsLength: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border: ${({ questionsLength }) => (questionsLength === 0 ? '1px dashed' : 'none')}
    ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }
`;

const AddButtonText = styled.span<{ questionsLength: number }>`
  ${({ theme }) => theme.typo.b3};
  color: ${({ questionsLength, theme }) =>
    questionsLength === 0 ? theme.palette.grey.g40 : theme.palette.grey.g90};
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 20px;
    height: 20px;
  }

  path {
    stroke: ${({ questionsLength, theme }) =>
      questionsLength === 0 ? theme.palette.grey.g40 : theme.palette.grey.g90};
  }
`;

interface ShowPreQuestionFormContentProps {
  preQuestionList: PreQuestion[];
  onUpdateQuestion: (index: number, question: PreQuestion) => void;
  onAddQuestion: () => void;
  onDeleteQuestion: (index: number) => void;
}

interface AutoResizeTextAreaProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  hasError?: boolean;
}

const AutoResizeTextArea = ({
  placeholder,
  value,
  onChange,
  hasError,
}: AutoResizeTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    adjustHeight();
  };

  return (
    <TextArea
      ref={textareaRef}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      hasError={hasError}
      rows={1}
      onInput={adjustHeight}
    />
  );
};

const ShowPreQuestionFormContent = ({
  preQuestionList,
  onUpdateQuestion,
  onAddQuestion,
  onDeleteQuestion,
}: ShowPreQuestionFormContentProps) => {
  const handleTextChange = (index: number, field: 'questionText' | 'description', value: string) => {
    const preQuestion = preQuestionList[index];

    onUpdateQuestion(index, {
      ...preQuestion,
      [field]: value,
    });
  };

  return (
    <PreQuestionContainer>
      {preQuestionList.map((preQuestion, index) => {
        const isQuestionOverLimit = preQuestion.questionText.length > MAX_LENGTH;
        const isDescriptionOverLimit = (preQuestion.description?.length ?? 0) > MAX_LENGTH;

        return (
          <PreQuestionItem key={preQuestion.id ?? `question-${index}`}>
            <PreQuestionRow>
              <PreQuestionLabel required>질문</PreQuestionLabel>
              <AutoResizeTextArea
                placeholder="ex. 어떤 팀을 보러 오셨나요? (100자 이내)"
                value={preQuestion.questionText}
                onChange={(e) => handleTextChange(index, 'questionText', e.target.value)}
                hasError={isQuestionOverLimit}
              />
              {isQuestionOverLimit && <ErrorMessage>100자 이내로 입력해 주세요</ErrorMessage>}
            </PreQuestionRow>
            <PreQuestionRow>
              <PreQuestionLabel>설명</PreQuestionLabel>
              <AutoResizeTextArea
                placeholder="설명을 입력해 주세요 (100자 이내)"
                value={preQuestion.description ?? ''}
                onChange={(e) => handleTextChange(index, 'description', e.target.value)}
                hasError={isDescriptionOverLimit}
              />
              {isDescriptionOverLimit && <ErrorMessage>100자 이내로 입력해 주세요</ErrorMessage>}
            </PreQuestionRow>
            <PreQuestionFooter>
              <DeleteButton type="button" onClick={() => onDeleteQuestion(index)}>
                질문 삭제
              </DeleteButton>
              <ToggleContainer>
                <ToggleLabel>답변 필수</ToggleLabel>
                <ToggleSwitch
                  type="button"
                  isOn={preQuestion.isRequired}
                  onClick={() =>
                    onUpdateQuestion(index, { ...preQuestion, isRequired: !preQuestion.isRequired })
                  }
                />
              </ToggleContainer>
            </PreQuestionFooter>
          </PreQuestionItem>
        );
      })}

      {preQuestionList.length < 3 && (
        <EmptyState questionsLength={preQuestionList.length} onClick={onAddQuestion}>
          <AddButtonText questionsLength={preQuestionList.length}>
            <PlusIcon />
            추가하기
          </AddButtonText>
        </EmptyState>
      )}
    </PreQuestionContainer>
  );
};

export default ShowPreQuestionFormContent;

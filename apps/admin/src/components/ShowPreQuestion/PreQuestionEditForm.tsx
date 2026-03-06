import { BooltiGreyIcon, PlusIcon } from '@boolti/icon';
import { mq_lg, useConfirm } from '@boolti/ui';
import styled from '@emotion/styled';

import { PreQuestionTextArea } from '~/components/ShowPreQuestion';

export interface PreQuestion {
  id?: number;
  questionText: string;
  description?: string;
  isRequired: boolean;
}

const MAX_LENGTH = 100;

// Styled Components
const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const QuestionItem = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0 8px 14px 0 rgba(139, 139, 139, 0.15);
  overflow: hidden;

  ${mq_lg} {
    padding: 24px 28px 32px 28px;
  }
`;

const QuestionRow = styled.div`
  margin-bottom: 28px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const QuestionLabel = styled.label<{ required?: boolean }>`
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

const ErrorMessage = styled.p`
  margin-top: 4px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.status.error1};
`;

const QuestionFooter = styled.div<{ showDeleteButton?: boolean }>`
  display: flex;
  justify-content: ${({ showDeleteButton }) => (showDeleteButton ? 'space-between' : 'flex-end')};
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
`;

const DeleteButton = styled.button`
  ${({ theme }) => theme.typo.sh1};
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

const ToggleSwitch = styled.button<{ isOn: boolean; disabled?: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ theme, isOn, disabled }) =>
    disabled ? theme.palette.grey.g40 : isOn ? theme.palette.primary.o1 : theme.palette.grey.g20};
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

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 0;
  border: 1px dashed ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g00};
  }
`;

const EmptyStateDisabled = styled.div`
  width: 100%;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 20px;
  border-radius: 8px;
  text-align: center;
`;

const EmptyStateIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 16px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const EmptyStateText = styled.p`
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

const AddButtonText = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g40};
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 20px;
    height: 20px;
  }

  path {
    stroke: ${({ theme }) => theme.palette.grey.g40};
  }
`;

const FormFooter = styled.div`
  margin-top: 32px;
`;

const SaveButton = styled.button<{ disabled?: boolean }>`
  padding: 13px 28px;
  border-radius: 4px;
  border: none;
  ${({ theme }) => theme.typo.sh1};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.grey.g20 : theme.palette.primary.o1};
  color: ${({ theme, disabled }) => (disabled ? theme.palette.grey.g40 : theme.palette.grey.w)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.palette.grey.g20 : theme.palette.primary.o2};
  }
`;

const ConfirmContent = styled.div`
  text-align: left;
`;

const ConfirmTitle = styled.p`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;
`;

const ConfirmDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  line-height: 1.6;
  text-align: center;

  ${mq_lg} {
    text-align: left;
  }
`;

const AddButton = ({ onAddQuestion }: { onAddQuestion: () => void }) => (
  <EmptyState onClick={onAddQuestion}>
    <AddButtonText>
      <PlusIcon />
      추가하기
    </AddButtonText>
  </EmptyState>
);

interface PreQuestionEditFormProps {
  preQuestionList: PreQuestion[];
  isDisabled: boolean;
  isSaving: boolean;
  onUpdateQuestion: (index: number, question: PreQuestion) => void;
  onDeleteQuestion: (index: number) => void;
  onAddQuestion: () => void;
  onSave: () => void;
}

const PreQuestionEditForm = ({
  preQuestionList,
  isDisabled,
  isSaving,
  onUpdateQuestion,
  onDeleteQuestion,
  onAddQuestion,
  onSave,
}: PreQuestionEditFormProps) => {
  const confirm = useConfirm();
  const hasOverLimitQuestion = preQuestionList.some(
    (preQuestion) =>
      preQuestion.questionText.length > MAX_LENGTH ||
      (preQuestion.description?.length ?? 0) > MAX_LENGTH,
  );
  const hasEmptyQuestion = preQuestionList.some(
    (preQuestion) => preQuestion.questionText.trim().length === 0,
  );

  const handleDeleteQuestion = async (index: number) => {
    const isConfirmed = await confirm(
      <ConfirmContent>
        <ConfirmTitle>질문을 삭제할까요?</ConfirmTitle>
        <ConfirmDescription>
          삭제 후 저장할 경우 질문과 수집된 응답이 모두 삭제됩니다. 삭제된 질문과 응답은 복구가
          불가능합니다.
        </ConfirmDescription>
      </ConfirmContent>,
      {
        cancel: '취소하기',
        confirm: '삭제하기',
      },
    );

    if (!isConfirmed) {
      return;
    }

    onDeleteQuestion(index);
  };
  // 질문이 없고 마감된 경우
  if (preQuestionList.length === 0 && isDisabled) {
    return (
      <EmptyStateDisabled>
        <EmptyStateIcon>
          <BooltiGreyIcon />
        </EmptyStateIcon>
        <EmptyStateText>생성한 사전 질문이 없어요.</EmptyStateText>
      </EmptyStateDisabled>
    );
  }

  // 질문이 없고 마감 전인 경우
  if (preQuestionList.length === 0) {
    return <AddButton onAddQuestion={onAddQuestion} />;
  }

  // 질문이 있는 경우
  return (
    <>
      <QuestionContainer>
        {preQuestionList.map((preQuestion, index) => {
          const isQuestionOverLimit = preQuestion.questionText.length > MAX_LENGTH;
          const isDescriptionOverLimit = (preQuestion.description?.length ?? 0) > MAX_LENGTH;

          return (
            <QuestionItem key={preQuestion.id ?? `question-${index}`}>
              <QuestionRow>
                <QuestionLabel required>질문</QuestionLabel>
                <PreQuestionTextArea
                  placeholder="ex. 어떤 팀을 보러 오셨나요? (100자 이내)"
                  value={preQuestion.questionText}
                  onChange={(e) =>
                    onUpdateQuestion(index, { ...preQuestion, questionText: e.target.value })
                  }
                  hasError={isQuestionOverLimit}
                  disabled={isDisabled}
                />
                {isQuestionOverLimit && <ErrorMessage>100자 이내로 입력해 주세요</ErrorMessage>}
              </QuestionRow>
              <QuestionRow>
                <QuestionLabel>설명</QuestionLabel>
                <PreQuestionTextArea
                  placeholder={
                    isDisabled ? '입력된 설명이 없어요' : '설명을 입력해 주세요 (100자 이내)'
                  }
                  value={preQuestion.description ?? ''}
                  onChange={(e) =>
                    onUpdateQuestion(index, { ...preQuestion, description: e.target.value })
                  }
                  hasError={isDescriptionOverLimit}
                  disabled={isDisabled}
                />
                {isDescriptionOverLimit && <ErrorMessage>100자 이내로 입력해 주세요</ErrorMessage>}
              </QuestionRow>
              <QuestionFooter showDeleteButton={!isDisabled}>
                {!isDisabled && (
                  <DeleteButton type="button" onClick={() => handleDeleteQuestion(index)}>
                    질문 삭제
                  </DeleteButton>
                )}
                <ToggleContainer>
                  <ToggleLabel>답변 필수</ToggleLabel>
                  <ToggleSwitch
                    type="button"
                    isOn={preQuestion.isRequired}
                    disabled={isDisabled}
                    onClick={() => {
                      if (isDisabled) return;
                      onUpdateQuestion(index, {
                        ...preQuestion,
                        isRequired: !preQuestion.isRequired,
                      });
                    }}
                  />
                </ToggleContainer>
              </QuestionFooter>
            </QuestionItem>
          );
        })}

        {/* 추가하기 버튼 - 마감 전에만 표시 */}
        {!isDisabled && <AddButton onAddQuestion={onAddQuestion} />}
      </QuestionContainer>

      {/* 저장하기 버튼 */}
      <FormFooter>
        <SaveButton
          type="button"
          disabled={isDisabled || isSaving || hasOverLimitQuestion || hasEmptyQuestion}
          onClick={onSave}
        >
          {isSaving ? '저장 중...' : '저장하기'}
        </SaveButton>
      </FormFooter>
    </>
  );
};

export default PreQuestionEditForm;

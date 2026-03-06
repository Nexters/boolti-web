import { PlusIcon } from '@boolti/icon';
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

// 로컬 스타일
const PreQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PreQuestionItem = styled.div`
  padding: 20px 20px 24px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0 8px 14px 0 rgba(139, 139, 139, 0.15);
  overflow: hidden;

  ${mq_lg} {
    padding: 24px 28px 32px 28px;
  }
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

interface ShowPreQuestionFormContentProps {
  preQuestionList: PreQuestion[];
  onUpdateQuestion: (index: number, question: PreQuestion) => void;
  onAddQuestion: () => void;
  onDeleteQuestion: (index: number) => void;
}

const ShowPreQuestionFormContent = ({
  preQuestionList,
  onUpdateQuestion,
  onAddQuestion,
  onDeleteQuestion,
}: ShowPreQuestionFormContentProps) => {
  const confirm = useConfirm();

  const handleTextChange = (
    index: number,
    field: 'questionText' | 'description',
    value: string,
  ) => {
    const preQuestion = preQuestionList[index];

    onUpdateQuestion(index, {
      ...preQuestion,
      [field]: value,
    });
  };

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

  return (
    <PreQuestionContainer>
      {preQuestionList.map((preQuestion, index) => {
        const isQuestionOverLimit = preQuestion.questionText.length > MAX_LENGTH;
        const isDescriptionOverLimit = (preQuestion.description?.length ?? 0) > MAX_LENGTH;

        return (
          <PreQuestionItem key={preQuestion.id ?? `question-${index}`}>
            <PreQuestionRow>
              <PreQuestionLabel required>질문</PreQuestionLabel>
              <PreQuestionTextArea
                placeholder="ex. 어떤 팀을 보러 오셨나요? (100자 이내)"
                value={preQuestion.questionText}
                onChange={(e) => handleTextChange(index, 'questionText', e.target.value)}
                hasError={isQuestionOverLimit}
              />
              {isQuestionOverLimit && <ErrorMessage>100자 이내로 입력해 주세요</ErrorMessage>}
            </PreQuestionRow>
            <PreQuestionRow>
              <PreQuestionLabel>설명</PreQuestionLabel>
              <PreQuestionTextArea
                placeholder="설명을 입력해 주세요 (100자 이내)"
                value={preQuestion.description ?? ''}
                onChange={(e) => handleTextChange(index, 'description', e.target.value)}
                hasError={isDescriptionOverLimit}
              />
              {isDescriptionOverLimit && <ErrorMessage>100자 이내로 입력해 주세요</ErrorMessage>}
            </PreQuestionRow>
            <PreQuestionFooter>
              <DeleteButton type="button" onClick={() => void handleDeleteQuestion(index)}>
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

      <EmptyState onClick={onAddQuestion}>
        <AddButtonText>
          <PlusIcon />
          추가하기
        </AddButtonText>
      </EmptyState>
    </PreQuestionContainer>
  );
};

export default ShowPreQuestionFormContent;

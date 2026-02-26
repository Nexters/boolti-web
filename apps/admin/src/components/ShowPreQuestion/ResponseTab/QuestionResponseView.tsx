import { PreQuestionItem, PreQuestionAnswerItem } from '@boolti/api/src/types';
import Styled from './ResponseTab.styles';

interface QuestionCardProps {
  question: PreQuestionItem;
  answers: PreQuestionAnswerItem[];
  totalCount: number;
}

const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const QuestionCard = ({ question, answers, totalCount }: QuestionCardProps) => {
  const hasAnswers = answers.length > 0;

  return (
    <Styled.QuestionCard>
      <Styled.QuestionCardHeader>
        <Styled.QuestionTitleWrapper>
          <Styled.QuestionTitle>
            {question.question}
            {question.isRequired && <Styled.RequiredMark>*</Styled.RequiredMark>}
          </Styled.QuestionTitle>
          {question.description && (
            <Styled.QuestionDescription>{question.description}</Styled.QuestionDescription>
          )}
        </Styled.QuestionTitleWrapper>
        <Styled.AnswerCount>{totalCount}개의 응답</Styled.AnswerCount>
      </Styled.QuestionCardHeader>

      <Styled.QuestionCardBody>
        {hasAnswers ? (
          <Styled.AnswerList>
            {answers.map((answer) => (
              <Styled.AnswerItem key={answer.id}>
                <Styled.AnswerContent>
                  <Styled.AnswerText>{answer.answer}</Styled.AnswerText>
                  <Styled.AnswerMeta>
                    <span>{answer.reservationName}</span>
                    <Styled.MetaSeparator>·</Styled.MetaSeparator>
                    <span>{answer.salesTicketTypeName}</span>
                    <Styled.MetaSeparator>·</Styled.MetaSeparator>
                    <span>{answer.ticketCount}매</span>
                  </Styled.AnswerMeta>
                </Styled.AnswerContent>
                <Styled.AnswerTime>{formatDateTime(answer.createdAt)}</Styled.AnswerTime>
              </Styled.AnswerItem>
            ))}
          </Styled.AnswerList>
        ) : (
          <Styled.EmptyAnswer>작성된 응답이 없어요</Styled.EmptyAnswer>
        )}
      </Styled.QuestionCardBody>
    </Styled.QuestionCard>
  );
};

interface QuestionResponseViewProps {
  questions: PreQuestionItem[];
  answersMap: Map<number, { answers: PreQuestionAnswerItem[]; totalCount: number }>;
}

const QuestionResponseView = ({ questions, answersMap }: QuestionResponseViewProps) => {
  return (
    <Styled.QuestionCardList>
      {questions.map((question) => {
        const answerData = answersMap.get(question.id) ?? { answers: [], totalCount: 0 };
        return (
          <QuestionCard
            key={question.id}
            question={question}
            answers={answerData.answers}
            totalCount={answerData.totalCount}
          />
        );
      })}
    </Styled.QuestionCardList>
  );
};

export default QuestionResponseView;

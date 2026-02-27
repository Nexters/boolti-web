import {
  usePreQuestions,
  usePutPreQuestions,
  useShowDetail,
  useQueryClient,
  queryKeys,
  PreQuestionItem,
} from '@boolti/api';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { myHostInfoAtom } from '~/components/ShowDetailLayout';
import ShowDetailUnauthorized, { PAGE_PERMISSION } from '~/components/ShowDetailUnauthorized';
import { PreQuestionEditForm, PreQuestion, ResponseTab } from '~/components/ShowPreQuestion';
import { HostType } from '@boolti/api/src/types/host';

import Styled from './ShowPreQuestionPage.styles';
import { useToast } from '@boolti/ui';

type SubTab = 'edit' | 'response';

const MAX_LENGTH = 100;

const ShowPreQuestionPage = () => {
  const params = useParams<{ showId: string }>();
  const showId = Number(params!.showId);

  const queryClient = useQueryClient();
  const [myHostInfo] = useAtom(myHostInfoAtom);
  const [activeTab, setActiveTab] = useState<SubTab>('edit');

  // 질문 편집 상태
  const [preQuestionList, setPreQuestionList] = useState<PreQuestion[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: show } = useShowDetail(showId);
  const { data: preQuestionsData } = usePreQuestions(showId);
  const putPreQuestionsMutation = usePutPreQuestions();
  const toast = useToast();

  // 질문 마감 시간 = 공연 시작 시간
  const isQuestionDeadlineEnded = show?.date ? new Date(show.date) < new Date() : false;

  // API 데이터로 질문 목록 초기화
  useEffect(() => {
    if (preQuestionsData && !isInitialized) {
      const mappedQuestions: PreQuestion[] = preQuestionsData.preQuestions.map(
        (q: PreQuestionItem) => ({
          id: q.id,
          questionText: q.question, // GET 응답은 'question' 필드 사용
          description: q.description ?? '',
          isRequired: q.isRequired,
        }),
      );
      setPreQuestionList(mappedQuestions);
      setIsInitialized(true);
    }
  }, [preQuestionsData, isInitialized]);

  const handleAddQuestion = () => {
    if (isQuestionDeadlineEnded) {
      return;
    }

    setPreQuestionList((prev) => [
      ...prev,
      { questionText: '', description: '', isRequired: true },
    ]);
  };

  const handleUpdateQuestion = (index: number, updatedQuestion: PreQuestion) => {
    if (isQuestionDeadlineEnded) {
      return;
    }

    setPreQuestionList((prev) => prev.map((q, i) => (i === index ? updatedQuestion : q)));
  };

  const handleDeleteQuestion = (index: number) => {
    if (isQuestionDeadlineEnded) {
      return;
    }

    setPreQuestionList((prev) => prev.filter((_, i) => i !== index));
    toast.success('선택한 질문을 삭제했어요.');
  };

  const handleSave = async () => {
    if (isQuestionDeadlineEnded) {
      return;
    }

    // 빈 질문 체크
    const hasEmptyQuestion = preQuestionList.some((q) => !q.questionText.trim());
    if (hasEmptyQuestion) {
      alert('질문을 입력해 주세요.');
      return;
    }

    // 글자 수 체크
    const hasOverLimitQuestion = preQuestionList.some(
      (q) => q.questionText.length > MAX_LENGTH || (q.description?.length ?? 0) > MAX_LENGTH,
    );
    if (hasOverLimitQuestion) {
      alert('100자 이내로 입력해 주세요.');
      return;
    }

    try {
      await putPreQuestionsMutation.mutateAsync({
        showId,
        preQuestions: preQuestionList.map((q, index) => ({
          id: q.id,
          questionText: q.questionText,
          description: q.description || undefined,
          isRequired: q.isRequired,
          sequence: index + 1,
        })),
      });

      // 성공 시 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.preQuestion.list(showId).queryKey });
      toast.success('사전 질문을 저장했어요.');
    } catch {
      toast.error('사전 질문을 저장하는데 실패했어요. 다시 시도해 주세요.');
    }
  };

  const responseCount = useMemo(
    () => preQuestionsData?.totalRespondentCount ?? 0,
    [preQuestionsData],
  );
  const questions = useMemo(() => preQuestionsData?.preQuestions ?? [], [preQuestionsData]);
  const hasNoSavedQuestion = isInitialized && questions.length === 0;
  const isEditEmptyAfterDeadline = isQuestionDeadlineEnded && hasNoSavedQuestion;
  const isResponseTabDisabled = !isQuestionDeadlineEnded && hasNoSavedQuestion;
  const isSubTabHidden = isEditEmptyAfterDeadline;
  const currentTab: SubTab = isSubTabHidden || isResponseTabDisabled ? 'edit' : activeTab;
  const responseBadgeText = isResponseTabDisabled ? '-' : String(responseCount);

  if (!show || !myHostInfo) {
    return null;
  }

  if (!PAGE_PERMISSION['공연 정보'].includes(myHostInfo.type)) {
    return (
      <ShowDetailUnauthorized
        pageName={'사전 질문 관리'}
        name={myHostInfo.hostName as string}
        type={myHostInfo.type as HostType}
      />
    );
  }

  return (
    <Styled.ShowPreQuestionPage>
      {!isSubTabHidden && (
        <Styled.SubTabContainer>
          <Styled.SubTabItem active={currentTab === 'edit'} onClick={() => setActiveTab('edit')}>
            질문 편집
          </Styled.SubTabItem>
          <Styled.SubTabItem
            active={currentTab === 'response'}
            isDisabled={isResponseTabDisabled}
            disabled={isResponseTabDisabled}
            onClick={() => setActiveTab('response')}
          >
            응답 확인
            <Styled.Badge isDisabled={isResponseTabDisabled}>{responseBadgeText}</Styled.Badge>
          </Styled.SubTabItem>
        </Styled.SubTabContainer>
      )}

      <Styled.Content fullWidth={currentTab === 'response' || isEditEmptyAfterDeadline}>
        {currentTab === 'edit' && (
          <PreQuestionEditForm
            preQuestionList={preQuestionList}
            isDisabled={isQuestionDeadlineEnded}
            isSaving={putPreQuestionsMutation.isLoading}
            onUpdateQuestion={handleUpdateQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onAddQuestion={handleAddQuestion}
            onSave={handleSave}
          />
        )}
        {currentTab === 'response' && (
          <ResponseTab showId={showId} questions={questions} totalRespondentCount={responseCount} />
        )}
      </Styled.Content>
    </Styled.ShowPreQuestionPage>
  );
};

export default ShowPreQuestionPage;

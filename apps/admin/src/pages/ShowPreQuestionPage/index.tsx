import {
  usePreQuestions,
  usePutPreQuestions,
  useShowDetail,
  useQueryClient,
  queryKeys,
  PreQuestionItem,
} from '@boolti/api';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBlocker, useParams } from 'react-router-dom';

import { myHostInfoAtom } from '~/components/ShowDetailLayout';
import ShowDetailUnauthorized, { PAGE_PERMISSION } from '~/components/ShowDetailUnauthorized';
import { PreQuestionEditForm, PreQuestion, ResponseTab } from '~/components/ShowPreQuestion';
import { HostType } from '@boolti/api/src/types/host';

import Styled from './ShowPreQuestionPage.styles';
import { useConfirm, useToast } from '@boolti/ui';

type SubTab = 'edit' | 'response';

const MAX_LENGTH = 100;

const serializePreQuestionList = (list: PreQuestion[]) =>
  JSON.stringify(
    list.map((question) => ({
      id: question.id ?? null,
      questionText: question.questionText,
      description: question.description ?? '',
      isRequired: question.isRequired,
    })),
  );

const ShowPreQuestionPage = () => {
  const params = useParams<{ showId: string }>();
  const showId = Number(params!.showId);

  const queryClient = useQueryClient();
  const [myHostInfo] = useAtom(myHostInfoAtom);
  const [activeTab, setActiveTab] = useState<SubTab>('edit');

  // 질문 편집 상태
  const [preQuestionList, setPreQuestionList] = useState<PreQuestion[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [initialQuestionSnapshot, setInitialQuestionSnapshot] = useState<string | null>(null);

  const { data: show } = useShowDetail(showId);
  const { data: preQuestionsData } = usePreQuestions(showId);
  const putPreQuestionsMutation = usePutPreQuestions();
  const currentQuestionSnapshot = useMemo(
    () => serializePreQuestionList(preQuestionList),
    [preQuestionList],
  );
  const hasPendingSaveChanges = useMemo(() => {
    if (!isInitialized || initialQuestionSnapshot === null) {
      return false;
    }
    return currentQuestionSnapshot !== initialQuestionSnapshot;
  }, [currentQuestionSnapshot, initialQuestionSnapshot, isInitialized]);
  const toast = useToast();
  const confirm = useConfirm();
  const blocker = useBlocker(hasPendingSaveChanges);
  const { state: blockerState, proceed, reset } = blocker;
  const isHandlingBlockRef = useRef(false);

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
      setInitialQuestionSnapshot(serializePreQuestionList(mappedQuestions));
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
          description: q.description ?? '',
          isRequired: q.isRequired,
          sequence: index + 1,
        })),
      });

      // 성공 시 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.preQuestion.list(showId).queryKey });
      setInitialQuestionSnapshot(currentQuestionSnapshot);
      toast.success('사전 질문을 저장했어요.');
    } catch {
      toast.error('사전 질문을 저장하는데 실패했어요. 다시 시도해 주세요.');
    }
  };

  const confirmSavePreQuestion = useCallback(async () => {
    if (!hasPendingSaveChanges) return true;

    const result = await confirm(
      <Styled.ConfirmMessageContainer>
        <Styled.ConfirmMessage>
          저장하지 않고 이 페이지를 나가면 작성한 정보가 손실됩니다.
          <br />
          이 페이지를 나갈까요?
        </Styled.ConfirmMessage>
        <Styled.ConfirmSubMessage>
          *페이지 하단의 [저장하기] 버튼을 눌러 정보를 저장할 수 있습니다.
        </Styled.ConfirmSubMessage>
      </Styled.ConfirmMessageContainer>,
      {
        cancel: '나가기',
        confirm: '머무르기',
      },
    );

    return !result;
  }, [confirm, hasPendingSaveChanges]);

  useEffect(() => {
    if (blockerState !== 'blocked' || isHandlingBlockRef.current) {
      return;
    }

    isHandlingBlockRef.current = true;
    void (async () => {
      try {
        const shouldLeave = await confirmSavePreQuestion();

        if (shouldLeave) {
          proceed();
        } else {
          reset();
        }
      } finally {
        isHandlingBlockRef.current = false;
      }
    })();
  }, [blockerState, confirmSavePreQuestion, proceed, reset]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasPendingSaveChanges) {
        return;
      }

      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasPendingSaveChanges]);

  const responseCount = useMemo(
    () => preQuestionsData?.totalRespondentCount ?? 0,
    [preQuestionsData],
  );
  const questions = useMemo(() => preQuestionsData?.preQuestions ?? [], [preQuestionsData]);
  const hasNoSavedQuestion = isInitialized && questions.length === 0;
  const shouldShowResponseTab = !hasNoSavedQuestion;
  const isEditEmptyAfterDeadline = isQuestionDeadlineEnded && hasNoSavedQuestion;
  const currentTab: SubTab = shouldShowResponseTab ? activeTab : 'edit';
  const responseBadgeText = String(responseCount);

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
      {!isEditEmptyAfterDeadline && (
        <Styled.SubTabContainer>
          <Styled.SubTabItem active={currentTab === 'edit'} onClick={() => setActiveTab('edit')}>
            질문 편집
          </Styled.SubTabItem>
          {shouldShowResponseTab && (
            <Styled.SubTabItem
              active={currentTab === 'response'}
              onClick={() => setActiveTab('response')}
            >
              응답 확인
              <Styled.Badge isActive={currentTab === 'response'}>{responseBadgeText}</Styled.Badge>
            </Styled.SubTabItem>
          )}
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

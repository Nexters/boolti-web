import {
  TicketType,
  useShowDetail,
  useShowEnteranceInfo,
  useShowEnterances,
  useShowEnteranceSummary,
} from '@boolti/api';
import { ClearIcon, SearchIcon } from '@boolti/icon';
import { useDialog } from '@boolti/ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EnteranceTable from '~/components/EnteranceTable';
import EntranceConfirmDialogContent from '~/components/EntranceConfirmDialogContent';
import Pagination from '~/components/Pagination';
import ShowDetailLayout from '~/components/ShowDetailLayout';
import TicketTypeSelect from '~/components/TicketTypeSelect';

import Styled from './ShowEnterancePage.styles';

const ShowEnterancePage = () => {
  const params = useParams<{ showId: string }>();
  const { open } = useDialog();

  const [selectedTicketType, setSelectedTicketType] = useState<TicketType | 'ALL'>('ALL');
  const [isEnteredTicket, setIsEnteredTicket] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const showId = Number(params!.showId);
  const { data: show } = useShowDetail(showId);
  const { data: entranceSummary } = useShowEnteranceSummary(showId);
  const { data: enteranceInfo } = useShowEnteranceInfo(showId);
  const { data: enterances, isLoading: isEntranceListLoading } = useShowEnterances(
    showId,
    isEnteredTicket,
    selectedTicketType === 'ALL' ? undefined : selectedTicketType,
    debouncedSearchText,
  );

  const currentEnterances = (enterances?.pages ?? [])[currentPage];
  const totalPages = currentEnterances?.totalPages;
  const reservations = (currentEnterances?.content ?? []).filter(
    ({ entered, ticketType }) =>
      entered === isEnteredTicket &&
      (selectedTicketType === 'ALL' || ticketType === selectedTicketType),
  );

  const onClickReset = () => {
    setSelectedTicketType('ALL');
    setSearchText('');
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchText]);

  if (!show || !entranceSummary || !enteranceInfo) return null;

  const {
    totalTicketCount = 0,
    enteredTicketCount = 0,
    notEnteredTicketCount = 0,
  } = entranceSummary ?? {};
  const { managerCode } = enteranceInfo ?? {};

  return (
    <ShowDetailLayout showName={show.name}>
      {totalTicketCount === 0 ? (
        <Styled.Empty>
          아직 판매한 티켓이 없어요.{'\n'}
          티켓을 판매하고 관객 입장을 관리해 보세요.
        </Styled.Empty>
      ) : (
        <Styled.Container>
          <Styled.InfoContainer>
            <Styled.InfoText>인증코드 : {managerCode}</Styled.InfoText>
            <Styled.QuestionTextButton
              onClick={() => {
                open({
                  title: '관객 입장 확인 방법',
                  content: <EntranceConfirmDialogContent />,
                  isAuto: true,
                });
              }}
            >
              인증 코드는 어떻게 사용할 수 있나요?
            </Styled.QuestionTextButton>
          </Styled.InfoContainer>
          <Styled.SummaryContainer>
            <Styled.Summary colorTheme="grey">
              <Styled.SumamryLabel>미입장 관객</Styled.SumamryLabel>
              <Styled.SumamryValue>{notEnteredTicketCount}명</Styled.SumamryValue>
            </Styled.Summary>
            <Styled.Summary colorTheme="grey">
              <Styled.SumamryLabel>입장 확인 관객</Styled.SumamryLabel>
              <Styled.SumamryValue>{enteredTicketCount}명</Styled.SumamryValue>
            </Styled.Summary>
            <Styled.Summary colorTheme="red">
              <Styled.SumamryLabel>방문 예정 관객</Styled.SumamryLabel>
              <Styled.SumamryValue>{totalTicketCount}명</Styled.SumamryValue>
            </Styled.Summary>
          </Styled.SummaryContainer>
          <Styled.EnteranceSummaryContainer>
            <Styled.EnteranceSummaryButton
              onClick={() => {
                setIsEnteredTicket(false);
              }}
              isSelected={!isEnteredTicket}
            >
              미입장 <span>{notEnteredTicketCount}</span>
            </Styled.EnteranceSummaryButton>
            <Styled.EnteranceSummaryButton
              onClick={() => {
                setIsEnteredTicket(true);
              }}
              isSelected={isEnteredTicket}
            >
              입장 확인 <span>{enteredTicketCount}</span>
            </Styled.EnteranceSummaryButton>
            <TicketTypeSelect
              onChange={(value) => setSelectedTicketType(value as TicketType | 'ALL')}
            />
            <Styled.InputContainer>
              <Styled.Input
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                }}
                placeholder="예매자 이름, 연락처 검색"
              />
              <Styled.ButtonContainer>
                {searchText !== '' && (
                  <Styled.InputButton onClick={() => setSearchText('')}>
                    <ClearIcon />
                  </Styled.InputButton>
                )}
                <Styled.InputButton>
                  <SearchIcon />
                </Styled.InputButton>
              </Styled.ButtonContainer>
            </Styled.InputContainer>
          </Styled.EnteranceSummaryContainer>
          {!isEntranceListLoading && (
            <EnteranceTable
              data={reservations}
              isEnteredTicket={isEnteredTicket}
              isSearchResult={debouncedSearchText !== ''}
              onClickReset={onClickReset}
            />
          )}
          {reservations.length !== 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onClickPage={setCurrentPage}
            />
          )}
        </Styled.Container>
      )}
    </ShowDetailLayout>
  );
};

export default ShowEnterancePage;

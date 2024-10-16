import {
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
import MobileCardList from '~/components/MobileCardList';
import Pagination from '~/components/Pagination';
import TicketTypeSelect from '~/components/TicketTypeSelect';

import Styled from './ShowEnterancePage.styles';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useTheme } from '@emotion/react';
import { BooltiGreyIcon } from '@boolti/icon/src/components/BooltiGreyIcon';

const ShowEnterancePage = () => {
  const params = useParams<{ showId: string }>();
  const { open, close } = useDialog();

  const [selectedTicketType, setSelectedTicketType] = useState<
    React.ComponentProps<typeof TicketTypeSelect>['value']
  >({ value: 'ALL', label: '티켓 전체' });
  const [isEnteredTicket, setIsEnteredTicket] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const showId = Number(params!.showId);
  const { data: show } = useShowDetail(showId);
  const { data: entranceSummary } = useShowEnteranceSummary(showId);
  const { data: enteranceInfo } = useShowEnteranceInfo(showId);
  const { data: enteranceData, isLoading: isEntranceListLoading } = useShowEnterances(
    showId,
    currentPage,
    isEnteredTicket,
    selectedTicketType.value === 'ALL' ? undefined : selectedTicketType.value,
    debouncedSearchText,
  );

  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  const totalPages = enteranceData?.totalPages ?? 0;
  const reservations = (enteranceData?.content ?? []).filter(
    ({ entered, ticketType }) =>
      entered === isEnteredTicket &&
      (selectedTicketType.value === 'ALL' || ticketType === selectedTicketType.value),
  );

  const onClickReset = () => {
    setSelectedTicketType({ value: 'ALL', label: '티켓 전체' });
    setSearchText('');
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchText]);

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTicketType, isEnteredTicket, debouncedSearchText]);

  if (!show || !entranceSummary || !enteranceInfo) return null;

  const {
    totalTicketCount = 0,
    enteredTicketCount = 0,
    notEnteredTicketCount = 0,
  } = entranceSummary ?? {};
  const { managerCode } = enteranceInfo ?? {};

  return (
    <>
      {totalTicketCount === 0 ? (
        <Styled.EmptyContainer>
          <BooltiGreyIcon />
          <Styled.EmptyTitle>
            아직 판매한 티켓이 없어요.{'\n'}
            티켓을 판매하고 관객 입장을 관리해 보세요.
          </Styled.EmptyTitle>
        </Styled.EmptyContainer>
      ) : (
        <Styled.Container>
          <Styled.InfoContainer>
            <Styled.InfoText>입장 코드 : {managerCode}</Styled.InfoText>
            <Styled.QuestionTextButton
              onClick={() => {
                open({
                  title: '관객 입장 확인 방법',
                  content: <EntranceConfirmDialogContent close={close} />,
                  isAuto: true,
                });
              }}
            >
              입장 코드는 어떻게 사용할 수 있나요?
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
            <Styled.SummaryButtonContainer>
              <Styled.EnteranceSummaryButton
                onClick={() => {
                  setIsEnteredTicket(false);
                  onClickReset();
                }}
                isSelected={!isEnteredTicket}
              >
                미입장 <span>{notEnteredTicketCount}</span>
              </Styled.EnteranceSummaryButton>
              <Styled.EnteranceSummaryButton
                onClick={() => {
                  setIsEnteredTicket(true);
                  onClickReset();
                }}
                isSelected={isEnteredTicket}
              >
                입장 확인 <span>{enteredTicketCount}</span>
              </Styled.EnteranceSummaryButton>
            </Styled.SummaryButtonContainer>
            <Styled.FilterContainer>
              <TicketTypeSelect
                value={selectedTicketType}
                onChange={(value) => setSelectedTicketType(value)}
              />
              <Styled.InputContainer>
                <Styled.Input
                  value={searchText}
                  onChange={(event) => {
                    setSearchText(event.target.value);
                  }}
                  placeholder={isMobile ? '이름, 연락처 검색' : '방문자 이름, 연락처 검색'}
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
            </Styled.FilterContainer>
          </Styled.EnteranceSummaryContainer>
          {!isEntranceListLoading && (
            <>
              <Styled.TableContainer>
                <EnteranceTable
                  data={reservations}
                  isEnteredTicket={isEnteredTicket}
                  searchText={debouncedSearchText}
                  onClickReset={onClickReset}
                />
              </Styled.TableContainer>
              <MobileCardList
                items={reservations.map((reservation) => ({
                  id: reservation.ticketId,
                  badgeText: reservation.ticketType === 'INVITE' ? '초청티켓' : '일반티켓',
                  name: reservation.reservationName,
                  date: reservation.enteredAt,
                  phoneNumber: reservation.reservationPhoneNumber,
                  ticketName: reservation.ticketName,
                  count: 1,
                }))}
                searchText={debouncedSearchText}
                emptyText={isEnteredTicket ? '입장 관객이 없어요.' : '미입장 관객이 없어요.'}
                onClickReset={onClickReset}
              />
            </>
          )}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onClickPage={setCurrentPage}
            />
          )}
        </Styled.Container>
      )}
    </>
  );
};

export default ShowEnterancePage;

import {
  TicketStatus,
  useShowDetail,
  useShowReservations,
  useShowReservationSummary,
} from '@boolti/api';
import { ClearIcon, SearchIcon } from '@boolti/icon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MobileCardList from '~/components/MobileCardList';
import Pagination from '~/components/Pagination';
import ReservationTable from '~/components/ReservationTable';
import ShowDetailLayout from '~/components/ShowDetailLayout';
import TicketTypeSelect from '~/components/TicketTypeSelect';

import Styled from './ShowReservationPage.styles';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useTheme } from '@emotion/react';
import { BooltiGreyIcon } from '@boolti/icon/src/components/BooltiGreyIcon';

const emptyLabel: Record<TicketStatus, string> = {
  COMPLETE: '발권 왼료된 티켓이 없어요.',
  CANCEL: '발권 취소된 티켓이 없어요.',
};

const ShowReservationPage = () => {
  const params = useParams<{ showId: string }>();
  const [selectedTicketType, setSelectedTicketType] = useState<
    React.ComponentProps<typeof TicketTypeSelect>['value']
  >({ value: 'ALL', label: '티켓 전체' });
  const [selectedTicketStatus, setSelectedTicketStatus] = useState<TicketStatus>('COMPLETE');
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const showId = Number(params!.showId);
  const [currentPage, setCurrentPage] = useState(0);

  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  const { data: show } = useShowDetail(showId);
  const { data: reservationSummary } = useShowReservationSummary(showId);
  const { data: reservationData, isLoading: isReservationPagesLoading } = useShowReservations(
    showId,
    currentPage,
    selectedTicketType.value === 'ALL' ? undefined : selectedTicketType.value,
    selectedTicketStatus,
    debouncedSearchText,
  );
  const totalPages = reservationData?.totalPages ?? 0;
  const reservations = (reservationData?.content ?? []).filter(
    ({ ticketStatus, ticketType }) =>
      ticketStatus === selectedTicketStatus &&
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
  }, [selectedTicketType, selectedTicketStatus, debouncedSearchText]);

  if (!show || !reservationSummary) return null;

  const {
    salesTicketSoldCount,
    totalSalesAmount,
    invitationTicketSoldCount,
    totalSoldCount,
    completeCount,
    cancelCount,
  } = reservationSummary;

  return (
    <ShowDetailLayout showName={show.name}>
      {totalSoldCount === 0 ? (
        <Styled.EmptyContainer>
          <BooltiGreyIcon />
          <Styled.EmptyTitle>
            아직 판매한 티켓이 없어요.{'\n'}
            티켓을 판매하고 방문자 명단을 관리해 보세요.
          </Styled.EmptyTitle>
        </Styled.EmptyContainer>
      ) : (
        <Styled.Container>
          <Styled.TicketSummaryContainer>
            <Styled.TicketSummary colorTheme="grey">
              <Styled.TicketSumamryLabel>일반 티켓</Styled.TicketSumamryLabel>
              <Styled.TicketSumamryValue>{salesTicketSoldCount}매</Styled.TicketSumamryValue>
            </Styled.TicketSummary>
            <Styled.TicketSummary colorTheme="grey">
              <Styled.TicketSumamryLabel>초청 티켓</Styled.TicketSumamryLabel>
              <Styled.TicketSumamryValue>{invitationTicketSoldCount}매</Styled.TicketSumamryValue>
            </Styled.TicketSummary>
            <Styled.TicketSummary colorTheme="grey">
              <Styled.TicketSumamryLabel>총 발권된 티켓</Styled.TicketSumamryLabel>
              <Styled.TicketSumamryValue>{totalSoldCount}매</Styled.TicketSumamryValue>
            </Styled.TicketSummary>
            <Styled.TicketSummary colorTheme="red">
              <Styled.TicketSumamryLabel>공연 수익</Styled.TicketSumamryLabel>
              <Styled.TicketSumamryValue>
                {totalSalesAmount.toLocaleString()}원
              </Styled.TicketSumamryValue>
            </Styled.TicketSummary>
          </Styled.TicketSummaryContainer>
          <Styled.TicketReservationSummaryContainer>
            <Styled.TicketReservationSummaryButtonContainer>
              <Styled.TicketReservationSummaryButton
                onClick={() => {
                  setSelectedTicketStatus('COMPLETE');
                  onClickReset();
                }}
                isSelected={selectedTicketStatus === 'COMPLETE'}
              >
                발권 완료 <span>{completeCount}</span>
              </Styled.TicketReservationSummaryButton>
              <Styled.TicketReservationSummaryButton
                onClick={() => {
                  setSelectedTicketStatus('CANCEL');
                  onClickReset();
                }}
                isSelected={selectedTicketStatus === 'CANCEL'}
              >
                발권 취소 <span>{cancelCount}</span>
              </Styled.TicketReservationSummaryButton>
            </Styled.TicketReservationSummaryButtonContainer>
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
          </Styled.TicketReservationSummaryContainer>
          {!isReservationPagesLoading && (
            <>
              <Styled.TableContainer>
                <ReservationTable
                  data={reservations}
                  selectedTicketStatus={selectedTicketStatus}
                  searchText={debouncedSearchText}
                  onClickReset={onClickReset}
                  emptyText={emptyLabel[selectedTicketStatus]}
                />
              </Styled.TableContainer>
              <MobileCardList
                items={reservations.map((reservation) => ({
                  id: reservation.ticketId,
                  badgeText: reservation.ticketType === 'INVITE' ? '초청티켓' : '일반티켓',
                  name: reservation.reservationName,
                  phoneNumber: reservation.reservationPhoneNumber,
                  ticketName: reservation.ticketName,
                  count: 1,
                }))}
                searchText={debouncedSearchText}
                emptyText={emptyLabel[selectedTicketStatus]}
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
    </ShowDetailLayout>
  );
};

export default ShowReservationPage;

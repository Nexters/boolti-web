import {
  TicketStatus,
  useAdminReservationSummaryV2,
  useShowDetail,
  useShowReservationWithTickets,
} from '@boolti/api';
import { ClearIcon, SearchIcon } from '@boolti/icon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MobileCardList from '~/components/MobileCardList';
import Pagination from '~/components/Pagination';
import ReservationTable from '~/components/ReservationTable';
import TicketTypeSelect from '~/components/TicketTypeSelect';

import Styled from './ShowReservationPage.styles';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useTheme } from '@emotion/react';
import { BooltiGreyIcon } from '@boolti/icon/src/components/BooltiGreyIcon';
import { myHostInfoAtom } from '~/components/ShowDetailLayout';
import { useAtom } from 'jotai';
import ShowDetailUnauthorized, { PAGE_PERMISSION } from '~/components/ShowDetailUnauthorized';

const emptyLabel: Record<TicketStatus, string> = {
  COMPLETE: '결제 완료된 티켓이 없어요.',
  WAIT: '결제 대기 중인 티켓이 없어요.',
  CANCEL: '결제 취소된 티켓이 없어요.',
};

const ShowReservationPage = () => {
  const params = useParams<{ showId: string }>();
  const [myHostInfo] = useAtom(myHostInfoAtom);

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
  const { data: reservationSummary } = useAdminReservationSummaryV2(showId);
  const { data: reservationData, isLoading: isReservationPagesLoading } =
    useShowReservationWithTickets(
      showId,
      currentPage,
      selectedTicketType.value === 'ALL' ? undefined : selectedTicketType.value,
      selectedTicketStatus,
      debouncedSearchText,
    );
  const totalPages = reservationData?.totalPages ?? 0;
  const reservations = (reservationData?.content ?? []).filter(
    ({ paymentManagementStatus, salesTicketType }) =>
      paymentManagementStatus === selectedTicketStatus &&
      (selectedTicketType.value === 'ALL' ||
        salesTicketType?.ticketType === selectedTicketType.value),
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

  if (!show || !reservationSummary || !myHostInfo) return null;

  if (!PAGE_PERMISSION['결제 관리'].includes(myHostInfo.type)) {
    return (
      <ShowDetailUnauthorized
        pageName={'결제 관리'}
        name={myHostInfo.hostName}
        type={myHostInfo.type}
      />
    );
  }

  const {
    totalPaymentAmount,
    totalReservationCount,
    totalReservedTicketCount,
    waitedReservationCount,
    completedReservationCount,
    cancelledReservationCount,
  } = reservationSummary;

  return (
    <>
      {totalReservationCount === 0 ? (
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
              <Styled.TicketSumamryLabel>결제 건수</Styled.TicketSumamryLabel>
              <Styled.TicketSumamryValue>{totalReservationCount}건</Styled.TicketSumamryValue>
            </Styled.TicketSummary>
            <Styled.TicketSummary colorTheme="grey">
              <Styled.TicketSumamryLabel>발권 티켓</Styled.TicketSumamryLabel>
              <Styled.TicketSumamryValue>{totalReservedTicketCount}매</Styled.TicketSumamryValue>
            </Styled.TicketSummary>
            <Styled.TicketSummary colorTheme="red">
              <Styled.TicketSumamryLabel>결제 금액</Styled.TicketSumamryLabel>
              <Styled.TicketSumamryValue>
                {totalPaymentAmount.toLocaleString()}원
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
                {isMobile ? '완료' : '결제 완료'} <span>{completedReservationCount}</span>
              </Styled.TicketReservationSummaryButton>
              <Styled.TicketReservationSummaryButton
                onClick={() => {
                  setSelectedTicketStatus('WAIT');
                  onClickReset();
                }}
                isSelected={selectedTicketStatus === 'WAIT'}
              >
                {isMobile ? '대기' : '결제 대기'} <span>{waitedReservationCount}</span>
              </Styled.TicketReservationSummaryButton>
              <Styled.TicketReservationSummaryButton
                onClick={() => {
                  setSelectedTicketStatus('CANCEL');
                  onClickReset();
                }}
                isSelected={selectedTicketStatus === 'CANCEL'}
              >
                {isMobile ? '취소' : '결제 취소'} <span>{cancelledReservationCount}</span>
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
                  placeholder={isMobile ? '결제자명, 연락처' : '결제자명, 연락처 검색'}
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
                  id: reservation.csReservationId,
                  name: reservation.paymentInfo?.payerName ?? '',
                  phoneNumber: reservation.paymentInfo?.payerPhoneNumber ?? '',
                  ticketName: reservation.salesTicketType?.ticketName ?? '',
                  count: reservation.tickets.length,
                  type: reservation.cancelInfo
                    ? 'LINE_THROUGH'
                    : !!reservation.gift && !reservation.gift.done
                      ? 'DISABLED'
                      : 'NORMAL',
                  status:
                    !!reservation.gift && !reservation.gift.done
                      ? '선물 미등록'
                      : `${reservation.salesTicketType?.price.toLocaleString()}원`,
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
    </>
  );
};

export default ShowReservationPage;

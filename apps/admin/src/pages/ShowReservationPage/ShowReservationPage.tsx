import { useShowDetail, useShowReservations, useShowReservationSummary } from '@boolti/api';
import { ClearIcon, SearchIcon } from '@boolti/icon';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ReservationTable from '~/components/ReservationTable';
import ShowDetailLayout from '~/components/ShowDetailLayout';
import TicketTypeSelect from '~/components/TicketTypeSelect';

import Styled from './ShowReservationPage.styles';

const ShowReservationPage = () => {
  const params = useParams<{ showId: string }>();
  const [, setSelectedTicketType] = useState('ALL');
  const [searchText, setSearchText] = useState('');

  const showId = Number(params!.showId);
  const { data: show } = useShowDetail(showId);
  const { data: reservationSummary } = useShowReservationSummary(showId);
  const { data: reservationPages, hasNextPage } = useShowReservations(showId);

  const reservations = (reservationPages?.pages ?? []).flatMap((reservationPage) => reservationPage.content);

  if (!show || !reservationSummary) return null;

  const {
    salesTicketSoldCount,
    totalSalesAmount,
    invitationTicketSoldCount,
    totalSoldCount,
    waitCount,
    completeCount,
    cancelCount,
  } = reservationSummary;

  return (
    <ShowDetailLayout showName={show.name}>
      {totalSoldCount === 0 ? (
        <Styled.Empty>
          아직 판매한 티켓이 없어요.{'\n'}
          티켓을 판매하고 예매자 명단을 관리해 보세요.
        </Styled.Empty>
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
            <Styled.TicketReservationSummaryButton isSelected>
              발권 대기 <span>{waitCount}</span>
            </Styled.TicketReservationSummaryButton>
            <Styled.TicketReservationSummaryButton>
              발권 완료 <span>{completeCount}</span>
            </Styled.TicketReservationSummaryButton>
            <Styled.TicketReservationSummaryButton>
              발권 취소 <span>{cancelCount}</span>
            </Styled.TicketReservationSummaryButton>
            <TicketTypeSelect onChange={(value) => setSelectedTicketType(value)} />
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
          </Styled.TicketReservationSummaryContainer>
          <ReservationTable data={reservations} />
        </Styled.Container>
      )}
    </ShowDetailLayout>
  );
};

export default ShowReservationPage;

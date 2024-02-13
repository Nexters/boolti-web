import { useShowDetail, useShowReservations, useShowReservationSummary } from '@boolti/api';
import { useNavigate, useParams } from 'react-router-dom';

import ShowDetailLayout from '~/components/ShowDetailLayout';

import Styled from './ShowReservationPage.styles';

const ShowReservationPage = () => {
  const params = useParams<{ showId: string }>();
  const navigate = useNavigate();

  const showId = Number(params!.showId);
  const { data: show } = useShowDetail(showId);
  const { data: reservationSummary } = useShowReservationSummary(showId);
  const { data: reservations = [], hasNextPage } = useShowReservations(showId);

  if (!show || !reservationSummary) return null;

  const { salesTicketSoldCount, totalSalesAmount, invitationTicketSoldCount, totalSoldCount } =
    reservationSummary;

  return (
    <ShowDetailLayout showName={show.name}>
      <Styled.Container>
        <Styled.TicketSummaryContainer>
          <Styled.TicketSummary color="grey">
            <Styled.TicketSumamryLabel>일반 티켓</Styled.TicketSumamryLabel>
            <Styled.TicketSumamryValue>{salesTicketSoldCount}매</Styled.TicketSumamryValue>
          </Styled.TicketSummary>
          <Styled.TicketSummary color="grey">
            <Styled.TicketSumamryLabel>초청 티켓</Styled.TicketSumamryLabel>
            <Styled.TicketSumamryValue>{invitationTicketSoldCount}매</Styled.TicketSumamryValue>
          </Styled.TicketSummary>
          <Styled.TicketSummary color="grey">
            <Styled.TicketSumamryLabel>총 발권된 티켓</Styled.TicketSumamryLabel>
            <Styled.TicketSumamryValue>{totalSoldCount}매</Styled.TicketSumamryValue>
          </Styled.TicketSummary>
          <Styled.TicketSummary color="red">
            <Styled.TicketSumamryLabel>공연 수익</Styled.TicketSumamryLabel>
            <Styled.TicketSumamryValue>
              {totalSalesAmount.toLocaleString()}원
            </Styled.TicketSumamryValue>
          </Styled.TicketSummary>
        </Styled.TicketSummaryContainer>
      </Styled.Container>
    </ShowDetailLayout>
  );
};

export default ShowReservationPage;

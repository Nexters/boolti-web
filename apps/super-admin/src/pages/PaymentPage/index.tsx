import { useParams } from 'react-router-dom';
import PageLayout from '~/components/PageLayout/PageLayout';
import Styled from './PaymentPage.styles';
import { useEffect, useState } from 'react';
import TicketTypeSelect from '~/components/TicketTypeSelect/TicketTypeSelect';
import { Input, Pagination } from 'antd';
import {
  TicketStatus,
  TicketType,
  useAdminReservationSummary,
  useAdminReservations,
} from '@boolti/api';
import PaymentTable from '~/components/PaymentTable/PaymentTable';

const PaymentPage = () => {
  const params = useParams<{ showId: string }>();
  const showId = Number(params!.showId);

  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [selectedTicketStatus, setSelectedTicketStatus] = useState<TicketStatus>('COMPLETE');
  const [selectedTicketType, setSelectedTicketType] = useState<'ALL' | TicketType>('ALL');
  const [currentPage, setCurrentPage] = useState(0);

  const { Search } = Input;
  const { data: reservationSummary } = useAdminReservationSummary(showId);
  const {
    totalSalesAmount = 0,
    salesTicketSoldCount = 0,
    invitationTicketSoldCount = 0,
    totalSoldCount = 0,
    cancelCount = 0,
    completeCount = 0,
  } = reservationSummary ?? {};

  const { data: reservationData } = useAdminReservations(
    showId,
    currentPage,
    selectedTicketType === 'ALL' ? undefined : selectedTicketType,
    selectedTicketStatus,
    debouncedSearchText,
  );

  const { totalElements = 0 } = reservationData ?? {};
  const totalPages = reservationData?.totalPages ?? 0;
  const reservations = (reservationData?.content ?? []).filter(
    ({ ticketStatus, ticketType }) =>
      ticketStatus === selectedTicketStatus &&
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

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTicketType, selectedTicketStatus, debouncedSearchText]);

  return (
    <PageLayout
      breadscrumb="방문자 관리 / 결제 관리"
      title="결제 관리"
      description={`수정 시 웹 / 앱에 실시간으로 적용됩니다. 주최자가 직접 정보를 컨트롤 할 수 없는\n'티켓 판매 중, 공연 종료 이후'에 요청이 있는 경우에만 활용해 주세요.`}
    >
      <Styled.SummaryContainer>
        <Styled.SummaryRow>
          <Styled.Summary>
            <Styled.SummaryLabel big>공연 수익</Styled.SummaryLabel>
            <Styled.SummaryValue big>{totalSalesAmount.toLocaleString()}원</Styled.SummaryValue>
          </Styled.Summary>
          <Styled.Summary flex={2}>
            <Styled.SummaryLabel big>수수료(1.0%)</Styled.SummaryLabel>
            <Styled.SummaryValue big>
              {(totalSalesAmount * 0.01).toLocaleString()}원
            </Styled.SummaryValue>
          </Styled.Summary>
        </Styled.SummaryRow>
        <Styled.SummaryRow>
          <Styled.Summary>
            <Styled.SummaryLabel>일반 티켓</Styled.SummaryLabel>
            <Styled.SummaryValue>{salesTicketSoldCount.toLocaleString()}매</Styled.SummaryValue>
          </Styled.Summary>
          <Styled.Summary>
            <Styled.SummaryLabel>초청 티켓</Styled.SummaryLabel>
            <Styled.SummaryValue>
              {invitationTicketSoldCount.toLocaleString()}매
            </Styled.SummaryValue>
          </Styled.Summary>
          <Styled.Summary>
            <Styled.SummaryLabel>총 발권된 티켓</Styled.SummaryLabel>
            <Styled.SummaryValue>{totalSoldCount.toLocaleString()}매</Styled.SummaryValue>
          </Styled.Summary>
        </Styled.SummaryRow>
      </Styled.SummaryContainer>
      <Styled.Filter>
        <Styled.FilterCol>
          <Styled.PaymentSummaryButton
            onClick={() => {
              setSelectedTicketStatus('COMPLETE');
              onClickReset();
            }}
            isSelected={selectedTicketStatus === 'COMPLETE'}
          >
            발권 완료 <span>{completeCount}</span>
          </Styled.PaymentSummaryButton>
          <Styled.PaymentSummaryButton
            onClick={() => {
              setSelectedTicketStatus('CANCEL');
              onClickReset();
            }}
            isSelected={selectedTicketStatus === 'CANCEL'}
          >
            발권 취소 <span>{cancelCount}</span>
          </Styled.PaymentSummaryButton>
        </Styled.FilterCol>
        <Styled.FilterCol>
          <TicketTypeSelect
            ticketType={selectedTicketType}
            onChange={(value) => setSelectedTicketType(value)}
          />
          <Search
            value={searchText}
            placeholder="방문자 이름, 연락처 검색"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Styled.FilterCol>
      </Styled.Filter>
      <PaymentTable data={reservations} ticketStatus={selectedTicketStatus} />
      {totalPages > 0 && (
        <Pagination
          style={{ marginTop: 16 }}
          current={currentPage}
          total={totalElements}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      )}
    </PageLayout>
  );
};

export default PaymentPage;

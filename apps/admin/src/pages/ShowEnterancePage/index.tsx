import {
  useAdminSalesTicketList,
  useAdminTicketList,
  useShowDetail,
  useShowEnteranceInfo,
  useShowEnteranceSummary,
} from '@boolti/api';
import { ClearIcon, SearchIcon } from '@boolti/icon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import EnteranceTable from '~/components/EnteranceTable';
import MobileCardList from '~/components/MobileCardList';
import Pagination from '~/components/Pagination';

import Styled from './ShowEnterancePage.styles';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useTheme } from '@emotion/react';
import { BooltiGreyIcon } from '@boolti/icon/src/components/BooltiGreyIcon';
import TicketNameFilter from '~/components/TicketNameFilter';
import { format } from 'date-fns';
import ShowDetailUnauthorized, { PAGE_PERMISSION } from '~/components/ShowDetailUnauthorized';
import { useAtom } from 'jotai';
import { myHostInfoAtom } from '~/components/ShowDetailLayout';

type TicketType = 'ALL' | 'USED' | 'UNUSED';

const ShowEnterancePage = () => {
  const params = useParams<{ showId: string }>();
  const [myHostInfo] = useAtom(myHostInfoAtom);

  const [enteranceTicketType, setEnteranceTicetType] = useState<TicketType>('ALL');
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const showId = Number(params!.showId);
  const { data: show } = useShowDetail(showId);
  const { data: entranceSummary } = useShowEnteranceSummary(showId);
  const { data: enteranceInfo } = useShowEnteranceInfo(showId);

  const useTicketUsedFilter =
    enteranceTicketType === 'ALL' ? undefined : enteranceTicketType === 'USED';

  const { data: salesTicketList = [] } = useAdminSalesTicketList(showId);

  const [selectedTicketId, setSelectedTicketId] = useState<string[]>([]);
  const options = salesTicketList.map((ticket) => ({
    value: ticket.id.toString(),
    label: ticket.ticketName,
  }));
  const { data: ticketList, isLoading: isTicketListLoading } = useAdminTicketList(
    showId,
    currentPage,
    searchText,
    selectedTicketId,
    useTicketUsedFilter,
  );

  const deviceWidth = useDeviceWidth();
  const theme = useTheme();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  const totalPages = ticketList?.totalPages ?? 0;
  const tickets = (ticketList?.content ?? []).filter(
    ({ usedAt }) => useTicketUsedFilter === undefined || !!usedAt === useTicketUsedFilter,
  );

  const onClickReset = () => {
    setSelectedTicketId([]);
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
  }, [selectedTicketId, useTicketUsedFilter, debouncedSearchText]);

  if (!show || !entranceSummary || !enteranceInfo || !ticketList || !myHostInfo) return null;

  if (!PAGE_PERMISSION['방문자 관리'].includes(myHostInfo.type)) {
    return (
      <ShowDetailUnauthorized
        pageName={'방문자 관리'}
        name={myHostInfo.hostName}
        type={myHostInfo.type}
      />
    );
  }

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
            아직 판매한 티켓이 없어요.{'\n'}티켓을 판매하고 방문자 명단을 관리해 보세요.
          </Styled.EmptyTitle>
        </Styled.EmptyContainer>
      ) : (
        <Styled.Container>
          <Styled.SummaryContainer>
            <Styled.Summary colorTheme="white">
              <Styled.SumamryLabel bold>입장 코드 : {managerCode}</Styled.SumamryLabel>
              <Styled.QuestionTextButton
                onClick={() => {
                  window.open(
                    'https://boolti.notion.site/d83a2f0e0b3f4b83afa7cec5b0a36d45',
                    '_blank',
                  );
                }}
              >
                사용 방법
              </Styled.QuestionTextButton>
            </Styled.Summary>
            <Styled.Summary colorTheme="grey">
              <Styled.SumamryLabel>방문 예정자</Styled.SumamryLabel>
              <Styled.SumamryValue>{notEnteredTicketCount}명</Styled.SumamryValue>
            </Styled.Summary>
            <Styled.Summary colorTheme="grey">
              <Styled.SumamryLabel>방문자</Styled.SumamryLabel>
              <Styled.SumamryValue>{enteredTicketCount}명</Styled.SumamryValue>
            </Styled.Summary>
          </Styled.SummaryContainer>
          <Styled.EnteranceSummaryContainer>
            <Styled.SummaryButtonContainer>
              <Styled.EnteranceSummaryButton
                onClick={() => {
                  setEnteranceTicetType('ALL');
                  onClickReset();
                }}
                isSelected={enteranceTicketType === 'ALL'}
              >
                전체
              </Styled.EnteranceSummaryButton>
              <Styled.EnteranceSummaryButton
                onClick={() => {
                  setEnteranceTicetType('UNUSED');
                  onClickReset();
                }}
                isSelected={enteranceTicketType === 'UNUSED'}
              >
                {isMobile ? '방문 예정' : '미방문자'} <span>{notEnteredTicketCount}</span>
              </Styled.EnteranceSummaryButton>
              <Styled.EnteranceSummaryButton
                onClick={() => {
                  setEnteranceTicetType('USED');
                  onClickReset();
                }}
                isSelected={enteranceTicketType === 'USED'}
              >
                {isMobile ? '방문' : '방문자'} <span>{enteredTicketCount}</span>
              </Styled.EnteranceSummaryButton>
            </Styled.SummaryButtonContainer>
            <Styled.FilterContainer>
              <TicketNameFilter
                selectedValues={selectedTicketId}
                updateSelectValues={setSelectedTicketId}
                options={options}
              />
              <Styled.InputContainer>
                <Styled.Input
                  value={searchText}
                  onChange={(event) => {
                    setSearchText(event.target.value);
                  }}
                  placeholder={isMobile ? '방문자명, 연락처' : '방문자명, 연락처 검색'}
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
          {!isTicketListLoading && (
            <>
              <Styled.TableContainer>
                <EnteranceTable
                  data={tickets}
                  isEnteredTicket={useTicketUsedFilter}
                  searchText={debouncedSearchText}
                  onClickReset={onClickReset}
                />
              </Styled.TableContainer>
              <MobileCardList
                items={tickets.map((ticket) => ({
                  id: ticket.id,
                  name: ticket.reservation.reservationHolder.name,
                  date: ticket.usedAt,
                  phoneNumber: ticket.reservation.reservationHolder.phoneNumber,
                  ticketName: ticket.salesTicketType.ticketName,
                  type: ticket?.usedAt ? 'NORMAL' : 'DISABLED',
                  status: ticket?.usedAt ? format(ticket.usedAt, 'yyyy.MM.dd HH:mm') : '미방문',
                }))}
                searchText={debouncedSearchText}
                emptyText={useTicketUsedFilter ? '아직 방문자가 없어요.' : '미방문자가 없어요.'}
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

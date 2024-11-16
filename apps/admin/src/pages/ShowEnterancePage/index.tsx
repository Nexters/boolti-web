import {
  useAdminSalesTicketList,
  useAdminTicketList,
  useShowDetail,
  useShowEnteranceInfo,
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

import Styled from './ShowEnterancePage.styles';
import { useDeviceWidth } from '~/hooks/useDeviceWidth';
import { useTheme } from '@emotion/react';
import { BooltiGreyIcon } from '@boolti/icon/src/components/BooltiGreyIcon';
import TicketNameFilter from '~/components/TicketNameFilter';

type TicketType = 'ALL' | 'USED' | 'UNUSED';

const ShowEnterancePage = () => {
  const params = useParams<{ showId: string }>();
  const { open, close } = useDialog();

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

  if (!show || !entranceSummary || !enteranceInfo || !ticketList) return null;

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
                미방문자 <span>{notEnteredTicketCount}</span>
              </Styled.EnteranceSummaryButton>
              <Styled.EnteranceSummaryButton
                onClick={() => {
                  setEnteranceTicetType('USED');
                  onClickReset();
                }}
                isSelected={enteranceTicketType === 'USED'}
              >
                방문자 <span>{enteredTicketCount}</span>
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
                  status: ticket?.usedAt ? ticket.usedAt : '미방문',
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

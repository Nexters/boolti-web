import { useEffect, useState } from 'react';
import PageLayout from '~/components/PageLayout/PageLayout';
import { useParams } from 'react-router-dom';
import { SearchIcon } from '@boolti/icon';
import EntranceTable from '~/components/EntranceTable/EntranceTable';
import TicketTypeSelect from '~/components/TicketTypeSelect/TicketTypeSelect';
import Styled from './EntrancePage.styles';
import { useAdminEntranceInfo, useAdminEntranceSummary } from '@boolti/api';

const EntrancePage = () => {
  const params = useParams<{ showId: string }>();
  const showId = Number(params!.showId);
  const [searchText, setSearchText] = useState('');
  const [isEnteredTicket, setIsEnteredTicket] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState<
    React.ComponentProps<typeof TicketTypeSelect>['value']
  >({ value: 'ALL', label: '티켓 전체' });
  const { data: entranceSummary } = useAdminEntranceSummary(showId);
  const {
    notEnteredTicketCount = 0,
    enteredTicketCount = 0,
    totalTicketCount = 0,
  } = entranceSummary ?? {};
  const { data: entranceInfo } = useAdminEntranceInfo(showId);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onClickReset = () => {
    setSelectedTicketType({ value: 'ALL', label: '티켓 전체' });
    setSearchText('');
  };

  useEffect(() => {
    console.log(entranceSummary);
  }, [entranceSummary]);

  return (
    <PageLayout
      breadscrumb="방문자 관리 / 입장 관리"
      title="입장 관리"
      description={`수정 시 웹 / 앱에 실시간으로 적용됩니다. 주최자가 직접 정보를 컨트롤 할 수 없는\n'티켓 판매 중, 공연 종료 이후'에 요청이 있는 경우에만 활용해 주세요.`}
    >
      <Styled.EntranceCode>입장 코드 : {entranceInfo?.managerCode}</Styled.EntranceCode>
      <Styled.SummaryContainer>
        <Styled.Summary>
          <Styled.SummaryLabel>미입장 관객</Styled.SummaryLabel>
          <Styled.SummaryValue>{notEnteredTicketCount.toLocaleString()}명</Styled.SummaryValue>
        </Styled.Summary>
        <Styled.Summary>
          <Styled.SummaryLabel>입장 관객</Styled.SummaryLabel>
          <Styled.SummaryValue>{enteredTicketCount.toLocaleString()}명</Styled.SummaryValue>
        </Styled.Summary>
        <Styled.Summary>
          <Styled.SummaryLabel>방문 예정 관객</Styled.SummaryLabel>
          <Styled.SummaryValue>{totalTicketCount.toLocaleString()}명</Styled.SummaryValue>
        </Styled.Summary>
      </Styled.SummaryContainer>
      <Styled.Filter>
        <Styled.FilterCol>
          <Styled.EntranceSummaryButton
            onClick={() => {
              setIsEnteredTicket(false);
              onClickReset();
            }}
            isSelected={!isEnteredTicket}
          >
            미입장 <span>{4}</span>
          </Styled.EntranceSummaryButton>
          <Styled.EntranceSummaryButton
            onClick={() => {
              setIsEnteredTicket(true);
              onClickReset();
            }}
            isSelected={isEnteredTicket}
          >
            입장 확인 <span>{10}</span>
          </Styled.EntranceSummaryButton>
        </Styled.FilterCol>
        <Styled.FilterCol>
          <TicketTypeSelect
            value={selectedTicketType}
            onChange={(value) => setSelectedTicketType(value)}
          />
          <Styled.SearchForm onSubmit={onSubmit}>
            <Styled.SearchInput
              placeholder="검색"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Styled.SearchButton>
              <SearchIcon />
            </Styled.SearchButton>
          </Styled.SearchForm>
        </Styled.FilterCol>
      </Styled.Filter>
      <EntranceTable />
      {/* {totalPages > 0 && (
         <Pagination
          style={{ marginTop: 'auto' }}
          current={currentPage}
          total={totalElements}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      )} */}
    </PageLayout>
  );
};

export default EntrancePage;

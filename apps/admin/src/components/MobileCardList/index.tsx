import { Badge } from '@boolti/ui';
import { format } from 'date-fns/format';

import { boldText } from '~/utils/boldText';
import { formatPhoneNumber } from '~/utils/format';

import Styled from './MobileCardList.style';

type Item = {
  id: number;
  badgeText: string;
  name: string;
  phoneNumber: string;
  ticketName: string;
  date?: string;
  count: number;
};

interface Props {
  items: Item[];
  searchText: string;
  emptyText: string;
  onClickReset: VoidFunction;
}

function MobileCardList({ searchText, items, emptyText, onClickReset }: Props) {
  const isEmpty = items.length === 0;
  const isSearchResult = searchText !== '';
  const Elements = items.map((item) => {
    return (
      <Styled.CardItem key={item.id}>
        <Styled.Row>
          <Badge colorTheme="grey">{item.badgeText}</Badge>
          {item.date && <Styled.DateText>{format(item.date, 'yyyy/MM/dd HH:mm')}</Styled.DateText>}
        </Styled.Row>
        <Styled.Row>
          <Styled.UserInfoText
            dangerouslySetInnerHTML={{
              __html: boldText(`${item.name} (${formatPhoneNumber(item.phoneNumber)})`, searchText),
            }}
          ></Styled.UserInfoText>
          <Styled.TicketInfoText>
            {item.ticketName} · {item.count}매
          </Styled.TicketInfoText>
        </Styled.Row>
      </Styled.CardItem>
    );
  });
  return (
    <Styled.Container isEmpty={isEmpty}>
      {isEmpty ? (
        isSearchResult ? (
          <>
            {`검색 결과가 없어요.\n방문자 이름 또는 연락처를 변경해보세요.`}
            <Styled.ResetButton onClick={onClickReset}>검색 초기화</Styled.ResetButton>
          </>
        ) : (
          emptyText
        )
      ) : (
        Elements
      )}
    </Styled.Container>
  );
}

export default MobileCardList;

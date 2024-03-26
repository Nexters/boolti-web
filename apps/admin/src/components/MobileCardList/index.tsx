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
}

function MobileCardList({ searchText, items, emptyText }: Props) {
  const isEmpty = items.length === 0;
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
  return <Styled.Container isEmpty={isEmpty}>{isEmpty ? emptyText : Elements}</Styled.Container>;
}

export default MobileCardList;

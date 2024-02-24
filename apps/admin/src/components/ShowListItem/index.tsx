import { ChevronRightIcon } from '@boolti/icon';
import { Badge } from '@boolti/ui';
import { differenceInDays, format, isAfter, isBefore, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { generatePath, useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';

import Styled from './ShowListItem.styles';

interface Props {
  isEmpty?: boolean;
  id: number;
  title: string;
  date: string;
  hostName: string;
  thumbnailPath: string;
  salesStartTime: string;
  salesEndTime: string;
}

function getBadgeProps(
  date: string,
  salesStartTime: string,
  salesEndTime: string,
): React.ComponentProps<typeof Badge> {
  const today = new Date();
  if (isToday(date)) {
    return {
      children: '공연 당일',
      colorTheme: 'red',
    };
  }
  if (isBefore(date, today)) {
    return {
      children: '공연 종료',
      colorTheme: 'grey',
    };
  }
  if (isBefore(today, salesStartTime)) {
    return {
      children: `티켓 판매 오픈 D-${differenceInDays(salesStartTime, today) + 1}`,
      colorTheme: 'purple',
    };
  }
  if (isAfter(today, salesStartTime) && isBefore(today, salesEndTime)) {
    return {
      children: '티켓 판매 중',
      colorTheme: 'blue',
    };
  }
  return {
    children: '티켓 판매 종료',
    colorTheme: 'green',
  };
}

const ShowListItem = ({
  isEmpty,
  thumbnailPath,
  id,
  title,
  date,
  hostName,
  salesStartTime,
  salesEndTime,
}: Props) => {
  const navigate = useNavigate();
  return (
    <Styled.Container as={isEmpty ? 'div' : 'li'}>
      {isEmpty ? (
        <Styled.EmptyText>아직 등록한 공연이 없어요.</Styled.EmptyText>
      ) : (
        <Styled.Button
          onClick={() => {
            navigate(generatePath(PATH.SHOW_INFO, { showId: id }));
          }}
        >
          <Styled.Poster thumbnailPath={thumbnailPath} />
          <Styled.TextContainer>
            <Styled.TitleContainer>
              <Styled.Title>{title}</Styled.Title>
              <Badge {...getBadgeProps(date, salesStartTime, salesEndTime)} />
            </Styled.TitleContainer>

            <Styled.InfoColumn>
              <Styled.InfoText isLabel>호스트</Styled.InfoText>
              <Styled.InfoText>{hostName}</Styled.InfoText>
            </Styled.InfoColumn>
            <Styled.InfoColumn>
              <Styled.InfoText isLabel>공연일시</Styled.InfoText>
              <Styled.InfoText>{format(date, 'yyyy.MM.dd (E)', { locale: ko })}</Styled.InfoText>
            </Styled.InfoColumn>
            <Styled.InfoColumn>
              <Styled.InfoText isLabel>판매 기간</Styled.InfoText>
              <Styled.InfoText>
                {format(salesStartTime, 'yyyy.MM.dd (E)', { locale: ko })} ~{' '}
                {format(salesEndTime, 'yyyy.MM.dd (E)', { locale: ko })}
              </Styled.InfoText>
            </Styled.InfoColumn>
          </Styled.TextContainer>
          <Styled.IconContainer>
            <ChevronRightIcon />
          </Styled.IconContainer>
        </Styled.Button>
      )}
    </Styled.Container>
  );
};

export default ShowListItem;

import { ChevronRightIcon } from '@boolti/icon';
import { Badge } from '@boolti/ui';
import { format } from 'date-fns/format';
import { ko } from 'date-fns/locale';

import Styled from './ShowListItem.styles';

interface Props {
  isEmpty?: boolean;
  title: string;
  date: string;
  hostName: string;
  runningTime: number;
  thumbnailPath: string;
  salesStartTime: string;
  salesEndTime: string;
}

const ShowListItem = ({
  isEmpty,
  thumbnailPath,
  title,
  date,
  hostName,
  salesStartTime,
  salesEndTime,
}: Props) => {
  return (
    <Styled.Container as={isEmpty ? 'div' : 'li'}>
      {isEmpty ? (
        <Styled.EmptyText>아직 등록한 공연이 없어요.</Styled.EmptyText>
      ) : (
        <Styled.Button>
          <Styled.Poster thumbnailPath={thumbnailPath} />
          <Styled.TextContainer>
            <Styled.TitleContainer>
              <Styled.Title>{title}</Styled.Title>
              <Badge colorTheme="red">공연 당일</Badge>
            </Styled.TitleContainer>
            <Styled.InfoContainer>
              <Styled.InfoColumn>
                <Styled.InfoText isLabel>호스트</Styled.InfoText>
                <Styled.InfoText>{hostName}</Styled.InfoText>
              </Styled.InfoColumn>
              <Styled.InfoColumn>
                <Styled.InfoText isLabel>공연일시</Styled.InfoText>
                <Styled.InfoText>{format(date, 'yyyy.MM.dd (E)', { locale: ko })}</Styled.InfoText>
              </Styled.InfoColumn>
              <Styled.InfoColumn>
                <Styled.InfoText isLabel>티켓 판매 기간</Styled.InfoText>
                <Styled.InfoText>
                  {format(salesStartTime, 'yyyy.MM.dd (E)', { locale: ko })} ~{' '}
                  {format(salesEndTime, 'yyyy.MM.dd (E)', { locale: ko })}
                </Styled.InfoText>
              </Styled.InfoColumn>
            </Styled.InfoContainer>
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

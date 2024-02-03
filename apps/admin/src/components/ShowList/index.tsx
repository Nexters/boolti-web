import { PlusIcon } from '@boolti/icon';
import { Button } from '@boolti/ui';

import ShowListItem from '../ShowListItem';
import Styled from './ShowList.styles';

interface Props {
  shows: React.ComponentProps<typeof ShowListItem>[];
}

const ShowList = ({ shows }: Props) => {
  const isEmpty = shows.length === 0;
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HeaderText>등록한 공연</Styled.HeaderText>
        <Button type="button" colorTheme="primary" size="bold" icon={<PlusIcon />}>
          공연 등록하기
        </Button>
      </Styled.Header>
      {isEmpty ? (
        <ShowListItem isEmpty thumbnailPath="" title="" date="" host="" />
      ) : (
        <Styled.List>
          {shows.map((show, index) => (
            <ShowListItem key={index} {...show} />
          ))}
        </Styled.List>
      )}
    </Styled.Container>
  );
};

export default ShowList;

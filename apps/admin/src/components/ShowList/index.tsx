import { Button } from '@boolti/ui';
import Styled from './ShowList.styles';
import { PlusIcon } from '@boolti/icon';
import ShowListItem from '../ShowListItem';

interface Props {
  shows: React.ComponentProps<typeof ShowListItem>[];
}

const ShowList = ({ shows }: Props) => {
  const isEmpty = shows.length === 0;
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HeaderText>등록한 공연</Styled.HeaderText>
        <Button type="button" colorTheme="primary" size="bold" icon={<PlusIcon size={20} />}>
          공연 등록하기
        </Button>
      </Styled.Header>
      {isEmpty ? (
        <ShowListItem isEmpty />
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

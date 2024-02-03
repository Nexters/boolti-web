import { Button } from '@boolti/ui';
import Styled from './ShowList.styles';
import { PlusIcon } from '@boolti/icon';

interface Props {
  shows: unknown[];
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
      <Styled.List>
        {isEmpty && <Styled.EmptyText>아직 등록한 공연이 없어요.</Styled.EmptyText>}
      </Styled.List>
    </Styled.Container>
  );
};

export default ShowList;

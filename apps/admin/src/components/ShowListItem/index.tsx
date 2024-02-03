import Styled from './ShowListItem.styles';

interface Props {
  isEmpty?: boolean;
}

const ShowListItem = ({ isEmpty }: Props) => {
  return (
    <Styled.Container as={isEmpty ? 'div' : 'li'}>
      {isEmpty && <Styled.EmptyText>아직 등록한 공연이 없어요.</Styled.EmptyText>}
    </Styled.Container>
  );
};

export default ShowListItem;

import Styled from './MobileCardList.style';

interface Props {
  items: unknown[];
  emptyText: string;
}

function MobileCardList({ items, emptyText }: Props) {
  const isEmpty = items.length === 0;
  return <Styled.Container isEmpty={isEmpty}>{isEmpty ? emptyText : null}</Styled.Container>;
}

export default MobileCardList;

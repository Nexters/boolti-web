import { BooltiGreyIcon } from '@boolti/icon';
import Styled from './ResponseTab.styles';

const EmptyView = () => {
  return (
    <Styled.EmptyContainer>
      <Styled.EmptyIcon>
        <BooltiGreyIcon />
      </Styled.EmptyIcon>
      <Styled.EmptyText>아직 받은 응답이 없어요.</Styled.EmptyText>
    </Styled.EmptyContainer>
  );
};

export default EmptyView;

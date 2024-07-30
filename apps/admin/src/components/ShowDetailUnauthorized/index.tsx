import { HostType } from '@boolti/api/src/types/host';
import Styled from './ShowDetailUnauthorized.styles';
import { BooltiGreyIcon } from '@boolti/icon/src/components/BooltiGreyIcon';

interface ShowDetailUnauthorizedProps {
  pageName: string;
  name: string;
  type: HostType;
}

const ShowDetailUnauthorized = ({ pageName, name, type }: ShowDetailUnauthorizedProps) => {
  const isSupporter = type === HostType.SUPPORTER;
  const hostTypeName = isSupporter ? '도우미' : '관리자';
  const descriptionText = isSupporter
    ? '주최자, 관리자만 접근 가능합니다.'
    : '주최자만 접근 가능합니다.';
  return (
    <Styled.Container>
      <BooltiGreyIcon />
      <Styled.Title>
        {pageName} 페이지에 대한{'\n'}접근 권한이 없어요
      </Styled.Title>
      <Styled.DescriptionBox>
        현재 {name} 님의 권한은 <strong>{hostTypeName}</strong> 입니다.
        {'\n'}
        {pageName}는 {descriptionText}
        {'\n'}
        {isSupporter && '이 페이지를 보시려면 주최자에게 권한을 요청해 주세요.'}
      </Styled.DescriptionBox>
    </Styled.Container>
  );
};

export default ShowDetailUnauthorized;

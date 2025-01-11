import { HostType } from '@boolti/api/src/types/host';
import Styled from './ShowDetailUnauthorized.styles';
import { BooltiGreyIcon } from '@boolti/icon/src/components/BooltiGreyIcon';

type ShowDetailPageName = '공연 정보' | '판매 정보' | '결제 관리' | '방문자 관리' | '정산 관리';

export const PAGE_PERMISSION: Record<ShowDetailPageName, HostType[]> = {
  '공연 정보': [HostType.MAIN, HostType.MANAGER],
  '판매 정보': [HostType.MAIN, HostType.MANAGER],
  '결제 관리': [HostType.MAIN, HostType.MANAGER],
  '방문자 관리': [HostType.MAIN, HostType.MANAGER, HostType.SUPPORTER],
  '정산 관리': [HostType.MAIN],
};

const HOST_TYPE_NAME: Record<HostType, string> = {
  [HostType.MAIN]: '주최자',
  [HostType.MANAGER]: '관리자',
  [HostType.SUPPORTER]: '도우미',
};

interface ShowDetailUnauthorizedProps {
  pageName: ShowDetailPageName;
  name: string;
  type: HostType;
}

const ShowDetailUnauthorized = ({ pageName, name, type }: ShowDetailUnauthorizedProps) => {
  const descriptionText = `${PAGE_PERMISSION[pageName].map((permission) => HOST_TYPE_NAME[permission]).join(', ')}만 접근 가능합니다.`;

  return (
    <Styled.Container>
      <BooltiGreyIcon />
      <Styled.Title>페이지에 접근 권한이 없어요</Styled.Title>
      <Styled.DescriptionBox>
        현재 {name} 님의 권한은 <strong>{HOST_TYPE_NAME[type]}</strong> 입니다.
        {'\n'}
        {pageName}는 {descriptionText}
        {'\n'}이 페이지를 보시려면 주최자에게 권한을 요청해 주세요.
      </Styled.DescriptionBox>
    </Styled.Container>
  );
};

export default ShowDetailUnauthorized;

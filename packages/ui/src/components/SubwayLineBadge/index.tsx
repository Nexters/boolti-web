import Styled from './SubwayLineBadge.styles';

export type SubwayLineBadgeSize = 'small' | 'medium';

interface Props {
  /** 노선 표시명 (예: "2", "신분당", "부산 1") */
  lineLabel: string;
  /** 노선 배경 색상 (#rrggbb) */
  colorHex: string;
  /** 노선 라벨 텍스트 색상 (#rrggbb) */
  textColorHex: string;
  size?: SubwayLineBadgeSize;
}

/**
 * 노선 뱃지.
 * 표시명과 색상은 모두 서버가 노선 메타데이터로 내려주는 값을 그대로 쓴다.
 */
const SubwayLineBadge = ({ lineLabel, colorHex, textColorHex, size = 'medium' }: Props) => (
  <Styled.Container
    backgroundColor={colorHex}
    textColor={textColorHex}
    size={size}
    isCircle={lineLabel.length === 1}
  >
    {lineLabel}
  </Styled.Container>
);

export default SubwayLineBadge;

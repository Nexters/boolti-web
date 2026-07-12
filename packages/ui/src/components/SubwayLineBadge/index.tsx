import Styled from './SubwayLineBadge.styles';

export type SubwayLineBadgeSize = 'small' | 'medium';

// 비숫자 노선의 뱃지 라벨 매핑 (디자인 기준). 키는 지역 접두사 제거 후의 노선명.
const LINE_LABEL_MAP: Record<string, string> = {
  신분당선: '신분당',
  분당선: '분당',
  수인분당선: '분당',
  '경의·중앙선': '경의',
  경의중앙선: '경의',
  경춘선: '경춘',
  공항철도: '공항',
  의정부경전철: '의정',
  용인경전철: '용인',
  용인에버라인: '용인',
  경강선: '경강',
  우이신설선: '우이',
  서해선: '서해',
  김포골드라인: '김포',
  신림선: '신림',
};

// 노선 이름 -> 뱃지 라벨.
// "수도권 2호선" -> "2", "인천 1호선" -> "인천 1", "신분당선" -> "신분당", "GTX-A" -> "GTX-A"
export const getSubwayLineLabel = (lineName: string) => {
  const name = lineName.replace(/^(수도권|서울)\s*/, '').trim();

  const incheonLine = name.match(/^인천\s*(\d+)호선$/);
  if (incheonLine) {
    return `인천 ${incheonLine[1]}`;
  }

  const numberLine = name.match(/^(\d+)호선$/);
  if (numberLine) {
    return numberLine[1];
  }

  if (LINE_LABEL_MAP[name]) {
    return LINE_LABEL_MAP[name];
  }

  if (/^GTX/i.test(name)) {
    return name;
  }

  // 매핑에 없으면 잘라내지 않고 '선' 접미사만 제거해 그대로 노출한다.
  return name.replace(/선$/, '');
};

// 밝은 노선 색상(분당선 등) 위에는 어두운 텍스트를 써서 가독성을 확보한다.
const isLightColor = (colorHex: string) => {
  const hex = colorHex.replace('#', '');

  if (hex.length !== 6) {
    return false;
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.64;
};

interface Props {
  /** 노선 이름 (예: "수도권 2호선", "신분당선") */
  lineName: string;
  /** 노선 색상 (#rrggbb) */
  colorHex: string;
  size?: SubwayLineBadgeSize;
}

const SubwayLineBadge = ({ lineName, colorHex, size = 'medium' }: Props) => {
  const label = getSubwayLineLabel(lineName);

  return (
    <Styled.Container
      backgroundColor={colorHex}
      textColor={isLightColor(colorHex) ? '#121215' : '#FFFFFF'}
      size={size}
      isCircle={label.length === 1}
    >
      {label}
    </Styled.Container>
  );
};

export default SubwayLineBadge;

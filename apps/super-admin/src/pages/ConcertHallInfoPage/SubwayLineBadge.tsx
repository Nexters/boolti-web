import { SuperAdminSubwayLine } from '@boolti/api/src/types/superAdminConcertHall';

// '수도권 2호선' → '2', '인천 1호선' → '인천1', '분당선' → '분당', 'GTX-A' → 'GTX-A'
const getLineBadgeLabel = (lineName: string) => {
  const name = lineName.replace(/^(수도권|서울)\s*/, '').trim();
  const numberMatch = name.match(/^(\d+)호선$/);
  if (numberMatch) {
    return numberMatch[1];
  }
  return name.replace(/호선$/, '').replace(/선$/, '').replace(/\s+/g, '');
};

const SubwayLineBadge = ({ line }: { line: SuperAdminSubwayLine }) => {
  const label = getLineBadgeLabel(line.lineName);
  const isCircle = label.length === 1;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        minWidth: 20,
        padding: isCircle ? 0 : '0 7px',
        borderRadius: 10,
        backgroundColor: line.colorHex,
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
};

export default SubwayLineBadge;

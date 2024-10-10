import { Badge } from 'antd';

interface BaseBadgeProps {
  label: string;
  color: string;
  backgroundColor: string;
  style?: React.CSSProperties;
}
const BaseBadge = ({ style, label, color, backgroundColor }: BaseBadgeProps) => {
  return (
    <Badge
      style={{
        padding: '3px 8px',
        borderRadius: '4px',
        height: '28px',
        lineHeight: '22px',
        fontSize: '14px',
        color,
        ...style,
      }}
      count={label}
      color={backgroundColor}
    />
  );
};

export default BaseBadge;

import { SuperAdminShowStatus } from '@boolti/api/src/types/adminShow';
import { useTheme } from '@emotion/react';
import { Badge } from 'antd';

const StatusBadge = ({ status }: { status: SuperAdminShowStatus | 'ALL' }) => {
  const theme = useTheme();

  const badge = () => {
    switch (status) {
      case 'SALES_BEFORE':
        return {
          label: '판매 전',
          color: theme.palette.purple.sub,
          fontColor: theme.palette.purple.main,
        };
      case 'SALES_IN_PROGRESS':
        return {
          label: '판매 중',
          color: theme.palette.blue.sub,
          fontColor: theme.palette.blue.main,
        };
      case 'SALES_END':
        return {
          label: '판매 종료',
          color: theme.palette.green.sub,
          fontColor: theme.palette.green.main,
        };
      case 'SETTLEMENT_REQUIRED':
        return {
          label: '정산 필요',
          color: theme.palette.yellow.sub,
          fontColor: theme.palette.yellow.main,
        };
      case 'SETTLEMENT_IN_PROGRESS':
        return {
          label: '정산 중',
          color: theme.palette.red.sub,
          fontColor: theme.palette.status.error1,
        };
      case 'SETTLEMENT_DONE':
        return {
          label: '정산 완료',
          color: theme.palette.grey.g20,
          fontColor: theme.palette.grey.g60,
        };
    }
  };
  return (
    <Badge
      style={{
        padding: '3px 8px',
        borderRadius: '4px',
        height: '28px',
        lineHeight: '22px',
        fontSize: '14px',
        color: badge()?.fontColor,
      }}
      count={badge()?.label}
      color={badge()?.color}
    />
  );
};

export default StatusBadge;

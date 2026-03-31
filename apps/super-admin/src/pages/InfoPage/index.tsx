import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminShowDetail, useAdminTicketSalesInfo } from '@boolti/api';
import { Button } from '@boolti/ui';
import { SettingIcon } from '@boolti/icon';
import PageLayout from '~/components/PageLayout/PageLayout';
import ShowSettingDialog from '~/components/ShowSettingDialog';

const InfoPage = () => {
  const params = useParams<{ showId: string }>();
  const showId = Number(params!.showId);

  const { data: showDetail } = useAdminShowDetail(showId);
  const { data: ticketSalesInfo } = useAdminTicketSalesInfo(showId);
  const [isSettingDialogOpen, setIsSettingDialogOpen] = useState(false);

  const hasSoldTickets =
    ticketSalesInfo?.some((ticket) => ticket.salesCount > 0) ?? false;

  return (
    <PageLayout
      breadscrumb="공연 정보 관리 / 공연 정보"
      title="공연 정보"
      description={`수정 시 웹 / 앱에 실시간으로 적용됩니다. 주최자가 직접 정보를 컨트롤 할 수 없는\n'티켓 판매 중, 공연 종료 이후'에 요청이 있는 경우에만 활용해 주세요.`}
      action={
        <Button
          colorTheme="line"
          size="small"
          icon={<SettingIcon />}
          onClick={() => setIsSettingDialogOpen(true)}
        >
          공연 설정
        </Button>
      }
    >
      {/* TODO: 공연 정보 */}
      공연 정보
      <ShowSettingDialog
        open={isSettingDialogOpen}
        showId={showId}
        showName={showDetail?.name ?? ''}
        isEnded={showDetail?.isEnded ?? false}
        isHidden={showDetail?.isHidden ?? false}
        hasSoldTickets={hasSoldTickets}
        onClose={() => setIsSettingDialogOpen(false)}
      />
    </PageLayout>
  );
};

export default InfoPage;

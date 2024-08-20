import PageLayout from '~/components/PageLayout/PageLayout';
import Styled from './InfoPage.styles';

const InfoPage = () => {
  return (
    <PageLayout
      breadscrumb="공연 정보 관리 / 공연 정보"
      title="공연 정보"
      description={`수정 시 웹 / 앱에 실시간으로 적용됩니다. 주최자가 직접 정보를 컨트롤 할 수 없는\n'티켓 판매 중, 공연 종료 이후'에 요청이 있는 경우에만 활용해 주세요.`}
    >
      {/* TODO: 공연 정보 */}
      공연 정보
    </PageLayout>
  );
};

export default InfoPage;

import PageLayout from '~/components/PageLayout/PageLayout';
import Styled from './EntrancePage.styles';

const EntrancePage = () => {
  return (
    <PageLayout
      breadscrumb="방문자 관리 / 입장 관리"
      title="결제 관리"
      description={`수정 시 웹 / 앱에 실시간으로 적용됩니다. 주최자가 직접 정보를 컨트롤 할 수 없는\n'티켓 판매 중, 공연 종료 이후'에 요청이 있는 경우에만 활용해 주세요.`}
    >
      test
    </PageLayout>
  );
};

export default EntrancePage;

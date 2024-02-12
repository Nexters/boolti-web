import ShowDetailLayout from '~/components/ShowDetailLayout';

import Styled from './ShowInfoPage.styles';

const ShowInfoPage = () => {
  return (
    <ShowDetailLayout showName="불다람쥐 파이어 쇼">
      <Styled.ShowInfoPage>
        {Array.from({ length: 100 }).map(() => (
          <p>안녕</p>
        ))}
      </Styled.ShowInfoPage>
    </ShowDetailLayout>
  );
};

export default ShowInfoPage;

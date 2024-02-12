import ShowDetailLayout from '~/components/ShowDetailLayout';

import Styled from './ShowInfoPage.styles';

const ShowInfoPage = () => {
  return (
    <ShowDetailLayout>
      <Styled.ShowInfoPage>
        {Array.from({ length: 100 }).map(() => (
          <p>안녕</p>
        ))}
      </Styled.ShowInfoPage>
    </ShowDetailLayout>
  );
};

export default ShowInfoPage;

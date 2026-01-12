import { useParams } from 'react-router-dom';
import Styled from './ProfilePastShowsPage.styles';
import Header from '~/components/Header';
import Layout from '~/components/Layout';
import { useUserPreviousShows } from '@boolti/api';
import { formatDateTimeWithWeekday } from '~/utils';
import { EXTERNAL_URL } from '~/constants/external';

export const ProfilePastShowsPage = () => {
  const { userCode } = useParams<{ userCode: string }>();
  const { data } = useUserPreviousShows(userCode as string);

  return (
    <Layout>
      <Header title="지난 공연" />
      <Styled.CountText>전체 ({data?.length || 0})</Styled.CountText>
      <Styled.Container>
        {data?.map((show) => (
          <Styled.ShowCard
            key={show.id}
            href={EXTERNAL_URL.SHOW_MANAGER_INFO(show.id)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Styled.Poster src={show.showImg} alt={show.name} />
            <Styled.ShowInfo>
              <Styled.Title>{show.name}</Styled.Title>
              <Styled.Meta>{formatDateTimeWithWeekday(show.date)}</Styled.Meta>
            </Styled.ShowInfo>
          </Styled.ShowCard>
        ))}
      </Styled.Container>
    </Layout>
  );
};

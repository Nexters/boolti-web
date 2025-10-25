import Styled from './ProfilePastShowsPage.styles';
import Header from '~/components/Header';
import Layout from '~/components/Layout';

const PAST_SHOWS = [
  {
    id: 1,
    title: '2024 TOGETHER LUCKY CLUB',
    date: '2024.03.09 (토) / 17:00',
    poster: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc',
  },
  {
    id: 2,
    title: "TUNE Project No.3 TUNE's Halloween Party",
    date: '2024.03.09 (토) / 17:00',
    poster: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
  },
  {
    id: 3,
    title: '2024 TRINITY',
    date: '2024.03.09 (토) / 17:00',
    poster: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef',
  },
  {
    id: 4,
    title: 'COLORED (BLACK)',
    date: '2024.03.09 (토) / 17:00',
    poster: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
  },
  {
    id: 5,
    title: 'COLORED (BLACK)',
    date: '2024.03.09 (토) / 17:00',
    poster: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f',
  },
];

export const ProfilePastShowsPage = () => {
  return (
    <Layout>
      <Header title="출연한 공연" />
      <Styled.Container>
        {PAST_SHOWS.map((show) => (
          <Styled.ShowCard key={show.id}>
            <Styled.Poster src={show.poster} alt={show.title} />
            <Styled.ShowInfo>
              <Styled.Title>{show.title}</Styled.Title>
              <Styled.Meta>{show.date}</Styled.Meta>
            </Styled.ShowInfo>
          </Styled.ShowCard>
        ))}
      </Styled.Container>
    </Layout>
  );
};

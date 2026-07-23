import { useConcertHallProfile } from '@boolti/api';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ComingSoon from '~/components/ComingSoon';
import Disclaimer from '~/components/Disclaimer';
import HomeTab from '~/components/HomeTab';
import Layout from '~/components/Layout';
import RentalTab from '~/components/RentalTab';
import { formatUpdatedAt } from '~/utils/format';

type TabKey = 'home' | 'rental';

interface Props {
  tab: TabKey;
}

const ConcertHallTabPage = ({ tab }: Props) => {
  const { concertHallId: idParam } = useParams<{ concertHallId: string }>();
  const concertHallId = idParam && /^\d+$/.test(idParam) ? Number(idParam) : null;

  const { data: profile } = useConcertHallProfile(concertHallId);

  useEffect(() => {
    if (profile?.name) {
      document.title = profile.share?.title ?? profile.name;
    }
  }, [profile?.name, profile?.share?.title]);

  if (!profile) {
    return <Layout fillViewport={false}>{null}</Layout>;
  }

  const hasTabData = tab === 'home' ? profile.hasHomeTabData : profile.hasRentalTabData;
  const updatedAtText = formatUpdatedAt(profile.informationUpdatedAt);

  return (
    <Layout fillViewport={false}>
      {hasTabData ? (
        tab === 'home' ? (
          <HomeTab profile={profile} />
        ) : (
          <RentalTab profile={profile} />
        )
      ) : (
        <ComingSoon />
      )}
      <Disclaimer updatedAtText={updatedAtText} />
    </Layout>
  );
};

export default ConcertHallTabPage;

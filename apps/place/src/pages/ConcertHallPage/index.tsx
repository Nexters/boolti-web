import { useConcertHallProfile } from '@boolti/api';
import { ConcertHallProfile } from '@boolti/ui';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '~/components/Layout';
import { X_NCP_APIGW_API_KEY_ID } from '~/constants/ncp';

const ConcertHallPage = () => {
  const { concertHallId: idParam } = useParams<{ concertHallId: string }>();
  const concertHallId = idParam && /^\d+$/.test(idParam) ? Number(idParam) : null;
  const { data: profile } = useConcertHallProfile(concertHallId);

  useEffect(() => {
    if (profile?.name) {
      document.title = profile.share?.title ?? profile.name;
    }
  }, [profile?.name, profile?.share?.title]);

  if (!profile) {
    return <Layout>{null}</Layout>;
  }

  return (
    <Layout>
      <ConcertHallProfile
        profile={profile}
        displayMode="full"
        shareUrl={window.location.href}
        naverMapKey={X_NCP_APIGW_API_KEY_ID}
      />
    </Layout>
  );
};

export default ConcertHallPage;

import { useConcertHallProfileByShareCode } from '@boolti/api';
import { ConcertHallProfile, trackConcertHallProfileEvent } from '@boolti/ui';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '~/components/Layout';
import { X_NCP_APIGW_API_KEY_ID } from '~/constants/ncp';
import { trackPlaceProfileView } from '~/constants/analytics';

const ConcertHallPage = () => {
  // URL은 내부 ID가 아니라 공유 코드를 쓴다. (예: /boolti)
  const { shareCode } = useParams<{ shareCode: string }>();
  const { data: profile } = useConcertHallProfileByShareCode(shareCode ?? null);

  useEffect(() => {
    if (profile?.name) {
      document.title = profile.share?.title ?? profile.name;
    }
  }, [profile?.name, profile?.share?.title]);

  const profileId = profile?.id;

  useEffect(() => {
    if (!profile) return;

    trackPlaceProfileView(profile);
    // 같은 공연장에서는 한 번만 보낸다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

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
        onAnalyticsEvent={(event) => trackConcertHallProfileEvent(event, profile.id)}
      />
    </Layout>
  );
};

export default ConcertHallPage;

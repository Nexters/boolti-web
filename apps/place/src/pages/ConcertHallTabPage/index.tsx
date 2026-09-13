import { useConcertHallProfileByShareCode } from '@boolti/api';
import { ConcertHallProfile } from '@boolti/ui';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Layout from '~/components/Layout';
import { X_NCP_APIGW_API_KEY_ID } from '~/constants/ncp';

type TabKey = 'home' | 'rental';

interface Props {
  tab: TabKey;
}

const ConcertHallTabPage = ({ tab }: Props) => {
  // URL은 내부 ID가 아니라 공유 코드를 쓴다. (예: /boolti)
  const { shareCode } = useParams<{ shareCode: string }>();
  const { data: profile } = useConcertHallProfileByShareCode(shareCode ?? null);

  useEffect(() => {
    if (profile?.name) {
      document.title = profile.share?.title ?? profile.name;
    }
  }, [profile?.name, profile?.share?.title]);

  if (!profile) {
    return <Layout fillViewport={false}>{null}</Layout>;
  }

  return (
    <Layout fillViewport={false}>
      <ConcertHallProfile
        profile={profile}
        displayMode={tab}
        shareUrl={window.location.href}
        naverMapKey={X_NCP_APIGW_API_KEY_ID}
      />
    </Layout>
  );
};

export default ConcertHallTabPage;

import { useConcertHallProfile } from '@boolti/api';
import { useToast } from '@boolti/ui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ComingSoon from '~/components/ComingSoon';
import Disclaimer from '~/components/Disclaimer';
import HallHead from '~/components/HallHead';
import HomeTab from '~/components/HomeTab';
import Layout from '~/components/Layout';
import RentalTab from '~/components/RentalTab';
import { formatUpdatedAt } from '~/utils/format';

import Styled from './ConcertHallPage.styles';

type TabKey = 'home' | 'rental';

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'home', label: '홈' },
  { key: 'rental', label: '대관 정보' },
];

const ConcertHallPage = () => {
  const toast = useToast();
  const { concertHallId: idParam } = useParams<{ concertHallId: string }>();
  const concertHallId = idParam && /^\d+$/.test(idParam) ? Number(idParam) : null;

  const { data: profile } = useConcertHallProfile(concertHallId);
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  useEffect(() => {
    if (profile?.name) {
      document.title = profile.share?.title ?? profile.name;
    }
  }, [profile?.name, profile?.share?.title]);

  if (!profile) {
    return <Layout>{null}</Layout>;
  }

  const handleShare = async () => {
    const shareData = {
      title: profile.share?.title ?? profile.name,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // 사용자가 공유를 취소한 경우
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      toast.success('링크를 복사했어요.');
    } catch {
      toast.error('링크 복사에 실패했어요.');
    }
  };

  const updatedAtText = formatUpdatedAt(profile.informationUpdatedAt);

  return (
    <Layout>
      <HallHead profile={profile} onShare={handleShare} />
      <Styled.TabBar>
        {TABS.map((tab) => (
          <Styled.TabItem
            key={tab.key}
            type="button"
            isActive={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Styled.TabItem>
        ))}
      </Styled.TabBar>
      {activeTab === 'home' &&
        (profile.hasHomeTabData ? <HomeTab profile={profile} /> : <ComingSoon />)}
      {activeTab === 'rental' &&
        (profile.hasRentalTabData ? <RentalTab profile={profile} /> : <ComingSoon />)}
      <Disclaimer updatedAtText={updatedAtText} />
    </Layout>
  );
};

export default ConcertHallPage;

import { useConcertHallProfile } from '@boolti/api';
import { useToast } from '@boolti/ui';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ComingSoon from '~/components/ComingSoon';
import HallHead from '~/components/HallHead';
import HomeTab from '~/components/HomeTab';
import Layout from '~/components/Layout';
import { formatUpdatedAt } from '~/utils/format';

import Styled from './ConcertHallPage.styles';

type TabKey = 'home' | 'rental';

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'home', label: '홈' },
  { key: 'rental', label: '대관 정보' },
];

const ConcertHallPage = () => {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get('concertHallId') ?? searchParams.get('id');
  const concertHallId = idParam && /^\d+$/.test(idParam) ? Number(idParam) : null;

  console.log('concertHallId', concertHallId);
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
      {activeTab === 'rental' && <ComingSoon />}
      <Styled.Bottom>
        <Styled.BottomText>
          이 페이지의 정보는 불티에서 수집한 것으로, 실제 시설 및 장비와 다를 수 있습니다. 정확한
          정보는 대관 시 공연장에 직접 확인해 주세요.
          {updatedAtText && (
            <>
              <br />
              *정보 업데이트: {updatedAtText}
            </>
          )}
        </Styled.BottomText>
      </Styled.Bottom>
    </Layout>
  );
};

export default ConcertHallPage;

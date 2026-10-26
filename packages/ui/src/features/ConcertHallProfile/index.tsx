import type { ConcertHallProfileResponse } from '@boolti/api';
import { useState } from 'react';

import useToast from '../../hooks/useToast';
import ComingSoon from './components/ComingSoon';
import Disclaimer from './components/Disclaimer';
import HallHead from './components/HallHead';
import HomeTab from './components/HomeTab';
import RentalTab from './components/RentalTab';
import Styled from './ConcertHallProfile.styles';
import { formatUpdatedAt } from './utils/format';
import {
  type ConcertHallProfileAnalyticsHandler,
  ConcertHallProfileAnalyticsProvider,
} from './analytics';

export type ConcertHallProfileDisplayMode = 'full' | 'home' | 'rental';

export interface ConcertHallProfileProps {
  profile: ConcertHallProfileResponse;
  displayMode: ConcertHallProfileDisplayMode;
  shareUrl: string;
  naverMapKey: string;
  isScrolled?: boolean;
  onBack?: () => void;
  /** 분석 이벤트를 받는다. 넘기지 않으면 아무것도 보내지 않는다. */
  onAnalyticsEvent?: ConcertHallProfileAnalyticsHandler;
}

type TabKey = Exclude<ConcertHallProfileDisplayMode, 'full'>;

const TABS: Array<{ key: TabKey; label: string; analyticsValue: 'Home' | 'RentalInfo' }> = [
  { key: 'home', label: '홈', analyticsValue: 'Home' },
  { key: 'rental', label: '대관 정보', analyticsValue: 'RentalInfo' },
];

const ConcertHallProfile = ({
  profile,
  displayMode,
  shareUrl,
  naverMapKey,
  onBack,
  isScrolled,
  onAnalyticsEvent,
}: ConcertHallProfileProps) => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const updatedAtText = formatUpdatedAt(profile.informationUpdatedAt);

  const handleShare = async () => {
    if (!shareUrl) {
      return;
    }

    onAnalyticsEvent?.({ type: 'share' });

    const shareData = {
      title: profile.share?.title ?? profile.name,
      url: shareUrl,
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

  const renderTab = (tab: TabKey) => {
    const hasTabData =
      tab === 'home'
        ? profile.hasHomeTabData
        : profile.hasRentalTabData !== false && Boolean(profile.rental);

    if (!hasTabData) {
      return <ComingSoon />;
    }

    return tab === 'home' ? (
      <HomeTab profile={profile} naverMapKey={naverMapKey} />
    ) : (
      <RentalTab profile={profile} />
    );
  };

  if (displayMode !== 'full') {
    return (
      <ConcertHallProfileAnalyticsProvider value={onAnalyticsEvent ?? null}>
        {renderTab(displayMode)}
        <Disclaimer updatedAtText={updatedAtText} />
      </ConcertHallProfileAnalyticsProvider>
    );
  }

  return (
    <ConcertHallProfileAnalyticsProvider value={onAnalyticsEvent ?? null}>
      <HallHead
        profile={profile}
        onShare={handleShare}
        onBack={onBack}
        isScrolled={isScrolled}
        shareDisabled={!shareUrl}
      />
      <Styled.TabBar role="tablist" aria-label="공연장 상세 탭">
        {TABS.map((tab) => (
          <Styled.TabItem
            key={tab.key}
            type="button"
            isActive={activeTab === tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => {
              onAnalyticsEvent?.({ type: 'tab', tab: tab.analyticsValue });
              setActiveTab(tab.key);
            }}
          >
            {tab.label}
          </Styled.TabItem>
        ))}
      </Styled.TabBar>
      {renderTab(activeTab)}
      <Disclaimer updatedAtText={updatedAtText} />
    </ConcertHallProfileAnalyticsProvider>
  );
};

export { useBodyScrollLock } from './useBodyScrollLock';
export { trackConcertHallProfileEvent } from './analytics';
export type {
  ConcertHallProfileAnalyticsEvent,
  ConcertHallProfileAnalyticsHandler,
  ConcertHallProfileSection,
} from './analytics';
export default ConcertHallProfile;

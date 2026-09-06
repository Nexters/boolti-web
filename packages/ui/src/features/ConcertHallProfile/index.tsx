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

export type ConcertHallProfileDisplayMode = 'full' | 'home' | 'rental';

export interface ConcertHallProfileProps {
  profile: ConcertHallProfileResponse;
  displayMode: ConcertHallProfileDisplayMode;
  shareUrl: string;
  naverMapKey: string;
  onBack?: () => void;
}

type TabKey = Exclude<ConcertHallProfileDisplayMode, 'full'>;

const TABS: Array<{ key: TabKey; label: string }> = [
  { key: 'home', label: '홈' },
  { key: 'rental', label: '대관 정보' },
];

const ConcertHallProfile = ({
  profile,
  displayMode,
  shareUrl,
  naverMapKey,
  onBack,
}: ConcertHallProfileProps) => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const updatedAtText = formatUpdatedAt(profile.informationUpdatedAt);

  const handleShare = async () => {
    if (!shareUrl) {
      return;
    }

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
      <>
        {renderTab(displayMode)}
        <Disclaimer updatedAtText={updatedAtText} />
      </>
    );
  }

  return (
    <>
      <HallHead profile={profile} onShare={handleShare} onBack={onBack} shareDisabled={!shareUrl} />
      <Styled.TabBar role="tablist" aria-label="공연장 상세 탭">
        {TABS.map((tab) => (
          <Styled.TabItem
            key={tab.key}
            type="button"
            isActive={activeTab === tab.key}
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Styled.TabItem>
        ))}
      </Styled.TabBar>
      {renderTab(activeTab)}
      <Disclaimer updatedAtText={updatedAtText} />
    </>
  );
};

export { useBodyScrollLock } from './useBodyScrollLock';
export default ConcertHallProfile;

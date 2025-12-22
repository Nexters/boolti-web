import { AnimatePresence } from 'framer-motion';
import { useShareBannerVisibility } from '~/hooks/useShareBannerVisibility';
import { CloseButton, Container, ShareButton, Text } from './ShareBanner.styles';
import { CloseIcon } from '@boolti/icon';

interface ShareBannerProps {
  text: string;
}

export const ShareBanner = ({ text }: ShareBannerProps) => {
  const { isVisible, dismissForToday } = useShareBannerVisibility();

  const handleShare = async () => {
    const shareData = {
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Container
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <CloseButton onClick={dismissForToday}>
            <CloseIcon size={24} />
          </CloseButton>
          <Text>{text}</Text>
          <ShareButton type="button" colorTheme="primary" size="small" onClick={handleShare}>
            링크 공유
          </ShareButton>
        </Container>
      )}
    </AnimatePresence>
  );
};

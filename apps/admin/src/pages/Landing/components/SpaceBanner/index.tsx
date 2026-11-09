import { LANDING_COPY } from '../../constants';
import { useFindSpace } from '../../hooks/useFindSpace';
import Styled from './SpaceBanner.styles';

const ArrowIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface SpaceBannerProps {
  variant: 'top' | 'bottom';
}

const SpaceBanner = ({ variant }: SpaceBannerProps) => {
  const { handleFindSpace } = useFindSpace();
  const { pill, cta } = LANDING_COPY.spaceBanner;
  const { prefix, suffix } = LANDING_COPY.spaceBanner[variant];

  return (
    <Styled.Banner type="button" onClick={handleFindSpace}>
      <Styled.Inner>
        <Styled.LeadGroup>
          {prefix ? <span>{prefix}</span> : null}
          <Styled.Pill variant={variant}>{'\u266A'} {pill}</Styled.Pill>
          <span>{suffix}</span>
        </Styled.LeadGroup>
        <Styled.CtaGroup>
          {cta}
          <Styled.Arrow>
            <ArrowIcon />
          </Styled.Arrow>
        </Styled.CtaGroup>
      </Styled.Inner>
    </Styled.Banner>
  );
};

export default SpaceBanner;

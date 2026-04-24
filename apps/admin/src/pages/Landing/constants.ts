export const mq_desktop = '@media (min-width: 1120px)';

export const LANDING_COLORS = {
  heroGradient: 'linear-gradient(180deg, #131343 0%, #020206 100%)',
  heroBottom: '#020206',
  solutionLightBg: '#ECEFF3',
  chipBg: 'rgba(255, 207, 186, 0.5)',
  chipText: '#FF6827',
  primaryCta: '#FF6827',
  darkButton: '#282B33',
  darkButtonText: '#A2A5B4',
  darkCardBg: '#A2A5B4',
  headerGlass: 'rgba(111, 116, 133, 0.4)',
  headerBorder: 'rgba(136, 141, 157, 0.3)',
  cardBorder: '#D8DBE5',
  promoGradient: 'linear-gradient(180deg, #FFE6DF 0%, #F3F5F9 100%)',
  paymentGradient: 'linear-gradient(180deg, #E9EBFE 0%, #F3F5F9 100%)',
} as const;

export const LANDING_COPY = {
  hero: {
    eyebrow: '공연 등록 · 판매 · 입장 관리까지',
    titleLead: '소규모 공연을 위한',
    titleTrail: '올인원 플랫폼,',
  },
  problem: {
    title: '공연 준비,\n아직도 수작업으로 하시나요?',
    titleMobile: '공연 준비,\n아직도 수작업으로\n하시나요?',
  },
  solutionFeatures: {
    eyebrow: '공연 등록부터 정산까지',
    titleLead: '번거로운 일은',
    titleTrail: '불티에서 한 번에 해결!',
    items: [
      {
        chip: '티켓 판매',
        title: '입금/환불 걱정 끝',
        description: '입금 확인부터 환불 처리까지,\n번거로웠던 모든 과정을 자동으로 처리',
      },
      {
        chip: '관람안내',
        title: '놓칠 걱정 없는 자동 알림 시스템',
        description: '일일이 문자를 보내지 않아도\n자동 알림으로 관객이 공연을 놓치지 않게',
      },
      {
        chip: '입장 관리',
        title: '입장은 QR로 빠르게',
        description: '번거로운 발권이나 확인 절차 없이\nQR 스캔만으로 대기 없는 입장 가능',
      },
      {
        chip: '실시간 현황',
        title: '실시간 현황을 한눈에',
        description: '티켓 판매 현황, 실제 입장 관객 수 등\n주요 정보를 모니터링하고 빠르게 대응',
      },
    ],
  },
  solutionHighlight: {
    title: '링크 하나로 가볍게\n다양한 결제 수단으로 편리하게',
    items: [
      {
        chip: '공연 홍보',
        title: '링크 하나로\n홍보 끝!',
        description: '일일이 정보를 첨부할 필요 없이, 링크만 공유하면 공연 홍보 완료',
        variant: 'light' as const,
      },
      {
        chip: '결제/발권',
        title: '다양한 결제 수단 지원',
        description: '번거로운 입금 대조 과정 없이 실시간으로 티켓 발권 가능',
        variant: 'dark' as const,
      },
    ],
  },
  howToUse: {
    title: '불티와 함께 온전히,\n공연과 무대에 집중해 보세요',
    primaryCta: '3분만에 끝나는 공연 등록 →',
    secondaryCta: '앱 둘러보기',
  },
} as const;

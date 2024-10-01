import { lazy } from 'react';

export const LandingPage = lazy(() => import('./Landing'));

export const LoginPage = lazy(() => import('./Login'));

export const QRPage = lazy(() => import('./QRPage'));

export const OAuthKakaoPage = lazy(() => import('./OAuth/OAuthKakaoPage'));

export const OAuthApplePage = lazy(() => import('./OAuth/OAuthApplePage'));

export const HomePage = lazy(() => import('./HomePage'));

export const ShowAddCompletePage = lazy(() => import('./ShowAddCompletePage'));

export const ShowEnterancePage = lazy(() => import('./ShowEnterancePage'));

export const ShowInfoPage = lazy(() => import('./ShowInfoPage'));

export const ShowReservationPage = lazy(() => import('./ShowReservationPage'));

export const ShowSettlementPage = lazy(() => import('./ShowSettlementPage'));

export const ShowTicketPage = lazy(() => import('./ShowTicketPage'));

export const SignUpCompletePage = lazy(() => import('./SignUpComplete'));

export const SitePolicyPage = lazy(() => import('./SitePolicyPage'));

export const GiftRegisterPage = lazy(() => import('./GiftRegisterPage'));

export const GiftIntroPage = lazy(() => import('./GiftIntroPage'));

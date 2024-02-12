import { useLogout } from '@boolti/api';
import { ArrowLeftIcon } from '@boolti/icon';
import { TextButton } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import { useMatch, useNavigate, useParams } from 'react-router-dom';

import { HREF, PATH } from '~/constants/routes';

import Header from '../Header/index.tsx';
import Layout from '../Layout/index.tsx';
import Styled from './ShowDetailLayout.styles.ts';

interface ShowDetailLayoutProps {
  showName: string;
  children?: React.ReactNode;
}

const ShowDetailLayout = ({ showName, children }: ShowDetailLayoutProps) => {
  const { ref: topObserverRef, inView: topInView } = useInView({
    threshold: 1,
  });
  const { ref: headerObserverRef, inView: headerInView } = useInView({
    threshold: 0.01,
  });
  const theme = useTheme();

  const navigate = useNavigate();
  const params = useParams<{ showId: string }>();
  const matchInfoTab = useMatch(PATH.SHOW_INFO);
  const matchTicketTab = useMatch(PATH.SHOW_TICKET);
  const matchReservationTab = useMatch(PATH.SHOW_RESERVATION);
  const matchEntryTab = useMatch(PATH.SHOW_ENTRY);

  const logoutMutation = useLogout();

  return (
    <>
      <Styled.TopObserver ref={topObserverRef} />
      <Layout
        header={
          <>
            <Header
              left={
                <Styled.HeaderLeft>
                  <Styled.BackButton
                    type="button"
                    onClick={() => {
                      navigate(PATH.HOME);
                    }}
                  >
                    <ArrowLeftIcon />
                  </Styled.BackButton>
                  <Styled.HeaderText>주최자 홈</Styled.HeaderText>
                </Styled.HeaderLeft>
              }
              right={
                <TextButton
                  onClick={async () => {
                    await logoutMutation.mutateAsync();

                    navigate(PATH.LOGIN);
                  }}
                >
                  로그아웃
                </TextButton>
              }
            />
            <Styled.HeaderContent>
              <Styled.ShowName size={headerInView ? 'big' : 'small'}>{showName}</Styled.ShowName>
              <Styled.Tab>
                <Styled.TabItem
                  active={matchInfoTab !== null}
                  onClick={() => {
                    if (!params.showId) return;

                    navigate(HREF.SHOW_INFO(params.showId));
                  }}
                >
                  공연 기본 정보
                </Styled.TabItem>
                <Styled.TabItem
                  active={matchTicketTab !== null}
                  onClick={() => {
                    if (!params.showId) return;

                    navigate(HREF.SHOW_TICKET(params.showId));
                  }}
                >
                  티켓 관리
                </Styled.TabItem>
                <Styled.TabItem
                  active={matchReservationTab !== null}
                  onClick={() => {
                    if (!params.showId) return;

                    navigate(HREF.SHOW_RESERVATION(params.showId));
                  }}
                >
                  예매자 관리
                </Styled.TabItem>
                <Styled.TabItem
                  active={matchEntryTab !== null}
                  onClick={() => {
                    if (!params.showId) return;

                    navigate(HREF.SHOW_ENTRY(params.showId));
                  }}
                >
                  입장 관리
                </Styled.TabItem>
              </Styled.Tab>
            </Styled.HeaderContent>
          </>
        }
        headerContainerStyle={{
          position: 'sticky',
          top: '-68px',
          zIndex: '100',
          boxShadow: topInView ? 'none' : `0 8px 14px 0 ${theme.palette.shadow}`,
          transition: 'box-shadow 0.1s ease-in-out',
        }}
      >
        <Styled.HeaderObserver ref={headerObserverRef} />
        {children}
      </Layout>
    </>
  );
};

export default ShowDetailLayout;

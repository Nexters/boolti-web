import { LOCAL_STORAGE, useLogout } from '@boolti/api';
import { ArrowLeftIcon } from '@boolti/icon';
import { TextButton } from '@boolti/ui';
import { useMatch, useNavigate, useParams } from 'react-router-dom';

import { HREF, PATH } from '~/constants/routes';

import Header from '../Header/index.tsx';
import Layout from '../Layout/index.tsx';
import Styled from './ShowDetailLayout.styles.ts';

interface ShowDetailLayoutProps {
  children?: React.ReactNode;
}

const ShowDetailLayout = ({ children }: ShowDetailLayoutProps) => {
  const navigate = useNavigate();
  const params = useParams<{ showId: string }>();
  const matchInfoTab = useMatch(PATH.SHOW_INFO);
  const matchTicketTab = useMatch(PATH.SHOW_TICKET);
  const matchReservationTab = useMatch(PATH.SHOW_RESERVATION);
  const matchEntryTab = useMatch(PATH.SHOW_ENTRY);

  const logoutMutation = useLogout();

  return (
    <Layout
      header={
        <>
          <Header
            left={
              <Styled.HeaderLeft>
                <Styled.BackButton
                  type="button"
                  onClick={() => {
                    navigate(-1);
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
                  window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
                  window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
                  await logoutMutation.mutateAsync();

                  navigate(PATH.LOGIN);
                }}
              >
                로그아웃
              </TextButton>
            }
          />
          <Styled.HeaderContent>
            <Styled.ShowName>%공연명%</Styled.ShowName>
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
      }}
    >
      {children}
    </Layout>
  );
};

export default ShowDetailLayout;

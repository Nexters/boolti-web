import {
  useLogout,
  useMyHostInfo,
  useShowLastSettlementEvent,
  useShowSettlementInfo,
} from '@boolti/api';
import { ArrowLeftIcon } from '@boolti/icon';
import { Setting } from '@boolti/icon/src/components/Setting.tsx';
import { TextButton, useDialog } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { HREF, PATH } from '~/constants/routes';

import Header from '../Header/index.tsx';
import Layout from '../Layout/index.tsx';
import Styled from './ShowDetailLayout.styles.ts';
import { useAuthAtom } from '~/atoms/useAuthAtom.ts';
import AuthoritySettingDialogContent from '../AuthoritySettingDialogContent';
import { HostListItem, HostType } from '@boolti/api/src/types/host.ts';
import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const settlementTooltipText = {
  SEND: '내역서 확인 및 정산 요청을 진행해 주세요',
  REQUEST: '정산 진행 중이에요',
  DONE: '정산이 완료되었어요',
  DEFAULT: '정산 정보를 입력해 주세요',
};

interface ShowDetailLayoutProps {
  showName: string;
  children?: React.ReactNode;
  onClickMiddleware?: () => Promise<boolean>;
}

export const myHostInfoAtom = atom<HostListItem | null>(null);

const ShowDetailLayout = ({ showName, children, onClickMiddleware }: ShowDetailLayoutProps) => {
  const { ref: topObserverRef, inView: topInView } = useInView({
    threshold: 1,
    initialInView: true,
  });
  const { ref: headerObserverRef, inView: headerInView } = useInView({
    threshold: 0.01,
    initialInView: true,
  });
  const theme = useTheme();
  const { removeToken } = useAuthAtom();
  const navigate = useNavigate();
  const params = useParams<{ showId: string }>();
  const matchInfoTab = useMatch(PATH.SHOW_INFO);
  const matchTicketTab = useMatch(PATH.SHOW_TICKET);
  const matchReservationTab = useMatch(PATH.SHOW_RESERVATION);
  const matchEntryTab = useMatch(PATH.SHOW_ENTRANCE);
  const matchSettlementTab = useMatch(PATH.SHOW_SETTLEMENT);
  const authoritySettingDialog = useDialog();
  const showId = Number(params!.showId);
  const [, setMyHostInfo] = useAtom(myHostInfoAtom);

  const { data: myHostInfoData } = useMyHostInfo(showId);
  const { data: lastSettlementEvent } = useShowLastSettlementEvent(showId);
  const { data: settlementInfo } = useShowSettlementInfo(showId);
  const logoutMutation = useLogout({
    onSuccess: () => {
      removeToken();
    },
  });

  const tooltipStyle = {
    color: theme.palette.grey.w,
    padding: '6px 8px',
    backgroundColor: theme.palette.grey.g90,
    borderRadius: '4px',
    boxShadow: `0px 4px 10px 0px ${theme.palette.shadow}`,
    fontWeight: '400',
    fontStyle: 'normal',
    lineHeight: '18px',
    fontDisplay: 'auto',
    fontSize: '12px',
  };

  const isSettlementInfoEmpty =
    settlementInfo?.bankAccount === null ||
    settlementInfo?.idCardPhotoFile === null ||
    settlementInfo?.settlementBankAccountPhotoFile === null;

  const isTooltipVisible = (() => {
    if (
      lastSettlementEvent?.settlementEventType === 'REQUEST' ||
      lastSettlementEvent?.settlementEventType === 'DONE' ||
      lastSettlementEvent?.settlementEventType === 'SEND'
    ) {
      return true;
    }

    if (lastSettlementEvent?.settlementEventType === null && isSettlementInfoEmpty) {
      return true;
    }

    return false;
  })();

  useEffect(() => {
    if (myHostInfoData) {
      setMyHostInfo({ ...myHostInfoData });
    }
  }, [myHostInfoData, setMyHostInfo]);

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
                    onClick={async () => {
                      if (onClickMiddleware && !(await onClickMiddleware())) {
                        return;
                      }

                      navigate(PATH.HOME);
                    }}
                  >
                    <ArrowLeftIcon />
                    <Styled.HeaderText>홈</Styled.HeaderText>
                  </Styled.BackButton>
                </Styled.HeaderLeft>
              }
              right={
                <TextButton
                  size="regular"
                  colorTheme="netural"
                  onClick={async () => {
                    if (onClickMiddleware && !(await onClickMiddleware())) {
                      return;
                    }

                    await logoutMutation.mutateAsync();
                    navigate(PATH.LOGIN);
                  }}
                >
                  로그아웃
                </TextButton>
              }
            />
            <Styled.HeaderContent>
              <Styled.ShowNameWrapper>
                <Styled.ShowName size={headerInView ? 'big' : 'small'}>{showName}</Styled.ShowName>
                {myHostInfoData?.type !== HostType.SUPPORTER && (
                  <Styled.AuthorSettingButton
                    type="button"
                    colorTheme="netural"
                    size="small"
                    onClick={() => {
                      authoritySettingDialog.open({
                        title: '권한 설정',
                        width: '600px',
                        content: <AuthoritySettingDialogContent showId={showId} />,
                      });
                    }}
                  >
                    <Setting />
                    <span style={{ paddingLeft: '8px' }}>권한 설정</span>
                  </Styled.AuthorSettingButton>
                )}
              </Styled.ShowNameWrapper>
              <Styled.TabContainer>
                <Styled.Tab>
                  <Styled.TabItem
                    active={matchInfoTab !== null}
                    onClick={async () => {
                      if (!params.showId) return;

                      if (onClickMiddleware && !(await onClickMiddleware())) {
                        return;
                      }

                      navigate(HREF.SHOW_INFO(params.showId));
                    }}
                  >
                    공연 기본 정보
                  </Styled.TabItem>
                  <Styled.TabItem
                    active={matchTicketTab !== null}
                    onClick={async () => {
                      if (!params.showId) return;

                      if (onClickMiddleware && !(await onClickMiddleware())) {
                        return;
                      }

                      navigate(HREF.SHOW_TICKET(params.showId));
                    }}
                  >
                    티켓 관리
                  </Styled.TabItem>
                  <Styled.TabItem
                    active={matchReservationTab !== null}
                    onClick={async () => {
                      if (!params.showId) return;

                      if (onClickMiddleware && !(await onClickMiddleware())) {
                        return;
                      }

                      navigate(HREF.SHOW_RESERVATION(params.showId));
                    }}
                  >
                    방문자 관리
                  </Styled.TabItem>
                  <Styled.TabItem
                    active={matchEntryTab !== null}
                    onClick={async () => {
                      if (!params.showId) return;

                      if (onClickMiddleware && !(await onClickMiddleware())) {
                        return;
                      }

                      navigate(HREF.SHOW_ENTRANCE(params.showId));
                    }}
                  >
                    입장 관리
                  </Styled.TabItem>
                  <Styled.TabItem
                    active={matchSettlementTab !== null}
                    onClick={async () => {
                      if (!params.showId) return;

                      if (onClickMiddleware && !(await onClickMiddleware())) {
                        return;
                      }

                      navigate(HREF.SHOW_SETTLEMENT(params.showId));
                    }}
                    id="settlement-page-tooltip"
                  >
                    정산 관리
                    {isTooltipVisible && (
                      <Tooltip
                        content={
                          settlementTooltipText[
                            lastSettlementEvent?.settlementEventType ?? 'DEFAULT'
                          ]
                        }
                        anchorSelect="#settlement-page-tooltip"
                        isOpen
                        style={tooltipStyle}
                        className="tooltip"
                        place="top"
                        positionStrategy="fixed"
                        offset={0}
                        opacity={0.85}
                      />
                    )}
                  </Styled.TabItem>
                </Styled.Tab>
              </Styled.TabContainer>
            </Styled.HeaderContent>
          </>
        }
        headerContainerStyle={{
          position: 'sticky',
          top: '-64px',
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

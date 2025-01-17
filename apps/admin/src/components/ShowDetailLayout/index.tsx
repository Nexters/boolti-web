import {
  useMyHostInfo,
  useShowDetail,
  useShowLastSettlementEvent,
  useShowSettlementInfo,
} from '@boolti/api';
import { ArrowLeftIcon } from '@boolti/icon';
import { Setting } from '@boolti/icon/src/components/Setting.tsx';
import { Button, palette, useStepDialog } from '@boolti/ui';
import { useTheme } from '@emotion/react';
import { useInView } from 'react-intersection-observer';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

import { HREF, PATH } from '~/constants/routes';

import Header from '../Header/index.tsx';
import Layout from '../Layout/index.tsx';
import Styled from './ShowDetailLayout.styles.ts';
import ShowSettingDialogContent from '../ShowSettingDialogContent/index.tsx';
import { HostListItem, HostType } from '@boolti/api/src/types/host.ts';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import ProfileDropdown from '../ProfileDropdown/index.tsx';
import HostList from '../ShowSettingDialogContent/components/HostList/index.tsx';
import { useDeviceWidth } from '~/hooks/useDeviceWidth.ts';
import ShowDeleteDialogContent from '../ShowDeleteDialogContent/index.tsx';

const settlementTooltipText = {
  SEND: '내역서 확인 및 정산 요청을 진행해 주세요',
  REQUEST: '정산 진행 중이에요',
  DONE: '정산이 완료되었어요',
  DEFAULT: '정산 정보를 입력해 주세요',
};

interface ShowDetailLayoutProps {
  children?: React.ReactNode;
}

export const myHostInfoAtom = atom<HostListItem | null>(null);

export const middlewareAtom = atom<(() => Promise<boolean>) | undefined>(undefined);

interface TabItemProps {
  type: 'INFO' | 'TICKET' | 'RESERVATION' | 'ENTRANCE' | 'SETTLEMENT';
}

const matchTargets: Record<TabItemProps['type'], string> = {
  INFO: PATH.SHOW_INFO,
  TICKET: PATH.SHOW_TICKET,
  RESERVATION: PATH.SHOW_RESERVATION,
  ENTRANCE: PATH.SHOW_ENTRANCE,
  SETTLEMENT: PATH.SHOW_SETTLEMENT,
};

const toTargets = {
  INFO: HREF.SHOW_INFO,
  TICKET: HREF.SHOW_TICKET,
  RESERVATION: HREF.SHOW_RESERVATION,
  ENTRANCE: HREF.SHOW_ENTRANCE,
  SETTLEMENT: HREF.SHOW_SETTLEMENT,
} as const;

const label = {
  INFO: '공연 정보',
  TICKET: '판매 정보',
  RESERVATION: '결제 관리',
  ENTRANCE: '방문자 관리',
  SETTLEMENT: '정산 관리',
};

const tooltipStyle = {
  color: palette.grey.w,
  padding: '6px 8px',
  backgroundColor: palette.grey.g90,
  borderRadius: '4px',
  boxShadow: `0px 4px 10px 0px ${palette.shadow}`,
  fontWeight: '400',
  fontStyle: 'normal',
  lineHeight: '18px',
  fontDisplay: 'auto',
  fontSize: '12px',
};

const TabItem = ({ type }: TabItemProps) => {
  const params = useParams<{ showId: string }>();
  const showId = Number(params!.showId);

  const { data: settlementInfo } = useShowSettlementInfo(showId);
  const { data: lastSettlementEvent } = useShowLastSettlementEvent(showId);

  const match = useMatch(matchTargets[type]);
  const navigate = useNavigate();
  const middleware = useAtomValue(middlewareAtom);

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

  return (
    <Styled.TabItem
      active={match !== null}
      id={type === 'SETTLEMENT' ? 'settlement-page-tooltip' : undefined}
      onClick={async () => {
        if (!params.showId) return;

        if (middleware && !(await middleware())) {
          return;
        }

        navigate(toTargets[type](params.showId));
      }}
    >
      {label[type]}
      {isTooltipVisible && (
        <Tooltip
          content={settlementTooltipText[lastSettlementEvent?.settlementEventType ?? 'DEFAULT']}
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
  );
};

const ShowDetailLayout = ({ children }: ShowDetailLayoutProps) => {
  const { ref: topObserverRef, inView: topInView } = useInView({
    threshold: 1,
    initialInView: true,
  });
  const { ref: headerObserverRef, inView: headerInView } = useInView({
    threshold: 0.01,
    initialInView: true,
  });
  const theme = useTheme();
  const deviceWidth = useDeviceWidth();
  const isMobile = deviceWidth < parseInt(theme.breakpoint.mobile, 10);

  const navigate = useNavigate();
  const params = useParams<{ showId: string }>();

  const showSettingDialog = useStepDialog<'main' | 'hostList' | 'deleteShow'>();
  const showId = Number(params!.showId);

  const [, setMyHostInfo] = useAtom(myHostInfoAtom);

  const { data: show } = useShowDetail(showId);
  const { data: myHostInfoData } = useMyHostInfo(showId);

  const middleware = useAtomValue(middlewareAtom);

  useEffect(() => {
    if (myHostInfoData) {
      setMyHostInfo({ ...myHostInfoData });
    }
  }, [myHostInfoData, setMyHostInfo]);

  if (!show || !myHostInfoData) {
    return null;
  }

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
                      if (middleware && !(await middleware())) {
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
              right={<ProfileDropdown image={myHostInfoData?.imagePath} />}
            />
            <Styled.HeaderContent>
              <Styled.ShowNameWrapper>
                <Styled.ShowName size={headerInView ? 'big' : 'small'}>
                  {show?.name}
                </Styled.ShowName>
                {myHostInfoData?.type !== HostType.SUPPORTER && (
                  <Styled.ShowSettingButtonContainer>
                    <Button
                      type="button"
                      colorTheme="secondary"
                      size="x-small"
                      icon={<Setting />}
                      onClick={() => {
                        showSettingDialog.open({
                          initialHistory: ['main'],
                          width: '600px',
                          content: {
                            main: {
                              title: '공연 설정',
                              children: ({ push }) => (
                                <ShowSettingDialogContent
                                  showId={showId}
                                  onClickHostList={() => {
                                    push('hostList');
                                  }}
                                  onClickDeleteButton={() => {
                                    push('deleteShow');
                                  }}
                                />
                              ),
                            },
                            hostList: {
                              title: '관리 그룹',
                              children: () => (
                                <Styled.HostListContainer>
                                  <HostList
                                    showId={showId}
                                    onCloseDialog={showSettingDialog.close}
                                  />
                                </Styled.HostListContainer>
                              ),
                            },
                            deleteShow: {
                              title: '공연 삭제',
                              children: () => <ShowDeleteDialogContent showId={showId} onDeleteShow={showSettingDialog.close} />,
                            },
                          },
                        });
                      }}
                    >
                      {!isMobile && '공연 설정'}
                    </Button>
                  </Styled.ShowSettingButtonContainer>
                )}
              </Styled.ShowNameWrapper>
              <Styled.TabContainer>
                <Styled.Tab>
                  <TabItem type="INFO" />
                  <TabItem type="TICKET" />
                  <TabItem type="RESERVATION" />
                  <TabItem type="ENTRANCE" />
                  <TabItem type="SETTLEMENT" />
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

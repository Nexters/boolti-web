import Styled from './ShowSettingDialogContent.styles';
import { useHostList, useInvitationTicketList, useSalesTicketList } from '@boolti/api';
import HostInputForm from './components/HostInputForm';
import { Button } from '@boolti/ui';
import { ChevronRightIcon } from '@boolti/icon';
import { myHostInfoAtom } from '../ShowDetailLayout';
import { useAtom } from 'jotai';
import { HostType } from '@boolti/api/src/types/host';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';

interface ShowSettingDialogContentProps {
  showId: number;
  onClickHostList: () => void;
  onClickDeleteButton: () => void;
}

const ShowSettingDialogContent = ({
  showId,
  onClickHostList,
  onClickDeleteButton,
}: ShowSettingDialogContentProps) => {
  const { data: hosts } = useHostList(showId);
  const { data: salesTicketList } = useSalesTicketList(showId);
  const { data: invitationTicketList } = useInvitationTicketList(showId);

  const hasSoldSalesTicketAtLeastOnce = salesTicketList?.some(({ soldAtLeastOnce }) => soldAtLeastOnce)
  const hasSoldInvitationTicket = invitationTicketList?.some(({ totalForSale }) => totalForSale > 0)
  const isShowDeletable = !hasSoldSalesTicketAtLeastOnce && !hasSoldInvitationTicket

  const [firstHost, ...restHosts] = hosts ?? [];

  const [myHostInfo] = useAtom(myHostInfoAtom);

  useBodyScrollLock();

  return (
    <Styled.Container>
      <Styled.Section>
        <Styled.SectionHeader>
          <Styled.SectionTitle>관리 그룹</Styled.SectionTitle>
        </Styled.SectionHeader>
        <Styled.HostInputFormContainer>
          <HostInputForm showId={showId} />
        </Styled.HostInputFormContainer>
        <Styled.HostListButton onClick={onClickHostList}>
          {hosts && (
            <>
              <Styled.HostPreview>
                {firstHost?.imagePath ? (
                  <Styled.HostProfileImage src={firstHost?.imagePath} />
                ) : (
                  <Styled.HostDefaultProfileImage />
                )}
                <Styled.HostName>
                  {firstHost?.hostName}
                  {restHosts.length > 0 ? ` 외 ${restHosts.length}명` : ''}
                </Styled.HostName>
              </Styled.HostPreview>
              <ChevronRightIcon />
            </>
          )}
        </Styled.HostListButton>
      </Styled.Section>
      {myHostInfo?.type === HostType.MAIN && (
        <>
          <Styled.SectionDivider />
          <Styled.Section>
            <Styled.SectionHeader>
              <Styled.SectionTitle>공연 삭제</Styled.SectionTitle>
              <Styled.SectionDescription>
                * 1매 이상 티켓이 판매된 공연은 삭제할 수 없어요.
                <br />* 삭제 시 작성했던 공연 정보는 전부 사라지며 복구할 수 없어요.
              </Styled.SectionDescription>
            </Styled.SectionHeader>
            <Styled.DeleteButtonContainer>
              <Button
                type="button"
                colorTheme="danger"
                size="x-small"
                disabled={!isShowDeletable}
                onClick={onClickDeleteButton}
              >
                삭제하기
              </Button>
            </Styled.DeleteButtonContainer>
          </Styled.Section>
        </>
      )}
    </Styled.Container>
  );
};

export default ShowSettingDialogContent;

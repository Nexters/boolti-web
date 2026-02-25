import Styled from './ShowSettingDialog.styles';
import { useHostList } from '@boolti/api';
import { Button } from '@boolti/ui';
import { ChevronRightIcon } from '@boolti/icon';
import HostInputForm from './components/HostInputForm';

interface ShowSettingDialogContentProps {
  showId: number;
  onClickHostList: () => void;
  onClickHideShow: () => void;
  onClickDeleteShow: () => void;
}

const ShowSettingDialogContent = ({
  showId,
  onClickHostList,
  onClickHideShow,
  onClickDeleteShow,
}: ShowSettingDialogContentProps) => {
  const { data: hosts } = useHostList(showId);

  const [firstHost, ...restHosts] = hosts ?? [];

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
      <Styled.SectionDivider />
      <Styled.Section>
        <Styled.SectionHeader>
          <Styled.SectionTitle>공연 관리</Styled.SectionTitle>
        </Styled.SectionHeader>
        <Styled.ManageButtonContainer>
          <Button type="button" colorTheme="line" size="x-small" onClick={onClickHideShow}>
            공연 미노출
          </Button>
          <Button type="button" colorTheme="danger" size="x-small" onClick={onClickDeleteShow}>
            공연 삭제
          </Button>
        </Styled.ManageButtonContainer>
      </Styled.Section>
    </Styled.Container>
  );
};

export default ShowSettingDialogContent;

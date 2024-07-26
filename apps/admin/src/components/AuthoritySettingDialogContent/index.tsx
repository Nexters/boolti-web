import Styled from './AuthoritySettingDialogContent.styles';
import { useHostList } from '@boolti/api';
import HostInputForm from './components/HostInputForm';
import HostList from './components/HostList';

const AuthoritySettingDialogContent = ({ showId }: { showId: number }) => {
  const { data: hosts } = useHostList(showId);

  return (
    <Styled.Container>
      <HostInputForm showId={showId} />
      <HostList hosts={hosts!} showId={showId} />
    </Styled.Container>
  );
};

export default AuthoritySettingDialogContent;

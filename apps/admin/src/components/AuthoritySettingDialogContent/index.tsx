import Styled from './AuthoritySettingDialogContent.styles';
import { useHostList } from '@boolti/api';
import HostInputForm from './components/HostInputForm';
import HostList from './components/HostList';

interface AuthoritySettingDialogContentProps {
  showId: number;
  onClose: () => void;
}

const AuthoritySettingDialogContent = ({ showId, onClose }: AuthoritySettingDialogContentProps) => {
  const { data: hosts } = useHostList(showId);

  return (
    <Styled.Container>
      <HostInputForm showId={showId} />
      <HostList hosts={hosts!} showId={showId} onCloseDialog={onClose} />
    </Styled.Container>
  );
};

export default AuthoritySettingDialogContent;

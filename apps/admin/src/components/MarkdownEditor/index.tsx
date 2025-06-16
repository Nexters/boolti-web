import { TrashIcon, YoutubeLinkIcon } from '@boolti/icon';
import { useUploadShowContentImage } from '@boolti/api';
import { useTranslation } from 'react-i18next';

import Styled from './MarkdownEditor.styles';

interface MarkdownEditorProps {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  placeholder,
  disabled,
  hasError,
  onChange,
  onBlur,
}) => {
  const { t } = useTranslation();
  const uploadShowContentImageMutation = useUploadShowContentImage();

  return (
    <Styled.MarkdownEditorContainer disabled={disabled} hasError={hasError}>

    </Styled.MarkdownEditorContainer>
  );
};

export default MarkdownEditor;

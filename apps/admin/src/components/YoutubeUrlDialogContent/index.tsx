import { Button, TextField } from '@boolti/ui';
import Styled from './YoutubeUrlDialogContent.styles';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { useForm } from 'react-hook-form';

interface YoutubeUrlDialogContentProps {
  onSubmit: (url: string) => void;
}

const YoutubeUrlDialogContent: React.FC<YoutubeUrlDialogContentProps> = ({ onSubmit }) => {
  useBodyScrollLock();

  const submitHandler = ({ url }: { url: string }) => {
    onSubmit(url.trim());
  };

  const { register, handleSubmit } = useForm<{ url: string }>({
    defaultValues: {
      url: '',
    },
  });

  return (
    <Styled.YoutubeUrlDialogContent>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Styled.TextFieldContainer>
          <Styled.Label>URL</Styled.Label>
          <TextField
            inputType="text"
            size="small"
            placeholder="유튜브 영상 URL을 입력해 주세요"
            {...register('url', { required: true })}
          />
        </Styled.TextFieldContainer>
        <Styled.ButtonContainer>
          <Button
            size="bold"
            colorTheme="primary"
            type="submit"
            style={{ width: '100%' }}
          >
            업로드하기
          </Button>
        </Styled.ButtonContainer>
      </form>
    </Styled.YoutubeUrlDialogContent>
  )
}

export default YoutubeUrlDialogContent;

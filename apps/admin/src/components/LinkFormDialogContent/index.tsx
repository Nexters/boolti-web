import { useForm } from 'react-hook-form';
import Styled from './LinkFormDialogContent.styles';
import { Button, TextField } from '@boolti/ui';
import { UserLink } from '@boolti/api';

export type LinkFormInputs = UserLink;

interface LinkFormDialogContentProps {
  defaultValues?: LinkFormInputs;
  onSubmit: (data: LinkFormInputs) => void;
  onDelete?: () => void;
}

const URL_PATTERN = /^https?:\/\/.+/;

const LinkFormDialogContent = ({
  defaultValues,
  onSubmit,
  onDelete,
}: LinkFormDialogContentProps) => {
  const linkForm = useForm<LinkFormInputs>({
    defaultValues,
    mode: 'onChange',
  });

  const isEditMode = !!defaultValues;
  const hasTitleValue = !!defaultValues?.title;

  const submitHandler = (data: LinkFormInputs) => {
    const trimmedLink = data.link.trim();
    const trimmedTitle = data.title?.trim();

    onSubmit({
      title: trimmedTitle || trimmedLink,
      link: trimmedLink,
    });
  };

  return (
    <Styled.LinkForm onSubmit={linkForm.handleSubmit(submitHandler)}>
      <Styled.LinkFormControl>
        <Styled.Label htmlFor="link" required>URL</Styled.Label>
        <TextField
          inputType="text"
          size="small"
          id="link"
          autoFocus={hasTitleValue}
          required
          {...linkForm.register('link', { required: true, pattern: URL_PATTERN })}
        />
      </Styled.LinkFormControl>
      <Styled.LinkFormControl>
        <Styled.Label htmlFor="title">제목</Styled.Label>
        <TextField
          inputType="text"
          size="small"
          id="title"
          autoFocus={!hasTitleValue}
          {...linkForm.register('title')}
        />
      </Styled.LinkFormControl>
      <Styled.LinkFormButtonWrapper isEditMode={isEditMode}>
        <Button
          size="bold"
          colorTheme="primary"
          type="submit"
          disabled={!linkForm.formState.isValid}
        >
          저장하기
        </Button>
        {isEditMode && onDelete && (
          <Styled.LinkDeleteButton type="button" onClick={onDelete}>
            링크 삭제
          </Styled.LinkDeleteButton>
        )}
      </Styled.LinkFormButtonWrapper>
    </Styled.LinkForm>
  );
};

export default LinkFormDialogContent;

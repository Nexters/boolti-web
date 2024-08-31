import { useForm } from 'react-hook-form';
import Styled from './LinkFormDialogContent.styles';
import { Button, TextField } from '@boolti/ui';
import { UserProfileLink } from '@boolti/api';

export type LinkFormInputs = UserProfileLink;

interface LinkFormDialogContentProps {
  defaultValues?: LinkFormInputs;
  onSubmit: (data: LinkFormInputs) => void;
  onDelete?: () => void;
}

const LinkFormDialogContent = ({ defaultValues, onSubmit, onDelete }: LinkFormDialogContentProps) => {
  const linkForm = useForm<LinkFormInputs>({
    defaultValues
  });

  const isEditMode = !!defaultValues;

  const submitHandler = (data: LinkFormInputs) => {
    onSubmit({
      title: data.title.trim(),
      link: data.link.trim(),
    });
  }

  return (
    <Styled.LinkForm onSubmit={linkForm.handleSubmit(submitHandler)}>
      <Styled.LinkFormControl>
        <Styled.Label htmlFor="title">링크 이름</Styled.Label>
        <TextField
          inputType="text"
          size="small"
          id="title"
          autoFocus
          {...linkForm.register('title', { required: true })}
        />
      </Styled.LinkFormControl>
      <Styled.LinkFormControl>
        <Styled.Label htmlFor="link">URL</Styled.Label>
        <TextField
          inputType="text"
          size="small"
          id="link"
          {...linkForm.register('link', { required: true })}
        />
      </Styled.LinkFormControl>
      <Styled.LinkFormButtonWrapper isEditMode={isEditMode}>
        <Button size="bold" colorTheme="primary" type="submit" disabled={!linkForm.formState.isValid}>
          저장하기
        </Button>
        {isEditMode && onDelete && (
          <Styled.LinkDeleteButton type="button" onClick={onDelete}>
            링크 삭제
          </Styled.LinkDeleteButton>
        )}
      </Styled.LinkFormButtonWrapper>
    </Styled.LinkForm>
  )
}

export default LinkFormDialogContent;

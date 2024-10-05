import { Button, TextButton, TextField } from '@boolti/ui';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Styled from './ShowCastInfoFormDialogContent.styles';
import { useState } from 'react';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { PlusIcon, TrashIcon } from '@boolti/icon';

type ShowCastInfoFormInputs = {
  name: string;
  members?: Array<{
    userCode?: string;
    roleName?: string;
  }>;
};

const ShowCastInfoFormDialogContent = () => {
  const { control, register } = useForm<ShowCastInfoFormInputs>({
    defaultValues: { members: [{}] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  useBodyScrollLock(true);

  const [hasBlurred, setHasBlurred] = useState<
    Record<keyof ShowCastInfoFormInputs, boolean | boolean[]>
  >({
    name: false,
    members: [],
  });

  return (
    <>
      <Styled.ShowInfoFormLabel required>팀명</Styled.ShowInfoFormLabel>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Styled.InputWrapper text={value}>
            <Styled.Input
              placeholder="팀명을 입력해 주세요 (30자 이내)"
              required
              onChange={onChange}
              onBlur={() => {
                onBlur();
                setHasBlurred((prev) => ({ ...prev, name: true }));
              }}
              value={value ?? ''}
            />
          </Styled.InputWrapper>
        )}
        name="name"
      />
      <Styled.ShowInfoFormLabel>팀원</Styled.ShowInfoFormLabel>
      <Styled.MemberList>
        {fields.map((field, index) => (
          <Styled.Row key={field.id}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Styled.InputWrapper text={value ?? ''}>
                  <Styled.HashTag>#</Styled.HashTag>
                  <Styled.Input
                    placeholder="식별 코드"
                    required
                    onChange={onChange}
                    onBlur={() => {
                      onBlur();
                    }}
                    value={value ?? ''}
                  />
                </Styled.InputWrapper>
              )}
              name={`members.${index}.userCode`}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Styled.InputWrapper text={value ?? ''}>
                  <Styled.Input
                    placeholder="역할"
                    required
                    onChange={onChange}
                    onBlur={() => {
                      onBlur();
                    }}
                    value={value ?? ''}
                  />
                </Styled.InputWrapper>
              )}
              name={`members.${index}.roleName`}
            />
            <Styled.TrashCanButton
              onClick={() => {
                remove(index);
              }}
            >
              <TrashIcon />
            </Styled.TrashCanButton>
          </Styled.Row>
        ))}
        <Styled.MemberAddButton
          onClick={() => {
            append({});
          }}
        >
          <PlusIcon />
          팀원 추가
        </Styled.MemberAddButton>
      </Styled.MemberList>
      <Styled.RegisterButton type="button" colorTheme="primary" size="bold" disabled>
        등록하기
      </Styled.RegisterButton>
    </>
  );
};

export default ShowCastInfoFormDialogContent;

import { TextField } from '@boolti/ui';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Styled from './ShowCastInfoFormDialogContent.styles';
import { useState } from 'react';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { ClearIcon, PlusIcon, TrashIcon } from '@boolti/icon';
import { queryKeys, useQueryClient } from '@boolti/api';
import { replaceUserCode } from '~/utils/replace';

type ShowCastInfoFormInputs = {
  name: string;
  members?: Array<{
    imgPath?: string;
    nickname?: string;
    userCode?: string;
    roleName?: string;
  }>;
};

const ShowCastInfoFormDialogContent = () => {
  const queryClient = useQueryClient();
  const { control, getValues, watch } = useForm<ShowCastInfoFormInputs>({
    defaultValues: { members: [{}] },
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'members',
  });
  const watchMemberFields = watch('members') ?? [];
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchMemberFields[index],
    };
  });

  const disabled = !getValues('name');

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
          <Styled.TextFieldWrap>
            <TextField
              inputType="text"
              size="big"
              placeholder="팀명을 입력해 주세요 (30자 이내)"
              required
              onChange={onChange}
              onBlur={() => {
                onBlur();
                setHasBlurred((prev) => ({ ...prev, name: true }));
              }}
              value={value ?? ''}
              errorMessage={hasBlurred.name && !value ? '필수 입력사항입니다.' : undefined}
            />
          </Styled.TextFieldWrap>
        )}
        name="name"
      />
      <Styled.ShowInfoFormLabel>팀원</Styled.ShowInfoFormLabel>
      <Styled.MemberList>
        {controlledFields.map((field, index) => (
          <Styled.Row key={field.id}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Styled.InputWrapper text={value ?? ''}>
                  {field.imgPath && field.nickname ? (
                    <>
                      <Styled.UsrImage
                        style={{ '--imgPath': `url(${field.imgPath})` } as React.CSSProperties}
                      />
                      <Styled.Username>{field.nickname}</Styled.Username>
                      <Styled.RemoveButton
                        onClick={() => {
                          update(index, { roleName: field.roleName });
                        }}
                      >
                        <ClearIcon />
                      </Styled.RemoveButton>
                    </>
                  ) : (
                    <>
                      <Styled.HashTag>#</Styled.HashTag>
                      <Styled.Input
                        placeholder="식별 코드"
                        required
                        onChange={(e) => {
                          const nextValue = replaceUserCode(e.target.value);
                          onChange(nextValue);
                        }}
                        onBlur={async (event) => {
                          onBlur();
                          const userCode = event.target.value;
                          if (userCode !== '') {
                            const { imgPath, nickname } = await queryClient.fetchQuery(
                              queryKeys.user.userCode(event.target.value),
                            );
                            update(index, { ...field, imgPath, nickname });
                          }
                        }}
                        value={value ?? ''}
                      />
                    </>
                  )}
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
      <Styled.RegisterButton type="button" colorTheme="primary" size="bold" disabled={disabled}>
        등록하기
      </Styled.RegisterButton>
    </>
  );
};

export default ShowCastInfoFormDialogContent;

import { TextField, useConfirm, useToast } from '@boolti/ui';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Styled from './ShowCastInfoFormDialogContent.styles';
import { useState } from 'react';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { ClearIcon, PlusIcon, TrashIcon } from '@boolti/icon';
import { Member, ShowCastTeamCreateOrUpdateRequest, queryKeys, useQueryClient } from '@boolti/api';
import { replaceUserCode } from '~/utils/replace';

export interface TempShowCastInfoFormInput {
  name: string;
  members?: Array<Partial<Member>>;
}

interface Props {
  prevShowCastInfo?: TempShowCastInfoFormInput;
  onDelete?: () => Promise<void>;
  onSave: (value: TempShowCastInfoFormInput) => Promise<void>;
}

const ShowCastInfoFormDialogContent = ({ onDelete, prevShowCastInfo, onSave }: Props) => {
  const queryClient = useQueryClient();

  const previousShowCastInfoMemberLength = prevShowCastInfo?.members?.length ?? 0;
  const defaultValues = {
    name: prevShowCastInfo?.name,
    members: previousShowCastInfoMemberLength > 0 ? prevShowCastInfo?.members : [{}],
  };
  const { control, getValues, watch } = useForm<TempShowCastInfoFormInput>({
    defaultValues,
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

  const toast = useToast();
  const confirm = useConfirm();

  useBodyScrollLock(true);

  const [hasBlurred, setHasBlurred] = useState<
    Record<keyof ShowCastTeamCreateOrUpdateRequest, boolean | boolean[]>
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
        {controlledFields.map((controlledField, index) => (
          <Styled.Row key={controlledField.id}>
            <Controller
              control={control}
              defaultValue={controlledField.userCode}
              render={({ field: { onChange, onBlur } }) => (
                <Styled.InputWrapper text={controlledField.userCode ?? ''}>
                  {controlledField.userImgPath && controlledField.userNickname ? (
                    <>
                      <Styled.UserImage
                        style={
                          {
                            '--imgPath': `url(${controlledField.userImgPath})`,
                          } as React.CSSProperties
                        }
                      />
                      <Styled.Username>{controlledField.userNickname}</Styled.Username>
                      <Styled.RemoveButton
                        onClick={() => {
                          update(index, { roleName: controlledField.roleName });
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
                            try {
                              const { imgPath, nickname } = await queryClient.fetchQuery(
                                queryKeys.user.userCode(event.target.value),
                              );
                              update(index, {
                                ...controlledField,
                                userImgPath: imgPath,
                                userNickname: nickname,
                              });
                            } catch {
                              toast.error(
                                '불티에 회원으로 등록된 식별 코드로만 등록이 가능합니다.' +
                                  '\n' +
                                  '식별 코드를 확인 후 다시 시도해 주세요.',
                              );
                            }
                          }
                        }}
                        value={controlledField.userCode ?? ''}
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
              render={({ field: { onChange, onBlur } }) => (
                <Styled.InputWrapper text={controlledField.roleName ?? ''}>
                  <Styled.Input
                    placeholder="역할"
                    required
                    onChange={onChange}
                    onBlur={() => {
                      onBlur();
                    }}
                    value={controlledField.roleName ?? ''}
                  />
                </Styled.InputWrapper>
              )}
              name={`members.${index}.roleName`}
            />
            <Styled.TrashCanButton
              onClick={async () => {
                const isConfirm = await confirm('팀원 정보를 삭제하시겠어요?', {
                  confirm: '삭제하기',
                  cancel: '취소하기',
                });

                if (isConfirm) {
                  toast.success('팀원 정보를 삭제했습니다.');
                  remove(index);
                }
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
      <Styled.ButtonWrap>
        {onDelete && (
          <Styled.DeleteButton
            onClick={async () => {
              const isConfirm = await confirm('팀 정보를 삭제하시겠어요?', {
                confirm: '삭제하기',
                cancel: '취소하기',
              });

              if (isConfirm) {
                try {
                  onDelete();
                  toast.success('팀 정보를 삭제했습니다.');
                } catch {
                  toast.error('알 수 없는 오류가 발생했습니다.');
                }
              }
            }}
          >
            팀 삭제
          </Styled.DeleteButton>
        )}
        <Styled.RegisterButton
          type="button"
          colorTheme="primary"
          size="bold"
          disabled={disabled}
          onClick={async (e) => {
            e.preventDefault();

            const name = getValues('name');
            const members = (getValues('members') ?? []).filter(
              (member) =>
                member.userImgPath && member.userNickname && member.roleName && member.userCode,
            );

            try {
              await onSave({ name, members });
              toast.success(
                onDelete ? '출연진 정보를 수정했습니다.' : '출연진 정보를 생성했습니다.',
              );
            } catch {
              toast.error('알 수 없는 오류가 발생했습니다.');
            }
          }}
        >
          등록하기
        </Styled.RegisterButton>
      </Styled.ButtonWrap>
    </>
  );
};

export default ShowCastInfoFormDialogContent;

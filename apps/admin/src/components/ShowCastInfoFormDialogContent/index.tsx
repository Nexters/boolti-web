import { TextField, useConfirm, useToast } from '@boolti/ui';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Styled from './ShowCastInfoFormDialogContent.styles';
import { useCallback, useRef, useState } from 'react';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { PlusIcon } from '@boolti/icon';
import { Member, queryKeys, useQueryClient } from '@boolti/api';
import ShowCastInfoMemberRow from './ShowCastInfoMemberRow';

export interface TempShowCastInfoFormInput {
  id: number;
  name: string;
  members?: Array<Partial<Member> & { id: number }>;
}

interface Props {
  prevShowCastInfo?: TempShowCastInfoFormInput;
  onDelete?: () => Promise<void>;
  onSave: (value: TempShowCastInfoFormInput) => Promise<void>;
}

const ShowCastInfoFormDialogContent = ({ prevShowCastInfo, onDelete, onSave }: Props) => {
  const queryClient = useQueryClient();

  const previousShowCastInfoMemberLength = prevShowCastInfo?.members?.length ?? 0;
  const defaultValues = {
    name: prevShowCastInfo?.name,
    members: previousShowCastInfoMemberLength > 0 ? prevShowCastInfo?.members : [{}],
  };
  const { control, getValues, watch, getFieldState } = useForm<TempShowCastInfoFormInput>({
    defaultValues,
  });
  const { fields, append, remove, update, replace } = useFieldArray({
    control,
    name: 'members',
    keyName: '_id',
  });
  const watchMemberFields = watch('members') ?? [];
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchMemberFields[index],
    };
  });
  const prevControlledFields = useRef(controlledFields);

  const toast = useToast();
  const confirm = useConfirm();

  useBodyScrollLock(true);

  const [isNameFieldBlurred, setIsNameFieldBlurred] = useState(false);
  const [isMemberFieldBlurred, setIsMemberFieldBlurred] = useState<
    Array<{ userCode: boolean; roleName: boolean }>
  >(
    prevShowCastInfo?.members && previousShowCastInfoMemberLength > 0
      ? prevShowCastInfo.members.map(() => ({ userCode: false, roleName: false }))
      : [{ userCode: false, roleName: false }],
  );

  const memberFieldState = getFieldState('members');
  const disabled =
    !getValues('name') ||
    ((memberFieldState.isDirty || memberFieldState.isTouched) &&
      controlledFields.some(
        ({ userNickname, roleName }, index) =>
          (isMemberFieldBlurred[index].roleName || isMemberFieldBlurred[index].userCode) &&
          (!userNickname || !roleName),
      ));

  const dragHoverHandler = useCallback(
    (draggedItemId: number, hoverIndex: number) => {
      const draggedItemIndex = controlledFields.findIndex(({ id }) => id === draggedItemId);
      if (draggedItemIndex === -1 || hoverIndex < 0 || hoverIndex >= controlledFields.length) {
        return;
      }

      prevControlledFields.current = { ...controlledFields };

      const nextFields = [...fields];
      const [draggedItem] = nextFields.splice(draggedItemIndex, 1);
      nextFields.splice(hoverIndex, 0, draggedItem);

      replace(nextFields);

      setIsMemberFieldBlurred((prev) => {
        const nextMemberFieldBlurred = [...prev];
        nextMemberFieldBlurred.splice(draggedItemIndex, 1);
        nextMemberFieldBlurred.splice(hoverIndex, 0, prev[draggedItemIndex]);
        return nextMemberFieldBlurred;
      });
    },
    [fields, controlledFields, replace],
  );

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
                setIsNameFieldBlurred(true);
              }}
              value={value ?? ''}
              errorMessage={isNameFieldBlurred && !value ? '필수 입력사항입니다.' : undefined}
            />
          </Styled.TextFieldWrap>
        )}
        name="name"
      />
      <Styled.ShowInfoFormLabel>팀원</Styled.ShowInfoFormLabel>
      <Styled.MemberList>
        {controlledFields.map((field, index) => (
          <ShowCastInfoMemberRow
            key={field.id ?? index}
            control={control}
            field={field}
            index={index}
            isFieldBlurred={isMemberFieldBlurred[index]}
            onSetUser={async (userCode) => {
              if (userCode !== '') {
                try {
                  const { imgPath, nickname } = await queryClient.fetchQuery(
                    queryKeys.user.userCode(userCode),
                  );
                  update(index, {
                    ...controlledFields[index],
                    userImgPath: imgPath,
                    userNickname: nickname,
                  });
                } catch {
                  toast.error(
                    '불티에 회원으로 등록된 식별 코드로만 등록이 가능합니다.' +
                      '\n' +
                      '식별 코드를 확인 후 다시 시도해 주세요.',
                  );
                } finally {
                  setIsMemberFieldBlurred((prev) => {
                    const nextMemberFieldBlurred = [...prev];
                    nextMemberFieldBlurred[index].userCode = true;
                    return nextMemberFieldBlurred;
                  });
                }
              }
            }}
            onResetUser={() => {
              setIsMemberFieldBlurred((prev) => {
                const nextMemberFieldBlurred = [...prev];
                nextMemberFieldBlurred[index].userCode = true;
                return nextMemberFieldBlurred;
              });
              update(index, {
                id: field.id,
                roleName: field.roleName,
              });
            }}
            onBlurRoleName={() => {
              setIsMemberFieldBlurred((prev) => {
                const nextMemberFieldBlurred = [...prev];
                nextMemberFieldBlurred[index].roleName = true;
                return nextMemberFieldBlurred;
              });
            }}
            onDelete={async () => {
              const isConfirm = await confirm('팀원 정보를 삭제하시겠어요?', {
                confirm: '삭제하기',
                cancel: '취소하기',
              });

              if (isConfirm) {
                toast.success('팀원 정보를 삭제했습니다.');
                setIsMemberFieldBlurred((prev) =>
                  prev.filter((_, blurredIndex) => blurredIndex !== index),
                );
                remove(index);
              }
            }}
            onDropHover={dragHoverHandler}
          />
        ))}
        <Styled.MemberAddButton
          onClick={() => {
            append({ id: -Math.floor(Math.random() * 1000000) });
            setIsMemberFieldBlurred((prev) => [...prev, { userCode: false, roleName: false }]);
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

            const id = prevShowCastInfo?.id ?? -Math.floor(Math.random() * 1000000);
            const name = getValues('name');
            const members = (getValues('members') ?? []).filter(
              (member) => member.userNickname && member.roleName && member.userCode,
            );

            try {
              await onSave({ id, name, members });
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

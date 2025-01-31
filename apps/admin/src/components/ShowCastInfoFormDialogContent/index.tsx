import { TextField, useConfirm, useToast } from '@boolti/ui';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Styled from './ShowCastInfoFormDialogContent.styles';
import { useCallback, useState } from 'react';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { PlusIcon } from '@boolti/icon';
import { Member, queryKeys, useQueryClient } from '@boolti/api';
import ShowCastInfoMemberRow from './ShowCastInfoMemberRow';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  UniqueIdentifier,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import DraggableShowCastInfoMemberRow from './DraggableShowCastInfoMemberRow';

export interface TempShowCastInfoFormInput {
  id: number;
  name: string;
  members?: Array<Partial<Member> & { id: number }>;
}

interface Props {
  prevShowCastInfo?: TempShowCastInfoFormInput;
  onDelete?: () => void;
  onSave: (value: TempShowCastInfoFormInput) => void;
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

  const [draggingItemId, setDraggingItemId] = useState<UniqueIdentifier | null>(null);
  const draggingField = controlledFields.find(({ _id }) => _id === draggingItemId);
  const draggingFieldIndex = controlledFields.findIndex(({ _id }) => _id === draggingItemId);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const dragStartHandler = (event: DragStartEvent) => {
    setDraggingItemId(event.active.id);
  };

  const dragEndHandler = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;

      if (!(active && over && over.id !== active.id)) return;

      const oldIndex = controlledFields.findIndex(({ _id }) => _id === active.id);
      const newIndex = controlledFields.findIndex(({ _id }) => _id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      const nextFields = arrayMove(controlledFields, oldIndex, newIndex);
      replace(nextFields);

      setIsMemberFieldBlurred((prev) => {
        const nextMemberFieldBlurred = [...prev];
        nextMemberFieldBlurred.splice(oldIndex, 1);
        nextMemberFieldBlurred.splice(newIndex, 0, prev[oldIndex]);
        return nextMemberFieldBlurred;
      });

      setDraggingItemId(null);
    },
    [controlledFields, replace],
  );

  return (
    <Styled.Container>
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
        <DndContext
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
          collisionDetection={closestCenter}
          onDragStart={dragStartHandler}
          onDragEnd={dragEndHandler}
        >
          <SortableContext
            items={controlledFields.map((field) => field._id)}
            strategy={verticalListSortingStrategy}
          >
            {controlledFields.map((field, index) => (
              <DraggableShowCastInfoMemberRow
                key={field._id}
                id={field._id}
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
                    setIsMemberFieldBlurred((prev) =>
                      prev.filter((_, blurredIndex) => blurredIndex !== index),
                    );
                    remove(index);
                  }
                }}
              />
            ))}
          </SortableContext>
          <DragOverlay>
            {draggingItemId && draggingField && draggingFieldIndex > -1 ? (
              <Styled.DraggableShowCastInfoMemberRow>
                <ShowCastInfoMemberRow
                  control={control}
                  field={draggingField}
                  index={draggingFieldIndex}
                  isFieldBlurred={isMemberFieldBlurred[draggingFieldIndex]}
                />
              </Styled.DraggableShowCastInfoMemberRow>
            ) : null}
          </DragOverlay>
        </DndContext>
        <Styled.MemberAddButton
          onClick={() => {
            append({ id: -Math.floor(Math.random() * 1000000), userCode: '', userNickname: '', roleName: '', userImgPath: '' });
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
              onSave({ id, name, members });
            } catch {
              toast.error('알 수 없는 오류가 발생했습니다.');
            }
          }}
        >
          등록하기
        </Styled.RegisterButton>
      </Styled.ButtonWrap>
    </Styled.Container>
  );
};

export default ShowCastInfoFormDialogContent;

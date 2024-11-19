import { useDrag, useDrop } from "react-dnd";
import { ClearIcon, MenuIcon, TrashIcon, UserIcon } from '@boolti/icon';
import { Member } from '@boolti/api';
import { replaceUserCode } from '~/utils/replace';
import Styled from './ShowCastInfoFormDialogContent.styles';
import { TempShowCastInfoFormInput } from ".";
import { Control, Controller } from "react-hook-form";
import { useRef } from "react";

interface DragItem {
  id: number
  index: number
}

interface ShowCastInfoMemberRowProps {
  control: Control<TempShowCastInfoFormInput>;
  field: Partial<Member> & { id: number };
  index: number;
  isFieldBlurred: { userCode: boolean; roleName: boolean };
  onSetUser: (userCode: string) => void;
  onResetUser: () => void;
  onBlurRoleName: () => void;
  onDelete: () => void
  onDropHover: (draggedItemId: number, hoverIndex: number) => void;
  onDrop?: () => void;
}

const ShowCastInfoMemberRow = ({ control, field, index, isFieldBlurred, onSetUser, onResetUser, onBlurRoleName, onDelete, onDropHover, onDrop }: ShowCastInfoMemberRowProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag, preview] = useDrag<DragItem, unknown, { isDragging: boolean }>(() => ({
    type: 'castMember',
    previewOptions: {
      captureDraggingState: true,
    },
    item: { id: field.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  }))
  const [, drop] = useDrop<DragItem>({
    accept: 'castMember',
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      if (!monitor.canDrop()) return;
      if (item.id === field.id) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      item.index = hoverIndex;

      onDropHover(item.id, index);
    },
    drop() {
      onDrop?.()
    }
  })

  preview(drop(ref))

  return (
    <Styled.Row
      ref={ref}
      style={{
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <Styled.Handle type="button" ref={drag} onScroll={(event) => { event.stopPropagation() }}>
        <MenuIcon />
      </Styled.Handle>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur } }) => {
          const value = field.userCode;
          const isError = Boolean(
            isFieldBlurred.userCode ? !value || !field.userNickname : false,
          );
          return (
            <Styled.FieldWrap>
              <Styled.InputWrapper isError={isError}>
                {field.userNickname ? (
                  <>
                    {field.userImgPath ? (
                      <Styled.UserImage
                        style={
                          {
                            '--imgPath': `url(${field.userImgPath})`,
                          } as React.CSSProperties
                        }
                      />
                    ) : (
                      <UserIcon size={32} />
                    )}
                    <Styled.Username>{field.userNickname}</Styled.Username>
                    <Styled.RemoveButton
                      onClick={() => {
                        onChange(undefined);
                        onResetUser();
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
                        onSetUser(event.target.value);
                      }}
                      value={value ?? ''}
                    />
                  </>
                )}
              </Styled.InputWrapper>
              {isError && <Styled.ErrorMessage>필수 입력사항입니다.</Styled.ErrorMessage>}
            </Styled.FieldWrap>
          );
        }}
        name={`members.${index}.userCode`}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur } }) => {
          const value = field.roleName;
          const isError = isFieldBlurred.roleName && !value;
          return (
            <Styled.FieldWrap>
              <Styled.InputWrapper isError={isFieldBlurred.roleName && !value}>
                <Styled.Input
                  placeholder="역할"
                  required
                  onChange={onChange}
                  onBlur={() => {
                    onBlur();
                    onBlurRoleName();
                  }}
                  value={value ?? ''}
                />
              </Styled.InputWrapper>
              {isError && <Styled.ErrorMessage>필수 입력사항입니다.</Styled.ErrorMessage>}
            </Styled.FieldWrap>
          );
        }}
        name={`members.${index}.roleName`}
      />
      <Styled.TrashCanButton
        onClick={onDelete}
      >
        <TrashIcon />
      </Styled.TrashCanButton>
    </Styled.Row>
  );
}

export default ShowCastInfoMemberRow

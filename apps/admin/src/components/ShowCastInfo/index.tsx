import { useDialog } from '@boolti/ui';
import { useDrag, useDrop } from 'react-dnd'

import Styled from './ShowCastInfo.styles';
import { EditIcon, ChevronDownIcon, ChevronUpIcon, UserIcon, MenuIcon } from '@boolti/icon';
import { useRef, useState } from 'react';
import ShowCastInfoFormDialogContent, {
  TempShowCastInfoFormInput,
} from '../ShowCastInfoFormDialogContent';

interface Props {
  showCastInfo: TempShowCastInfoFormInput;
  index: number;
  onSave: (value: TempShowCastInfoFormInput) => Promise<void>;
  onDropHover: (draggedItemId: number, hoverIndex: number) => void;
  onDrop?: () => void;
  onDelete?: () => Promise<void>;
}

interface DragItem {
  id: number
  index: number
}

const ShowCastInfo = ({ showCastInfo, index, onSave, onDropHover, onDrop, onDelete }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag, preview] = useDrag<DragItem, unknown, { isDragging: boolean }>(() => ({
    type: 'castTeam',
    previewOptions: {
      captureDraggingState: true,
    },
    item: { id: showCastInfo.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  }))
  const [, drop] = useDrop<DragItem>({
    accept: 'castTeam',
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      if (!monitor.canDrop()) return;
      if (item.id === showCastInfo.id) return;

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

  const { members = [] } = showCastInfo;
  const memberLength = members.length ?? 0;
  const dialog = useDialog();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  preview(drop(ref))

  return (
    <Styled.Container ref={ref} style={{ opacity: isDragging ? 0.4 : 1 }}>
      <Styled.Header>
        <Styled.HeaderNameWrapper>
          <Styled.Handle ref={drag}>
            <MenuIcon />
          </Styled.Handle>
          <Styled.Name>
            {showCastInfo.name}
          </Styled.Name>
        </Styled.HeaderNameWrapper>
        <Styled.EditButton
          colorTheme="line"
          size="bold"
          onClick={(e) => {
            e.preventDefault();
            dialog.open({
              title: '출연진 정보 편집',
              isAuto: true,
              content: (
                <ShowCastInfoFormDialogContent
                  onSave={async (castInfo) => {
                    try {
                      await onSave(castInfo);
                      dialog.close();
                    } catch {
                      return new Promise((_, reject) => reject('저장 중 오류가 발생하였습니다.'));
                    }
                  }}
                  prevShowCastInfo={showCastInfo}
                  onDelete={async () => {
                    try {
                      await onDelete?.();
                      dialog.close();
                    } catch {
                      return new Promise((_, reject) => reject('삭제 중 오류가 발생하였습니다.'));
                    }
                  }}
                />
              ),
            });
          }}
        >
          <EditIcon />
          <span>정보 편집</span>
        </Styled.EditButton>
      </Styled.Header>
      {memberLength > 0 && (
        <>
          <Styled.Cast
            animate={{ transition: { type: 'tween' }, height: isOpen ? 'auto' : 0 }}
            transition={{ duration: 0.4 }}
            initial={{ height: 0, opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
          >
            {members.map((member) => (
              <Styled.CastItem key={member.id}>
                {member.userImgPath ? (
                  <Styled.UserImage
                    style={{ '--imgPath': `url(${member.userImgPath})` } as React.CSSProperties}
                  />
                ) : (
                  <UserIcon size={32} />
                )}
                <Styled.Username>{member.userNickname}</Styled.Username>
                <Styled.Rolename>({member.roleName})</Styled.Rolename>
              </Styled.CastItem>
            ))}
          </Styled.Cast>
          <Styled.CollapseButton
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
          >
            {isOpen ? '팀원 리스트 접기' : '팀원 리스트 펼쳐보기'}
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Styled.CollapseButton>
        </>
      )}
    </Styled.Container >
  );
};

export default ShowCastInfo;

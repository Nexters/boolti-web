import { TextButton, useDialog } from '@boolti/ui';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import Styled from './ShowCastInfo.styles';
import { EditIcon, ChevronDownIcon, ChevronUpIcon, UserIcon, MenuIcon } from '@boolti/icon';
import { useState } from 'react';
import ShowCastInfoFormDialogContent, {
  TempShowCastInfoFormInput,
} from '../ShowCastInfoFormDialogContent';
import { useIsMobile } from '~/hooks/useIsMobile';

interface Props {
  showCastInfo: TempShowCastInfoFormInput;
  onSave: (value: TempShowCastInfoFormInput) => Promise<void>;
  onDelete?: () => Promise<void>;
}

const ShowCastInfo = ({ showCastInfo, onSave, onDelete }: Props) => {
  const { members = [] } = showCastInfo;
  const memberLength = members.length ?? 0;
  const dialog = useDialog();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: showCastInfo.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundColor: isDragging ? 'rgba(231, 234, 242, 0.5)' : undefined,
    backdropFilter: isDragging ? 'blur(3px)' : undefined,
    zIndex: isDragging ? 100 : 99,
    cursor: isDragging ? 'grabbing' : undefined,
  };

  const toggle = () => setIsOpen((prev) => !prev);

  const onClickEdit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
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
  };

  return (
    <Styled.Container ref={setNodeRef} style={style}>
      <Styled.Header>
        <Styled.HeaderNameWrapper>
          {!isMobile && (
            <Styled.Handle type="button" {...attributes} {...listeners}>
              <MenuIcon />
            </Styled.Handle>
          )}
          <Styled.Name>{showCastInfo.name}</Styled.Name>
        </Styled.HeaderNameWrapper>
        <Styled.EditButtonWrapper>
          {isMobile ? (
            <Styled.MobileEditButton type="button" onClick={onClickEdit}>
              <EditIcon />
            </Styled.MobileEditButton>
          ) : (
            <TextButton type="button" colorTheme="netural" size="regular" onClick={onClickEdit}>
              <EditIcon />
              <span>정보 편집</span>
            </TextButton>
          )}
        </Styled.EditButtonWrapper>
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
            type="button"
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
    </Styled.Container>
  );
};

export default ShowCastInfo;

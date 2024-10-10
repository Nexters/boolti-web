import { useDialog } from '@boolti/ui';

import Styled from './ShowCastInfo.styles';
import { EditIcon, ChevronDownIcon, ChevronUpIcon } from '@boolti/icon';
import { useState } from 'react';
import ShowCastInfoFormDialogContent, {
  TempShowCastInfoFormInput,
} from '../ShowCastInfoFormDialogContent';

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

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <Styled.Container>
      <Styled.Header>
        {showCastInfo.name}
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
          편집하기
        </Styled.EditButton>
      </Styled.Header>
      <Styled.Cast
        animate={{ transition: { type: 'tween' }, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.4 }}
        initial={{ height: 0, opacity: 1 }}
        exit={{ height: 0, opacity: 1 }}
      >
        {members.map((member) => (
          <Styled.CastItem key={member.id}>
            <Styled.UserImage
              style={{ '--imgPath': `url(${member.userImgPath})` } as React.CSSProperties}
            />
            <Styled.Username>{member.userNickname}</Styled.Username>
            <Styled.Rolename>({member.roleName})</Styled.Rolename>
          </Styled.CastItem>
        ))}
      </Styled.Cast>
      {memberLength > 0 && (
        <Styled.CollapseButton
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          {isOpen ? '팀원 리스트 접기' : '팀원 리스트 펼쳐보기'}
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Styled.CollapseButton>
      )}
    </Styled.Container>
  );
};

export default ShowCastInfo;

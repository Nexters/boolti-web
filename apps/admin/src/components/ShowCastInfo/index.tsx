import { useDialog } from '@boolti/ui';
import { ShowCastInfoFormInput } from '../ShowCastInfoFormDialogContent/types';
import Styled from './ShowCastInfo.styles';
import { EditIcon, ChevronDownIcon, ChevronUpIcon } from '@boolti/icon';
import { useState } from 'react';
import ShowCastInfoFormDialogContent from '../ShowCastInfoFormDialogContent';

interface Props {
  showCastInfo: ShowCastInfoFormInput;
  setValue: (value: ShowCastInfoFormInput) => void;
  deleteCastInfo: VoidFunction;
}

const ShowCastInfo = ({ showCastInfo, setValue, deleteCastInfo }: Props) => {
  const memberLength = showCastInfo.members?.length ?? 0;
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
                  setValue={(castInfo) => {
                    setValue(castInfo);
                    dialog.close();
                  }}
                  prevShowCastInfo={showCastInfo}
                  deleteCastInfo={() => {
                    deleteCastInfo();
                    dialog.close();
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
        {showCastInfo.members?.map((member) => (
          <Styled.CastItem key={member.id}>
            <Styled.UserImage
              style={{ '--imgPath': `url(${member.imgPath})` } as React.CSSProperties}
            />
            <Styled.Username>{member.nickname}</Styled.Username>
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

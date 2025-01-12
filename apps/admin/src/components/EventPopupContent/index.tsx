import { Checkbox } from '@boolti/ui';
import Styled from './EventPopupContent.styles';
import { useState } from 'react';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { useNavigate } from 'react-router-dom';

interface HomePopupContentProps {
  imagePath: string;
  detailPath: string | null;
  onClose: () => void;
}
const EventPopupContent = ({ imagePath, detailPath, onClose }: HomePopupContentProps) => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  useBodyScrollLock();

  const onChange = () => {
    setChecked((checked) => !checked);
  };

  const closeDialog = () => {
    if (checked) {
      // TODO: 쿠키 설정
    }
    onClose();
  };

  const onClickImage = () => {
    if (!detailPath) {
      return;
    }
    navigate(detailPath);
    onClose();
  };

  return (
    <Styled.HomePopupContent>
      <Styled.PopupImage src={imagePath} onClick={onClickImage} hasDetail={!!detailPath} />
      <Styled.PopupFooter>
        <Styled.CheckLabel>
          <Checkbox variant="main" checked={checked} onChange={onChange} />
          오늘 하루 그만보기
        </Styled.CheckLabel>
        <Styled.CloseButton onClick={closeDialog}>닫기</Styled.CloseButton>
      </Styled.PopupFooter>
    </Styled.HomePopupContent>
  );
};

export default EventPopupContent;

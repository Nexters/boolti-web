import { useState } from 'react';
import { Button } from '@boolti/ui';
import Styled from './DeleteShowConfirm.styles';

interface DeleteShowConfirmProps {
  showName: string;
  onConfirm: () => void;
}

const DeleteShowConfirm = ({ showName, onConfirm }: DeleteShowConfirmProps) => {
  const [inputValue, setInputValue] = useState('');

  const isConfirmEnabled = inputValue === showName;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isConfirmEnabled) {
      onConfirm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Styled.Container>
        <Styled.Description>공연을 삭제하시려면 정확한 공연명을 입력해 주세요.</Styled.Description>
        <Styled.Warning>* 삭제 시 작성했던 공연 정보는 전부 사라지며 복구할 수 없어요.</Styled.Warning>
        <Styled.Input
          type="text"
          placeholder="공연명을 입력해 주세요"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Styled.ButtonContainer>
          <Button
            type="submit"
            colorTheme="primary"
            size="medium"
            disabled={!isConfirmEnabled}
          >
            삭제하기
          </Button>
        </Styled.ButtonContainer>
      </Styled.Container>
    </form>
  );
};

export default DeleteShowConfirm;

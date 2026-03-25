import { useState } from 'react';
import { Button } from '@boolti/ui';
import Styled from './ShowNameConfirm.styles';

interface ShowNameConfirmProps {
  showName: string;
  description: string;
  warning: string;
  confirmText: string;
  onConfirm: () => void;
}

const ShowNameConfirm = ({
  showName,
  description,
  warning,
  confirmText,
  onConfirm,
}: ShowNameConfirmProps) => {
  const [inputValue, setInputValue] = useState('');
  const [hasAttempted, setHasAttempted] = useState(false);

  const isConfirmEnabled = inputValue === showName;
  const showError = hasAttempted && inputValue.length > 0 && !isConfirmEnabled;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttempted(true);
    if (isConfirmEnabled) {
      onConfirm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Styled.Container>
        <Styled.Description>{description}</Styled.Description>
        <Styled.Warning>{warning}</Styled.Warning>
        <Styled.Input
          type="text"
          placeholder="공연명을 입력해 주세요"
          value={inputValue}
          onChange={handleInputChange}
          hasError={showError}
        />
        {showError && <Styled.ErrorText>공연명이 일치하지 않습니다.</Styled.ErrorText>}
        <Styled.ButtonContainer>
          <Button
            type="submit"
            colorTheme="primary"
            size="medium"
            disabled={!isConfirmEnabled}
          >
            {confirmText}
          </Button>
        </Styled.ButtonContainer>
      </Styled.Container>
    </form>
  );
};

export default ShowNameConfirm;

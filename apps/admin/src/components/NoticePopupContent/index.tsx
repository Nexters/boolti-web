import { CloseIcon } from '@boolti/icon';
import Styled from './NoticePopupContent.styles';
import { useMemo } from 'react';

interface NoticePopupContentProps {
  title: string;
  description: string;
  onClose: () => void;
}

const NoticePopupContent = ({ title, description, onClose }: NoticePopupContentProps) => {
  const dividedDescription = useMemo(() => {
    const regex = /`([^`]*)`|([^`]+)/g;
    let match;
    const result: { emphasized: string[]; normal: string[] } = {
      emphasized: [],
      normal: [],
    };

    while ((match = regex.exec(description)) !== null) {
      if (match[1] !== undefined) {
        result.emphasized.push(match[1]);
      } else if (match[2] !== undefined) {
        result.normal.push(match[2].trim());
      }
    }

    return result;
  }, [description]);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.CloseButton onClick={onClose}>
          <CloseIcon />
        </Styled.CloseButton>
      </Styled.Header>
      <Styled.Title>{title}</Styled.Title>
      {dividedDescription.emphasized.length ? (
        <Styled.Emphasized>{dividedDescription.emphasized}</Styled.Emphasized>
      ) : null}
      <Styled.Description>{dividedDescription.normal}</Styled.Description>
      <Styled.ConfirmButton colorTheme="primary" size="medium" onClick={onClose}>
        확인
      </Styled.ConfirmButton>
    </Styled.Container>
  );
};

export default NoticePopupContent;

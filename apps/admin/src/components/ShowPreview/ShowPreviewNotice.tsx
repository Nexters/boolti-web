import { ArrowLeftIcon } from '@boolti/icon';
import React from 'react';

import Styled from './ShowPreviewNotice.styles';

interface ShowPreviewNoticeProps {
  notice: string;
  onClickBackButton: () => void;
}

const ShowPreviewNotice = ({ notice, onClickBackButton }: ShowPreviewNoticeProps) => {
  return (
    <Styled.ShowPreviewNotice>
      <Styled.ShowPreviewNoticeHeader>
        <Styled.ShowPreviewNoticeNav>
          <Styled.BackButton type="button" onClick={onClickBackButton}>
            <ArrowLeftIcon />
          </Styled.BackButton>
          <Styled.ShowPreviewNoticeTitle>공연 내용</Styled.ShowPreviewNoticeTitle>
        </Styled.ShowPreviewNoticeNav>
      </Styled.ShowPreviewNoticeHeader>
      <Styled.ShowPreviewNoticeText>
        {notice.split('\n').map((text, index) => (
          <React.Fragment key={`${text}_${index}`}>
            {text}
            <br />
          </React.Fragment>
        ))}
      </Styled.ShowPreviewNoticeText>
    </Styled.ShowPreviewNotice>
  );
};

export default ShowPreviewNotice;

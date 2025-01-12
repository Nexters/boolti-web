import styled from '@emotion/styled';
import { mq_lg } from '@boolti/ui';

interface PopupImageProps {
  hasDetail: boolean;
}

const HomePopupContent = styled.div`
  margin: 0 -24px;
  ${mq_lg} {
    margin: 0;
    width: 500px;
  }
`;

const PopupImage = styled.img<PopupImageProps>`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: ${({ hasDetail }) => (hasDetail ? 'pointer' : 'default')};

  ${mq_lg} {
    width: 500px;
    height: 578px;
  }
`;

const PopupFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  color: ${({ theme }) => theme.palette.grey.g60};
  cursor: pointer;
`;

const CloseButton = styled.button`
  padding: 16px 20px;
  color: ${({ theme }) => theme.palette.grey.g100};
  cursor: pointer;
`;

export default {
  HomePopupContent,
  CheckLabel,
  PopupImage,
  PopupFooter,
  CloseButton,
};

import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  height: 100vh;
  padding: 40px 0 60px 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  ${mq} {
    padding: 0;
    height: 60vh;
  }
`;

const MobileHeader = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.palette.grey.w};
  top: 0;
  left: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  height: 52px;
  width: 100vw;
  padding: 14px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g10};

  ${mq} {
    display: none;
  }
`;

const MobileHeaderText = styled.p`
  white-space: nowrap;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

const Title = styled.h2`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 2px;
`;

const Description = styled.h2`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  white-space: pre-wrap;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-block-size: unset;
`;

const Seperator = styled.hr`
  padding: 30px 0;
`;

export default {
  Container,
  Description,
  Title,
  Image,
  Seperator,
  MobileHeader,
  CloseButton,
  MobileHeaderText,
};

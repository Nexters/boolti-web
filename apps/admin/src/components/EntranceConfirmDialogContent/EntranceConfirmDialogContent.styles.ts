import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  padding: 40px 0 60px 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  ${mq_lg} {
    padding: 0;
    width: auto;
    height: 60vh;
  }
`;

const MobileHeader = styled.div`
  position: fixed;
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

  ${mq_lg} {
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
  cursor: pointer;
`;

const Title = styled.h2`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin: 52px 0 2px;
  ${mq_lg} {
    margin-top: 0;
  }
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

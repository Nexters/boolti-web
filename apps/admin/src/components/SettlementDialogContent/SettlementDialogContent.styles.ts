import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  min-width: 320px;
  width: 100%;
  border-radius: 12px 12px 0 0;
  background-color: ${({ theme }) => theme.palette.grey.w};
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  ${mq_lg} {
    border-radius: none;
    position: static;
    transform: none;
    width: auto;
  }
`;

const Form = styled.form`
  position: relative;
  padding: 0 24px;

  ${mq_lg} {
    padding: 0;
    margin: 0;
  }
`;

const MobileTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 8px 0;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};
  ${mq_lg} {
    display: none;
  }
`;

const MobileCloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Title = styled.h2`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
  margin-bottom: 20px;

  ${mq_lg} {
    ${({ theme }) => theme.typo.b3};
    margin-bottom: 28px;
  }
`;

const BankList = styled.ul`
  height: 368px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  ${mq_lg} {
    gap: 12px;
    height: 290px;
  }
`;

const BankItem = styled.li`
  min-width: 86px;
`;

const BankItemButton = styled.button<{ isSelected?: boolean; isUndefined?: boolean }>`
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 4px;
  border-width: 1px;
  border-style: solid;
  padding: 8px 16px;
  transition:
    border 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  background-color: ${({ theme }) => theme.palette.grey.g00};
  border-color: ${({ theme }) => theme.palette.grey.g00};
  ${({ isSelected, isUndefined, theme }) => {
    if (isUndefined) {
      return ``;
    }
    if (isSelected) {
      return `
        border-color: ${theme.palette.primary.o1};
      `;
    }
    return `
      opacity: 0.4;
    `;
  }}
  ${mq_lg} {
    padding: 8px 20px;
  }
`;

const BankIcon = styled.div`
  & > svg {
    width: 32px;
    height: 32px;
  }
`;

const BankName = styled.span`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g90};
  ${mq_lg} {
    ${({ theme }) => theme.typo.b1};
  }
`;

const ButtonContainer = styled.div`
  display: none;

  ${mq_lg} {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-top: 32px;
    & > button {
      margin-left: 8px;
    }
  }
`;

const MobileButtonContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  padding: 16px 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 13.07%);
  bottom: 0;
  left: 0;
  & > button {
    &:last-of-type {
      flex: 1;
    }
    &:nth-of-type(2) {
      flex: 2;
      margin-left: 8px;
    }
  }
  ${mq_lg} {
    display: none;
  }
`;

const InputLabel = styled.p`
  margin-bottom: 8px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const MobileBottomContainer = styled.div`
  padding-bottom: 92px;
  ${mq_lg} {
    padding-bottom: 0;
  }
`;

const InputContainer = styled.div`
  margin-bottom: 28px;

  & > .text-field {
    width: 100%;
  }
`;

const ConfirmContainer = styled.div`
  border-radius: 4px;
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

const ConfrimTextContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

const ConfirmTextLabel = styled.span`
  display: inline-block;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  width: 56px;
  margin-right: 20px;
`;

const ConfrimTextValue = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

export default {
  MobileButtonContainer,
  Container,
  ButtonContainer,
  Title,
  BankList,
  BankItem,
  BankName,
  BankIcon,
  BankItemButton,
  InputLabel,
  InputContainer,
  ConfirmContainer,
  ConfrimTextContainer,
  ConfirmTextLabel,
  ConfrimTextValue,
  MobileCloseButton,
  MobileBottomContainer,
  Form,
  MobileTitle,
};

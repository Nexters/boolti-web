import styled from '@emotion/styled';

const Container = styled.form``;

const Title = styled.h2`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g70};
  margin-bottom: 28px;
`;

const BankList = styled.ul`
  height: 290px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BankItem = styled.li`
  width: 120px;
  height: 74px;
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
  padding: 8px 20px;
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
`;

const BankIcon = styled.div`
  & > svg {
    width: 32px;
    height: 32px;
  }
`;

const BankName = styled.span`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 32px;
  & > button {
    margin-left: 8px;
  }
`;

const InputLabel = styled.p`
  margin-bottom: 8px;
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const InputContainer = styled.div`
  margin-bottom: 28px;
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
};

import { mq } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 0 20px;
  margin: 40px 0 68px;
`;

const Empty = styled.div`
  margin: 0 auto;
  width: 1080px;
  height: 770px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.typo.b4};
  color: ${({ theme }) => theme.palette.grey.g40};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px ${({ theme }) => theme.palette.shadow};
  ${mq} {
    flex-direction: row;
    align-items: center;
    padding: 20px 24px;
  }
`;

const InfoText = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};

  ${mq} {
    ${({ theme }) => theme.typo.sh2};
  }
`;

const QuestionTextButton = styled.button`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  text-decoration-line: underline;
  cursor: pointer;
  margin-top: 4px;
  ${mq} {
    ${({ theme }) => theme.typo.b2};
    margin-top: 0;
  }
`;

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
  margin-bottom: 32px;
  ${mq} {
    margin-bottom: 40px;
    display: flex;
  }
`;

const Summary = styled.div<{ colorTheme: 'grey' | 'red' }>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: start;
  padding: 16px 20px;
  border-radius: 8px;
  ${({ colorTheme, theme }) => {
    switch (colorTheme) {
      case 'grey':
        return `
          background-color: ${theme.palette.grey.g00};
          color: ${theme.palette.grey.g60};
          & > b {
            color: ${theme.palette.grey.g90};
          }
        `;
      case 'red':
        return `
          background-color: ${theme.palette.primary.o0};
          color: ${theme.palette.primary.o2};
        `;
    }
  }}
  ${mq} {
    flex-direction: row;
    width: 352px;
    align-items: center;
    &:not(:last-child) {
      margin-right: 12px;
    }
  }
`;

const SumamryLabel = styled.span`
  ${({ theme }) => theme.typo.b1};
  margin-bottom: 4px;
  ${mq} {
    margin-bottom: 0;
    ${({ theme }) => theme.typo.b2};
  }
`;

const SumamryValue = styled.b`
  ${({ theme }) => theme.typo.sh2};
`;

const EnteranceSummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 100%;
  ${mq} {
    width: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const FilterContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mq} {
    margin-top: 0;
    width: auto;
  }
`;

const SummaryButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EnteranceSummaryButton = styled.button<{ isSelected?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isSelected }) => (isSelected ? 'unset' : 'pointer')};
  ${({ theme, isSelected }) => (isSelected ? theme.typo.sh1 : theme.typo.b3)};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.grey.g90 : theme.palette.grey.g70};
  margin-right: 16px;
  padding: 8px 4px;
  &:last-of-type {
    margin-right: auto;
  }

  & > span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 6px;
    border-radius: 30px;
    margin-left: 4px;
    ${({ theme }) => theme.typo.c1};
    color: ${({ theme }) => theme.palette.grey.w};
    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.palette.grey.g90 : theme.palette.grey.g50};
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  display: flex;
  width: 262px;
  padding: 8px 72px 8px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 100px;
  margin-left: 8px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  background-color: ${({ theme }) => theme.palette.grey.w};
  ${({ theme }) => theme.typo.b2};
  color: ${({ theme }) => theme.palette.grey.g90};
  transition: border-color 0.2s ease-in-out;
  &:focus {
    border-color: ${({ theme }) => theme.palette.primary.o1};
  }
  &:placeholder-shown {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
`;

const InputButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default {
  Container,
  InfoContainer,
  InfoText,
  QuestionTextButton,
  SummaryContainer,
  Summary,
  SumamryLabel,
  SumamryValue,
  EnteranceSummaryContainer,
  EnteranceSummaryButton,
  InputContainer,
  Input,
  InputButton,
  ButtonContainer,
  FilterContainer,
  SummaryButtonContainer,
  Empty,
  TableContainer,
};

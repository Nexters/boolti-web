import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
`;

const TicketFilterButton = styled.button<{ isActive?: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme, isActive }) => (isActive ? theme.palette.primary.o1 : theme.palette.grey.g90)};
  border-radius: 4px;
  ${({ theme }) => theme.typo.b3};
  padding: 9px 16px;

  & > svg {
    margin-right: 8px;
  }

  ${({ isActive, theme }) =>
    !isActive
      ? `
    &:hover {
      color: ${theme.palette.grey.g70};
      background-color: ${theme.palette.mobile.grey.g10};
    }
  `
      : ''}
`;

const TicketOptions = styled.div`
  position: absolute;
  white-space: nowrap;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  box-shadow: 0px 8px 14px 0px rgba(172, 171, 171, 0.13);
  left: 0;
  margin-top: 4px;
  padding: 16px 20px;
  ${mq_lg} {
    left: unset;
    right: 0;
  }
`;

const TicketOptionTitle = styled.div`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const OptionList = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
`;

const OptionItem = styled.button`
  cursor: pointer;
  padding: 8px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g90};

  & > svg {
    margin-right: 8px;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  & > button {
    flex: 1 0 auto;

    &:first-of-type {
      margin-right: 36px;
    }
  }
`;

export default {
  Container,
  TicketFilterButton,
  TicketOptions,
  TicketOptionTitle,
  OptionList,
  OptionItem,
  ButtonWrap,
};

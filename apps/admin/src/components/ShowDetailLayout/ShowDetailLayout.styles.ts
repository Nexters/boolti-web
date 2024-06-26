import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

interface TabItemProps {
  active?: boolean;
}

interface ShowNameProps {
  size: 'small' | 'big';
}

const HeaderLeft = styled.div`
  display: inline-flex;
  align-items: center;
`;

const BackButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;

const HeaderText = styled.span`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-left: 8px;
`;

const TopObserver = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: red;
`;

const HeaderObserver = styled.div`
  position: absolute;
  top: calc(-197px + 64px - 40px);
  left: 0;
  width: 100%;
  height: 1px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  left: 0;
`;

const ShowName = styled.h2<ShowNameProps>`
  ${({ theme }) => theme.typo.h1};
  margin: 12px 0 8px;
  padding: 0 20px;
  transition:
    font-size 0.1s ease-in-out,
    margin 0.1s ease-in-out;

  ${mq_lg} {
    padding: 0;
    ${({ theme, size }) => (size === 'small' ? theme.typo.h1 : theme.typo.h3)};
    margin: ${({ size }) => (size === 'small' ? '22px 0 8px' : '28px 0 12px')};
  }
`;

const TabContainer = styled.div`
  padding: 0 20px;
  white-space: nowrap;
  overflow-x: auto;
  display: flex;
  flex-wrap: nowrap;

  ${mq_lg} {
    padding: 0;
  }
`;

const Tab = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;

  ${mq_lg} {
    gap: 40px;
  }
`;

const TabItem = styled.div<TabItemProps>`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  ${({ active }) => active && `font-weight: 600;`};
  cursor: pointer;

  &::after {
    content: '';
    display: ${({ active }) => (active ? 'block' : 'none')};
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.palette.primary.o1};
    position: absolute;
    bottom: 0;
  }

  .tooltip {
    display: none;
  }

  ${mq_lg} {
    .tooltip {
      display: initial;
    }

    height: 52px;
  }
`;

export default {
  HeaderLeft,
  BackButton,
  HeaderText,
  TopObserver,
  HeaderObserver,
  HeaderContent,
  ShowName,
  TabContainer,
  Tab,
  TabItem,
};

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
  top: calc(-197px + 68px - 40px);
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
  ${({ theme, size }) => (size === 'small' ? theme.typo.h1 : theme.typo.h3)};
  margin: ${({ size }) => (size === 'small' ? '22px 0 8px' : '28px 0 12px')};
  transition:
    font-size 0.1s ease-in-out,
    margin 0.1s ease-in-out;
`;

const Tab = styled.div`
  display: flex;
  gap: 40px;
`;

const TabItem = styled.div<TabItemProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 16px;
  ${({ active, theme }) =>
    active && `border-bottom: 2px solid ${theme.palette.primary.o1}; font-weight: 600;`};
  cursor: pointer;
`;

export default {
  HeaderLeft,
  BackButton,
  HeaderText,
  TopObserver,
  HeaderObserver,
  HeaderContent,
  ShowName,
  Tab,
  TabItem,
};

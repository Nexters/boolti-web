import styled from '@emotion/styled';

interface TabItemProps {
  active?: boolean;
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

const HeaderContent = styled.div`
  position: sticky;
  top: 0;
  left: 0;
`;

const ShowName = styled.h2`
  ${({ theme }) => theme.typo.h3};
  margin-top: 28px;
  margin-bottom: 12px;
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
  HeaderContent,
  ShowName,
  Tab,
  TabItem,
};

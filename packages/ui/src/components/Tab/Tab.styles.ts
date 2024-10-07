import styled from '@emotion/styled';

const Tab = styled.div`
  display: flex;
  padding: 0 20px;
  margin: 40px 0;
`;

const TabButton = styled.button<{ isSelected: boolean }>`
  position: relative;
  flex: 1;
  padding: 13px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme, isSelected }) => theme.palette.mobile.grey[isSelected ? 'g10' : 'g70']};
  cursor: ${({ isSelected }) => (!isSelected ? 'pointer' : 'unset')};
  &::after {
    display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.palette.mobile.grey.g10};
  }
`;

export default {
  Tab,
  TabButton,
};

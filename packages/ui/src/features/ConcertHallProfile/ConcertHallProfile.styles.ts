import styled from '@emotion/styled';

const TabBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.mobile.grey.g85};
`;

const TabItem = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 13px 0;
  margin-bottom: -1px;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  color: ${({ theme, isActive }) =>
    isActive ? theme.palette.mobile.grey.g10 : theme.palette.mobile.grey.g70};
  border-bottom: 2px solid
    ${({ theme, isActive }) => (isActive ? theme.palette.mobile.grey.g10 : 'transparent')};
`;

export default {
  TabBar,
  TabItem,
};

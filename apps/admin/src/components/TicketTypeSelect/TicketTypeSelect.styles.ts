import styled from '@emotion/styled';

const MobileMenu = styled.div`
  padding-bottom: 8px;
`;

const Item = styled.button<{ isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 12px 0;
  ${({ theme, isSelected }) => (isSelected ? theme.typo.sh1 : theme.typo.b3)};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.palette.grey.g90 : theme.palette.grey.g70};
  cursor: pointer;
`;

export default {
  MobileMenu,
  Item,
};

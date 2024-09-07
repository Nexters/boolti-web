import { mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';

const DropdownContainer = styled.div`
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  user-select: none;
`;

const UserProfileImageWrapper = styled.div`
  width: 28px;
  height: 28px;
  margin-right: 6px;

  ${mq_lg} {
    width: 36px;
    height: 36px;
  }
`;

const UserProfileIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserProfileImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DropdownMenuWrapper = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  width: 112px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px #8b8b8b26;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 1;
`;

const DropdownMenuItemButton = styled.button`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g70};
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey.g10};
  }

  svg {
    color: ${({ theme }) => theme.palette.grey.g70};
  }
`;

export default {
  UserProfileIconWrapper,
  DropdownContainer,
  UserProfileImageWrapper,
  UserProfileImage,
  DropdownMenuWrapper,
  DropdownMenuItemButton,
};

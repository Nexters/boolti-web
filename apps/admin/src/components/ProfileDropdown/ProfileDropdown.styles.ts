import styled from '@emotion/styled';

const DropdownContainer = styled.div`
  width: 66px;
  height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const UserProfileImageWrapper = styled.div`
  width: 36px;
  height: 36px;
  border: 1px solid transparent;
  border-radius: 50%;
  margin-right: 6px;
`;

const UserProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

const DropdownMenuWrapper = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  width: 96px;
  height: 48px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px #8b8b8b26;
  border-radius: 4px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default {
  DropdownContainer,
  UserProfileImageWrapper,
  UserProfileImage,
  DropdownMenuWrapper,
};

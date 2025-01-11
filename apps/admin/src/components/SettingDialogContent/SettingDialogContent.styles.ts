import { mq_lg } from '@boolti/ui';
import { UserProfile as DefaultUserProfileIcon } from '@boolti/icon';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface SettingMenuItemButtonProps {
  active?: boolean;
}

interface LabelProps {
  required?: boolean;
}

interface TextAreaProps {
  hasError?: boolean;
}

const SettingDialogContent = styled.div`
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;

  ${mq_lg} {
    flex-direction: row;
    width: 600px;
    height: 542px;
    padding-bottom: 0;
  }
`;

const SettingMenuWrapper = styled.aside`
  display: flex;
  margin: 16px 0;

  ${mq_lg} {
    flex-basis: 150px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid ${({ theme }) => theme.palette.grey.g30};
    padding: 24px 20px 28px;
    margin: 0;
  }
`;

const SettingMenu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex: 1;

  ${mq_lg} {
    flex-direction: column;
  }
`;

const SettingMenuItemButton = styled.button<SettingMenuItemButtonProps>`
  ${({ theme, active }) =>
    active
      ? css`
          ${theme.typo.sh1};
          background-color: ${theme.palette.grey.g10};
          color: ${theme.palette.grey.g90};
        `
      : css`
          ${theme.typo.b3};
          background-color: ${theme.palette.grey.w};
          color: ${theme.palette.grey.g70};
        `}
  height: 40px;
  padding: 0 12px;
  border-radius: 4px;
  cursor: pointer;
  flex: 1;
  text-align: center;

  &:hover {
    ${({ theme }) => theme.typo.sh1};
    background-color: ${({ theme }) => theme.palette.grey.g10};
    color: ${({ theme }) => theme.palette.grey.g90};
  }

  ${mq_lg} {
    flex: initial;
    text-align: left;
  }
`;

const SettingMenuBottomLogo = styled.div`
  display: none;

  ${mq_lg} {
    display: flex;
    justify-content: center;
  }
`;

const SettingContent = styled.div`
  flex: 1;
  padding: 16px 0;
  min-width: 0;
  overflow-y: auto;

  ${mq_lg} {
    padding: 24px 32px;
  }
`;

const SettingContentHeader = styled.div`
  display: none;
  margin-bottom: 24px;

  ${mq_lg} {
    display: flex;
    justify-content: space-between;
  }
`;

const SettingContentTitle = styled.h3`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  display: none;

  ${mq_lg} {
    display: block;
  }
`;

const SettingContentSubmitWrapper = styled.div`
  display: none;

  ${mq_lg} {
    display: block;
  }
`;

const SettingContentSubmitWrapperMobile = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.palette.grey.w};

  button {
    width: calc(100% - 24px - 24px);
  }

  ${mq_lg} {
    display: none;
  }
`;

const SettingContentForm = styled.form``;

const SettingContentFormControl = styled.div`
  margin-bottom: 24px;

  & > div {
    width: 100%;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;

  & > svg {
    width: 100px;
    height: 100px;
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  object-fit: cover;
`;

const DefaultProfileImage = styled(DefaultUserProfileIcon)`
  border-radius: 100px;
`;

const ProfileImageEditButton = styled.label`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g10};
  background-color: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0 4px 4px 0 ${({ theme }) => theme.palette.shadow};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: calc(100px - 42px + 8px);
  cursor: pointer;
`;

const Label = styled.label<LabelProps>`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;
  display: flex;
  position: relative;

  &::after {
    content: ${({ required }) => (required ? "'*'" : 'none')};
    color: ${({ theme }) => theme.palette.status.error1};
    ${({ theme }) => theme.typo.b1};
    line-height: 22px;
    margin-left: 2px;
  }
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
`;

const LinkItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  height: 56px;
`;

const LinkInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const LinkTitle = styled.p`
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const LinkDescription = styled.p`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g50};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const LinkEditButton = styled.button`
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ConnectedServiceList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
  flex-wrap: wrap;

  div {
    width: auto;
  }
`;

const ConnectedServiceChip = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-radius: 100px;
  padding-top: 6px;
  padding-right: 12px;
  padding-bottom: 6px;
  padding-left: 6px;
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.b3};
`;

const Divider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  margin: 24px 0;
`;

const SettingSubtitle = styled.h4`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 4px;
`;

const SettingDescriptionList = styled.ul`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  list-style: disc;
  padding-left: 16px;
  margin-bottom: 12px;
`;

const SettingDescriptionItem = styled.li``;

const TextAreaWrapper = styled.div`
  position: relative;
  height: 122px;
`;

const TextAreaBox = styled.div<TextAreaProps>`
  border: 1px solid
    ${({ theme, hasError }) =>
    hasError ? `${theme.palette.status.error1} !important` : theme.palette.grey.g20};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  textarea:placeholder-shown + & {
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  }

  textarea:focus + & {
    border: 1px solid ${({ theme }) => theme.palette.grey.g90};
  }

  textarea:disabled + & {
    border: 1px solid ${({ theme }) => theme.palette.grey.g20};
    background: ${({ theme }) => theme.palette.grey.g10};
  }
`;

const TextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 12px - 12px);
  height: 72px;
  margin: 12px 12px 38px;
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.b3};
  line-height: 24px;
  z-index: 2;
  word-break: break-all;

  &:placeholder-shown {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

const TextAreaCount = styled.span`
  ${({ theme }) => theme.typo.c1};
  color: ${({ theme }) => theme.palette.grey.g30};
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 3;
`;

export default {
  SettingDialogContent,
  SettingMenuWrapper,
  SettingMenu,
  SettingMenuItemButton,
  SettingMenuBottomLogo,
  SettingContent,
  SettingContentHeader,
  SettingContentTitle,
  SettingContentSubmitWrapper,
  SettingContentSubmitWrapperMobile,
  SettingContentForm,
  SettingContentFormControl,
  ProfileImageWrapper,
  ProfileImage,
  DefaultProfileImage,
  ProfileImageEditButton,
  Label,
  LinkList,
  LinkItem,
  LinkInfo,
  LinkTitle,
  LinkDescription,
  LinkEditButton,
  ConnectedServiceList,
  ConnectedServiceChip,
  Divider,
  SettingSubtitle,
  SettingDescriptionList,
  SettingDescriptionItem,
  TextAreaWrapper,
  TextAreaBox,
  TextArea,
  TextAreaCount,
};

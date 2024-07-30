import { mq_lg } from '@boolti/ui';
import { css } from '@emotion/react';
import styled from '@emotion/styled'

interface SettingMenuItemButtonProps {
  active?: boolean;
}

const SettingDialogContent = styled.div`
  height: calc(100vh - 48px);
  display: flex;

  ${mq_lg} {
    width: 600px;
    height: 542px;
  }
`

const SettingMenuWrapper = styled.aside`
  width: 150px;
  flex-shrink: 0;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid ${({ theme }) => theme.palette.grey.g30};
  padding: 24px 20px 28px;

  ${mq_lg} {
    display: flex;
  }
`

const SettingMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const SettingMenuItemButton = styled.button<SettingMenuItemButtonProps>`
  ${({ theme, active }) => active ? css`
    ${theme.typo.sh1};
    background-color: ${theme.palette.grey.g10};
    color: ${theme.palette.grey.g90};
  ` : css`
    ${theme.typo.b3};
    background-color: ${theme.palette.grey.w};
    color: ${theme.palette.grey.g70};
  `}
  height: 40px;
  padding: 0 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    ${({ theme }) => theme.typo.sh1};
    background-color: ${({ theme }) => theme.palette.grey.g10};
    color: ${({ theme }) => theme.palette.grey.g90};
  }
`

const SettingMenuBottomLogo = styled.div`
  display: flex;
  justify-content: center;
`

const SettingContent = styled.div`
  flex: 1;
  padding: 16px 0;

  ${mq_lg} {
    padding: 24px 32px;
  }
`

const SettingContentTitle = styled.h3`
  display: none;
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 24px;

  ${mq_lg} {
    display: block;
  }
`

const SettingContentFormControl = styled.div`
  margin-bottom: 24px;

  div {
    width: 100%;
  }
`

const Label = styled.label`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 8px;
  display: block;
`

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
`

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
`

const Divider = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.palette.grey.g20};
  margin: 24px 0;
`

const SettingSubtitle = styled.h4`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 4px;
`

const SettingDescriptionList = styled.ul`
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g60};
  list-style: disc;
  padding-left: 16px;
  margin-bottom: 12px;
`

const SettingDescriptionItem = styled.li``

export default {
  SettingDialogContent,
  SettingMenuWrapper,
  SettingMenu,
  SettingMenuItemButton,
  SettingMenuBottomLogo,
  SettingContent,
  SettingContentTitle,
  SettingContentFormControl,
  Label,
  ConnectedServiceList,
  ConnectedServiceChip,
  Divider,
  SettingSubtitle,
  SettingDescriptionList,
  SettingDescriptionItem,
}

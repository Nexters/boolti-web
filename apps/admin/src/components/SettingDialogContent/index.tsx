import { BooltiLightGrey } from '@boolti/icon';
import Styled from './SettingDialogContent.styles';
import { Button, TextField, useDialog } from '@boolti/ui';
import AccountDeleteForm from '../AccountDeleteForm';
import { useUserSummary } from '@boolti/api';
import { useTheme } from '@emotion/react';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';

const KakaoIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#FFE833" />
      <path
        d="M16.0476 8.15625C11.4238 8.15625 7.66699 11.1955 7.66699 14.921C7.66699 17.2739 9.20825 19.3327 11.4238 20.6072L10.8458 23.8425L14.41 21.4896C14.8916 21.5876 15.4696 21.5876 15.9513 21.5876C20.575 21.5876 24.3318 18.5484 24.3318 14.8229C24.4282 11.1955 20.6714 8.15625 16.0476 8.15625Z"
        fill="black"
      />
    </svg>
  );
};

const AppleIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#F6F7FF" />
      <path
        d="M20.7051 15.4836C20.6977 14.0907 21.3151 13.0394 22.5648 12.2651C21.8656 11.2442 20.8092 10.6825 19.4145 10.5724C18.094 10.4661 16.6509 11.358 16.1227 11.358C15.5648 11.358 14.2853 10.6103 13.2811 10.6103C11.2056 10.6445 9 12.2993 9 15.6657C9 16.6601 9.17853 17.6874 9.5356 18.7475C10.0117 20.1404 11.7301 23.5562 13.5228 23.4993C14.4601 23.4765 15.1222 22.8199 16.3422 22.8199C17.525 22.8199 18.1387 23.4993 19.1838 23.4993C20.9915 23.4727 22.5462 20.3681 23 18.9715C20.5749 17.8063 20.7051 15.5557 20.7051 15.4836ZM18.5999 9.25162C19.6153 8.02193 19.5223 6.90231 19.4926 6.5C18.5962 6.55313 17.5584 7.12243 16.9671 7.82457C16.3162 8.57605 15.9331 9.5059 16.0149 10.5534C16.9857 10.6293 17.8709 10.1207 18.5999 9.25162Z"
        fill="black"
      />
    </svg>
  );
};

interface SettingDialogContentProps {
  onDeleteAccount?: () => void;
}

const SettingDialogContent = ({ onDeleteAccount }: SettingDialogContentProps) => {
  const theme = useTheme();

  const accountDeleteDialog = useDialog();

  const { data: userSummary } = useUserSummary();

  useBodyScrollLock();

  return (
    <Styled.SettingDialogContent>
      <Styled.SettingMenuWrapper>
        <Styled.SettingMenu>
          <Styled.SettingMenuItemButton type="button" active>
            계정
          </Styled.SettingMenuItemButton>
        </Styled.SettingMenu>
        <Styled.SettingMenuBottomLogo>
          <BooltiLightGrey />
        </Styled.SettingMenuBottomLogo>
      </Styled.SettingMenuWrapper>
      <Styled.SettingContent>
        <Styled.SettingContentTitle>계정</Styled.SettingContentTitle>
        <Styled.SettingContentFormControl>
          <Styled.Label htmlFor="code">식별 코드</Styled.Label>
          <TextField
            inputType="text"
            size="big"
            id="code"
            width="100%"
            value={`#${userSummary?.userCode}`}
            onChange={(event) => {
              event.preventDefault();
            }}
            style={{ caretColor: 'transparent' }}
          />
        </Styled.SettingContentFormControl>
        <Styled.SettingContentFormControl>
          <Styled.Label htmlFor="code">연결 서비스</Styled.Label>
          <Styled.ConnectedServiceList>
            {userSummary?.oauthType === 'KAKAO' && (
              <Styled.ConnectedServiceChip>
                <KakaoIcon /> 카카오
              </Styled.ConnectedServiceChip>
            )}
            {userSummary?.oauthType === 'APPLE' && (
              <Styled.ConnectedServiceChip>
                <AppleIcon /> Apple
              </Styled.ConnectedServiceChip>
            )}
          </Styled.ConnectedServiceList>
        </Styled.SettingContentFormControl>
        <Styled.Divider />
        <Styled.SettingSubtitle>계정 삭제</Styled.SettingSubtitle>
        <Styled.SettingDescriptionList>
          <Styled.SettingDescriptionItem>
            주최한 공연 정보는 사라지지 않아요.
          </Styled.SettingDescriptionItem>
          <Styled.SettingDescriptionItem>
            예매한 티켓은 전부 사라지며 복구할 수 없어요.
          </Styled.SettingDescriptionItem>
          <Styled.SettingDescriptionItem>
            삭제일로 부터 30일 이내 재 로그인 시 삭제를 취소할 수 있어요.
          </Styled.SettingDescriptionItem>
        </Styled.SettingDescriptionList>
        <Button
          style={{ background: theme.palette.status.error }}
          colorTheme="primary"
          size="x-small"
          onClick={() => {
            accountDeleteDialog.open({
              content: (
                <AccountDeleteForm
                  oauthType={userSummary?.oauthType}
                  onClose={() => {
                    onDeleteAccount?.();
                    accountDeleteDialog.close();
                  }}
                />
              ),
              mobileType: 'centerPopup',
            });
          }}
        >
          삭제하기
        </Button>
      </Styled.SettingContent>
    </Styled.SettingDialogContent>
  );
};

export default SettingDialogContent;

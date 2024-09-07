import { BooltiLightGrey, EditIcon, PhotoIcon, PlusIcon } from '@boolti/icon';
import Styled from './SettingDialogContent.styles';
import { Button, TextButton, TextField, useDialog, useToast } from '@boolti/ui';
import AccountDeleteForm from '../AccountDeleteForm';
import { useEditUserProfile, useUploadProfileImage, useUserProfile } from '@boolti/api';
import { useTheme } from '@emotion/react';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import LinkFormDialogContent, { LinkFormInputs } from '../LinkFormDialogContent';

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

type ProfileFormInputs = {
  nickname: string;
  introduction: string;
}

interface SettingDialogContentProps {
  onDeleteAccount?: () => void;
}

type SettingMenuType = 'profile' | 'account';

const MAX_NICKNAME_LENGTH = 20;
const MAX_INTRODUCTION_LENGTH = 60;

const NICKNAME_ERROR_MESSAGE = {
  required: '1자 이상 입력해 주세요.',
  minLength: '1자 이상 입력해 주세요.',
  maxLength: `${MAX_NICKNAME_LENGTH}자 이내로 입력해 주세요.`,
}

const SettingDialogContent = ({ onDeleteAccount }: SettingDialogContentProps) => {
  const theme = useTheme();
  const accountDeleteDialog = useDialog();
  const linkDialog = useDialog();
  const toast = useToast();
  const [currentMenu, setCurrentMenu] = useState<SettingMenuType>('profile');

  const { data: userProfile, refetch: refetchUserProfile } = useUserProfile();
  const uploadProfileImageMutation = useUploadProfileImage();
  const editProfileMutation = useEditUserProfile();

  const { register, handleSubmit, setValue, watch, setError, clearErrors, formState } = useForm<ProfileFormInputs>();

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [links, setLinks] = useState<LinkFormInputs[]>([]);

  useBodyScrollLock();

  const profileImageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setProfileImageFile(files[0]);
    }
  }

  const submitHandler = async (data: ProfileFormInputs) => {
    if (editProfileMutation.isLoading) return;

    let nextProfileImageUrl = userProfile?.imgPath;

    if (profileImageFile) {
      const { url } = await uploadProfileImageMutation.mutateAsync(profileImageFile);

      nextProfileImageUrl = url;
    }

    try {
      await editProfileMutation.mutateAsync({
        nickname: data.nickname.trim(),
        introduction: data.introduction.trim(),
        profileImagePath: nextProfileImageUrl,
        link: links,
      });
    } catch (error) {
      toast.error('프로필 정보를 저장하는 중 문제가 발생했습니다.');
    }

    toast.success('프로필 정보를 저장했습니다.');
    await refetchUserProfile();

    setProfileImageFile(null);
    setProfileImagePreview(null);
  }

  useEffect(() => {
    if (!userProfile) return;

    setValue('nickname', userProfile.nickname);
    setValue('introduction', userProfile.introduction);

    setLinks(userProfile.link);
  }, [setValue, userProfile])

  useEffect(() => {
    if (!profileImageFile) return

    const url = URL.createObjectURL(profileImageFile)
    setProfileImagePreview(url)

    return () => URL.revokeObjectURL(url)
  }, [profileImageFile])

  return (
    <Styled.SettingDialogContent>
      <Styled.SettingMenuWrapper>
        <Styled.SettingMenu>
          <Styled.SettingMenuItemButton type="button" active={currentMenu === 'profile'} onClick={() => {
            setCurrentMenu('profile');
          }}>
            프로필
          </Styled.SettingMenuItemButton>
          <Styled.SettingMenuItemButton type="button" active={currentMenu === 'account'} onClick={() => {
            setCurrentMenu('account');
          }}>
            계정
          </Styled.SettingMenuItemButton>
        </Styled.SettingMenu>
        <Styled.SettingMenuBottomLogo>
          <BooltiLightGrey />
        </Styled.SettingMenuBottomLogo>
      </Styled.SettingMenuWrapper>
      {currentMenu === 'profile' && (
        <Styled.SettingContent>
          <Styled.SettingContentForm onSubmit={handleSubmit(submitHandler)}>
            <Styled.SettingContentHeader>
              <Styled.SettingContentTitle>프로필</Styled.SettingContentTitle>
              <Styled.SettingContentSubmitWrapper>
                <TextButton type="submit" size="small" colorTheme="primary">
                  저장하기
                </TextButton>
              </Styled.SettingContentSubmitWrapper>
            </Styled.SettingContentHeader>
            <Styled.SettingContentFormControl>
              {(profileImagePreview ?? userProfile?.imgPath) && (
                <Styled.ProfileImageWrapper>
                  <Styled.ProfileImage src={profileImagePreview ?? userProfile?.imgPath} alt="profile" />
                  <Styled.ProfileImageEditButton>
                    <PhotoIcon />
                    <input type="file" accept="image/*" style={{ width: 0, height: 0 }} onChange={profileImageChangeHandler} />
                  </Styled.ProfileImageEditButton>
                </Styled.ProfileImageWrapper>
              )}
            </Styled.SettingContentFormControl>
            <Styled.SettingContentFormControl>
              <Styled.Label htmlFor="nickname" required>닉네임</Styled.Label>
              <TextField
                inputType="text"
                size="big"
                id="nickname"
                width="100%"
                placeholder="닉네임을 입력해 주세요 (20자 이내)"
                errorMessage={formState.errors.nickname?.message}
                {...register('nickname', {
                  required: {
                    value: false,
                    message: NICKNAME_ERROR_MESSAGE.required,
                  },
                  onChange: (event) => {
                    // 문자열의 앞뒤 공백 입력 방지
                    if (event.target.value.at(-1) === ' ') {
                      event.target.value = event.target.value.trim();
                    }

                    if (event.target.value.at(0) === ' ') {
                      event.target.value = event.target.value.trim();
                      event.target.setSelectionRange(0, 0);
                    }

                    // 문자열이 0자일 때 에러 메시지 출력
                    if (event.target.value.trim().length === 0) {
                      setError('nickname', { type: 'minLength', message: NICKNAME_ERROR_MESSAGE.minLength });

                      return
                    }

                    // 문자열 20자 초과 시 에러 메시지 출력
                    if (event.target.value.trim().length > MAX_NICKNAME_LENGTH) {
                      setError('nickname', { type: 'maxLength', message: NICKNAME_ERROR_MESSAGE.maxLength });

                      return
                    }

                    // 이외의 경우에는 에러 메시지 미출력
                    clearErrors('nickname')
                  }
                })}
              />
            </Styled.SettingContentFormControl>
            <Styled.SettingContentFormControl>
              <Styled.Label htmlFor="introduction">소개</Styled.Label>
              <Styled.TextAreaWrapper>
                <Styled.TextArea
                  id="introduction"
                  rows={3}
                  placeholder="예) 재즈와 펑크락을 좋아해요"
                  maxLength={MAX_INTRODUCTION_LENGTH}
                  {...register('introduction', {
                    maxLength: MAX_INTRODUCTION_LENGTH, onChange(event) {
                      if (event.target.value.length > MAX_INTRODUCTION_LENGTH) {
                        event.target.value = event.target.value.slice(0, MAX_INTRODUCTION_LENGTH);
                      }

                      setValue('introduction', event.target.value);
                    },
                  })}
                />
                <Styled.TextAreaBox />
                <Styled.TextAreaCount>
                  {watch('introduction')?.length ?? 0}/{MAX_INTRODUCTION_LENGTH}자
                </Styled.TextAreaCount>
              </Styled.TextAreaWrapper>
            </Styled.SettingContentFormControl>
            <Styled.SettingContentFormControl>
              <Styled.Label>SNS 링크</Styled.Label>
              <Button size="regular" colorTheme="line" icon={<PlusIcon />} type="button" onClick={() => {
                linkDialog.open({
                  title: '링크 추가',
                  content: (
                    <LinkFormDialogContent
                      onSubmit={(data) => {
                        setLinks((prev) => [...prev, { title: data.title, link: data.link }]);
                        linkDialog.close();
                      }}
                    />
                  )
                })
              }}>
                링크 추가
              </Button>
              <Styled.LinkList>
                {links.map((link) => {
                  return (
                    <Styled.LinkItem key={`${link.title}_${link.link}`}>
                      <Styled.LinkInfo>
                        <Styled.LinkTitle>{link.title}</Styled.LinkTitle>
                        <Styled.LinkDescription>{link.link}</Styled.LinkDescription>
                      </Styled.LinkInfo>
                      <Styled.LinkEditButton type="button" onClick={() => {
                        linkDialog.open({
                          title: '링크 편집',
                          content: (
                            <LinkFormDialogContent
                              defaultValues={link}
                              onSubmit={(data) => {
                                setLinks((prev) => prev.map((item) => {
                                  if (item.title === link.title && item.link === link.link) {
                                    return { title: data.title, link: data.link };
                                  }

                                  return item;
                                }));
                                linkDialog.close();
                              }}
                              onDelete={() => {
                                setLinks((prev) => prev.filter((item) => item.title !== link.title && item.link !== link.link));
                                linkDialog.close();
                              }}
                            />
                          ),
                        })
                      }}>
                        <EditIcon />
                      </Styled.LinkEditButton>
                    </Styled.LinkItem>
                  );
                })}
              </Styled.LinkList>
            </Styled.SettingContentFormControl>
            <Styled.SettingContentSubmitWrapperMobile>
              <Button size="bold" colorTheme="primary" type="submit">저장하기</Button>
            </Styled.SettingContentSubmitWrapperMobile>
          </Styled.SettingContentForm>
        </Styled.SettingContent>
      )}
      {
        currentMenu === 'account' && (
          <Styled.SettingContent>
            <Styled.SettingContentHeader>
              <Styled.SettingContentTitle>계정</Styled.SettingContentTitle>
            </Styled.SettingContentHeader>
            <Styled.SettingContentFormControl>
              <Styled.Label htmlFor="code">식별 코드</Styled.Label>
              <TextField
                inputType="text"
                size="big"
                id="code"
                width="100%"
                value={`#${userProfile?.userCode}`}
                onChange={(event) => {
                  event.preventDefault();
                }}
                style={{ caretColor: 'transparent' }}
              />
            </Styled.SettingContentFormControl>
            <Styled.SettingContentFormControl>
              <Styled.Label htmlFor="code">연결 서비스</Styled.Label>
              <Styled.ConnectedServiceList>
                {userProfile?.oauthType === 'KAKAO' && (
                  <Styled.ConnectedServiceChip>
                    <KakaoIcon /> 카카오
                  </Styled.ConnectedServiceChip>
                )}
                {userProfile?.oauthType === 'APPLE' && (
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
                      oauthType={userProfile?.oauthType}
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
        )
      }

    </Styled.SettingDialogContent >
  );
};

export default SettingDialogContent;

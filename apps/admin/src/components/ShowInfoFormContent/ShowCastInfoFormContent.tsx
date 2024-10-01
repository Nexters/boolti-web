import { Button, TextField, useDialog } from '@boolti/ui';
import { Controller, useForm } from 'react-hook-form';
import Styled from './ShowInfoFormContent.styles';
import { PlusIcon } from '@boolti/icon';
import { useState } from 'react';

type ShowCastInfoFormInputs = {
  teamName: string;
}

const ShowCastInfoFormContent = () => {
  const dialog = useDialog();
  const { control, register } = useForm();

  const [hasBlurred, setHasBlurred] = useState<Record<keyof ShowCastInfoFormInputs, boolean>>({
    teamName: false,
  });

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormGroupHeader>
        <Styled.ShowInfoFormGroupInfo>
          <Styled.ShowInfoFormTitle>출연진 정보</Styled.ShowInfoFormTitle>
          <Styled.ShowInfoFormSubtitle>
            출연진 정보를 팀 단위로 등록해 주세요.<br />정보는 공연 등록 이후에도 <strong>수정 및 추가</strong>할 수 있어요.
          </Styled.ShowInfoFormSubtitle>
        </Styled.ShowInfoFormGroupInfo>
        <Button type="button" colorTheme="netural" size="bold" icon={<PlusIcon />} onClick={() => {
          dialog.open({
            title: '출연진 정보 등록',
            content: <>
              <Styled.ShowInfoFormRow>
                <Styled.ShowInfoFormContent>
                  <Styled.ShowInfoFormLabel required>공연명</Styled.ShowInfoFormLabel>
                  <Styled.TextField>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                          inputType="text"
                          size="big"
                          placeholder="공연명을 입력해 주세요 (띄어쓰기 포함 최대 40자)"
                          required
                          onChange={onChange}
                          onBlur={() => {
                            onBlur();
                            setHasBlurred((prev) => ({ ...prev, teamName: true }));
                          }}
                          value={value ?? ''}
                          errorMessage={hasBlurred.teamName && !value ? '필수 입력사항입니다.' : undefined}
                        />
                      )}
                      name="name"
                    />
                  </Styled.TextField>
                </Styled.ShowInfoFormContent>
              </Styled.ShowInfoFormRow>
            </>,
          });
        }}>
          등록하기
        </Button>
      </Styled.ShowInfoFormGroupHeader>
    </Styled.ShowInfoFormGroup>
  )
}

export default ShowCastInfoFormContent;

import { TextField } from '@boolti/ui';
import { useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

import Styled from './ShowInfoFormContent.styles';
import { ShowInfoFormInputs } from './types';

type ShowBasicInfoFormInputs = Pick<ShowInfoFormInputs, 'notice' | 'hostName' | 'hostPhoneNumber'>;

interface ShowDetailInfoFormContentProps {
  form: UseFormReturn<ShowInfoFormInputs>;
  disabled?: boolean;
}

const ShowDetailInfoFormContent = ({ form, disabled }: ShowDetailInfoFormContentProps) => {
  const { control } = form;

  const [hasBlurred, setHasBlurred] = useState<Record<keyof ShowBasicInfoFormInputs, boolean>>({
    notice: false,
    hostName: false,
    hostPhoneNumber: false,
  });

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormTitle>상세 정보</Styled.ShowInfoFormTitle>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>공연 내용</Styled.ShowInfoFormLabel>
          <Styled.ShowInfoFormDescription>
            방문자에게 알리고 싶은 공연 내용을 작성해주세요.
          </Styled.ShowInfoFormDescription>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Styled.TextAreaContainer>
                <Styled.TextArea
                  placeholder="(ex. 공연 참가팀, 팀소개, 공연곡 소개 등)"
                  rows={10}
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={() => {
                    onBlur();
                    setHasBlurred((prev) => ({ ...prev, notice: true }));
                  }}
                  value={value ?? ''}
                  hasError={hasBlurred.notice && !value}
                />
                {hasBlurred.notice && !value && (
                  <Styled.TextAreaErrorMessage>필수 입력사항입니다.</Styled.TextAreaErrorMessage>
                )}
              </Styled.TextAreaContainer>
            )}
            name="notice"
          />
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>대표자 이름</Styled.ShowInfoFormLabel>
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
                  placeholder="대표자 이름을 입력해 주세요"
                  required
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={() => {
                    onBlur();
                    setHasBlurred((prev) => ({ ...prev, hostName: true }));
                  }}
                  value={value ?? ''}
                  errorMessage={hasBlurred.hostName && !value ? '필수 입력사항입니다.' : undefined}
                />
              )}
              name="hostName"
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>대표자 연락처</Styled.ShowInfoFormLabel>
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
                  placeholder="대표자 연락처를 입력해 주세요"
                  required
                  disabled={disabled}
                  onChange={onChange}
                  onBlur={() => {
                    onBlur();
                    setHasBlurred((prev) => ({ ...prev, hostPhoneNumber: true }));
                  }}
                  value={value ?? ''}
                  errorMessage={
                    hasBlurred.hostPhoneNumber && !value ? '필수 입력사항입니다.' : undefined
                  }
                />
              )}
              name="hostPhoneNumber"
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
    </Styled.ShowInfoFormGroup>
  );
};

export default ShowDetailInfoFormContent;

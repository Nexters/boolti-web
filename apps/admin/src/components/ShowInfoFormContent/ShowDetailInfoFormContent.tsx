import { TextField } from '@boolti/ui';
import { Controller, UseFormReturn } from 'react-hook-form';

import Styled from './ShowInfoFormContent.styles';
import { ShowInfoFormInputs } from './types';

interface ShowDetailInfoFormContentProps {
  form: UseFormReturn<ShowInfoFormInputs>;
  disabled?: boolean;
}

const ShowDetailInfoFormContent = ({ form, disabled }: ShowDetailInfoFormContentProps) => {
  const { control } = form;

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormTitle>상세 정보</Styled.ShowInfoFormTitle>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>공연 내용</Styled.ShowInfoFormLabel>
          <Styled.ShowInfoFormDescription>
            예매자에게 알리고 싶은 공연 내용을 작성해주세요.
          </Styled.ShowInfoFormDescription>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Styled.TextArea
                placeholder="(ex. 공연 참가팀, 팀소개, 공연곡 소개 등)"
                rows={10}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
                value={value ?? ''}
              />
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
                  onBlur={onBlur}
                  value={value ?? ''}
                />
              )}
              name="hostName"
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>대표 연락처</Styled.ShowInfoFormLabel>
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
                  onBlur={onBlur}
                  value={value ?? ''}
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

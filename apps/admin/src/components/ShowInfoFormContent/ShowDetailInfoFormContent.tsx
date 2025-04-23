import { TextField } from '@boolti/ui';
import { Controller, UseFormReturn } from 'react-hook-form';

import Styled from './ShowInfoFormContent.styles';
import { ShowDetailInfoFormInputs } from './types';
import MarkdownEditor from '../MarkdownEditor';

interface ShowDetailInfoFormContentProps {
  form: UseFormReturn<ShowDetailInfoFormInputs>;
  disabled?: boolean;
}

const phoneNumberRegExp = /^\d{3}-\d{3,4}-\d{4}$/;

const ShowDetailInfoFormContent = ({ form, disabled }: ShowDetailInfoFormContentProps) => {
  const {
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = form;

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormGroupHeader>
        <Styled.ShowInfoFormGroupInfo>
          <Styled.ShowInfoFormTitle>상세 정보</Styled.ShowInfoFormTitle>
        </Styled.ShowInfoFormGroupInfo>
      </Styled.ShowInfoFormGroupHeader>
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
            render={({ field: { onChange, onBlur, value } }) => {
              if (value === undefined) return <></>;

              return (
                <Styled.TextAreaContainer>
                  <MarkdownEditor
                    value={value}
                    placeholder="(ex. 공연 참가팀, 팀소개, 공연곡 소개 등)"
                    disabled={disabled}
                    hasError={!!errors.notice?.message}
                    onChange={(event) => {
                      onChange(event);
                      clearErrors('notice');
                    }}
                    onBlur={() => {
                      onBlur();

                      if (!value) {
                        setError('notice', { type: 'required', message: '필수 입력사항입니다.' });
                      }
                    }}
                  />
                  {errors.notice?.message && (
                    <Styled.TextAreaErrorMessage>
                      {errors.notice.message}
                    </Styled.TextAreaErrorMessage>
                  )}
                </Styled.TextAreaContainer>
              );
            }}
            name="notice"
          />
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormResponsiveRowColumn>
        <Styled.ShowInfoFormContent style={{ flex: 0.58, minWidth: '216px' }}>
          <Styled.ShowInfoFormLabel required>주최자명</Styled.ShowInfoFormLabel>
          <Styled.TextField>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (fieldValue) => {
                  if (!fieldValue) return '필수 입력사항입니다.';

                  return true;
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  inputType="text"
                  size="big"
                  placeholder="주최자명을 입력해 주세요"
                  required
                  disabled={disabled}
                  onChange={(event) => {
                    onChange(event);
                    clearErrors('hostName');
                  }}
                  onBlur={() => {
                    onBlur();
                    if (!value) {
                      setError('hostName', { type: 'required', message: '필수 입력사항입니다.' });
                    }
                  }}
                  value={value ?? ''}
                  errorMessage={errors.hostName?.message}
                />
              )}
              name="hostName"
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>주최자 연락처</Styled.ShowInfoFormLabel>
          <Styled.TextField>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: phoneNumberRegExp,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  inputType="text"
                  size="big"
                  placeholder="주최자 연락처를 입력해 주세요"
                  required
                  disabled={disabled}
                  onChange={(event) => {
                    if (event.target.value.length > 13) return;

                    event.target.value = event.target.value
                      .replace(/[^0-9]/g, '')
                      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                      .replace(/(-{1,2})$/g, '');

                    onChange(event);
                    clearErrors('hostPhoneNumber');
                  }}
                  onBlur={() => {
                    onBlur();

                    if (!value) {
                      setError('hostPhoneNumber', {
                        type: 'required',
                        message: '필수 입력사항입니다.',
                      });
                      return;
                    }

                    if (!phoneNumberRegExp.test(value)) {
                      setError('hostPhoneNumber', {
                        type: 'pattern',
                        message: '유효한 전화번호 형식이 아닙니다.',
                      });
                      return;
                    }
                  }}
                  value={value ?? ''}
                  errorMessage={errors.hostPhoneNumber?.message}
                />
              )}
              name="hostPhoneNumber"
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormResponsiveRowColumn>
    </Styled.ShowInfoFormGroup>
  );
};

export default ShowDetailInfoFormContent;

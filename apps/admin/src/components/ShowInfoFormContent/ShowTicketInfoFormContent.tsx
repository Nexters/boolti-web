import { TextField } from '@boolti/ui';
import { format, sub } from 'date-fns';
import { Controller, UseFormReturn } from 'react-hook-form';

import Styled from './ShowInfoFormContent.styles';
import { ShowTicketFormInputs } from './types';
import { useCallback, useEffect } from 'react';

interface ShowTicketInfoFormContentProps {
  form: UseFormReturn<ShowTicketFormInputs>;
  showDate: string;
  showCreatedAt?: string;
  salesStartTime?: string;
  disabled?: boolean;
}

const ShowTicketInfoFormContent = ({
  form,
  showDate,
  showCreatedAt,
  salesStartTime,
  disabled,
}: ShowTicketInfoFormContentProps) => {
  const { watch, control, formState: { errors }, setError, clearErrors } = form;

  const minStartDate = format(showCreatedAt ?? new Date(), 'yyyy-MM-dd')
  const minEndDate = format(
    watch('startDate') ||
    (salesStartTime ? new Date(salesStartTime) : new Date()),
    'yyyy-MM-dd',
  )
  const maxDate = format(
    sub(showDate ? new Date(showDate) : new Date(), { days: 1 }),
    'yyyy-MM-dd',
  )

  const validateStartDate = useCallback((value: string) => {
    if (!value) {
      setError('startDate', { type: 'required', message: '필수 입력사항입니다.' });
      return
    }

    if (new Date(value) > new Date(maxDate)) {
      setError('startDate', { type: 'max', message: '공연일 이전까지 선택 가능합니다.' });
      return
    }

    if (new Date(value) < new Date(minStartDate)) {
      const message = showCreatedAt ? `공연 등록일부터 선택 가능합니다. (${format(showCreatedAt, 'yy.MM.dd')})` : '오늘부터 선택 가능합니다.';
      setError('startDate', { type: 'min', message });
      return
    }

    clearErrors('startDate')
  }, [clearErrors, maxDate, minStartDate, setError, showCreatedAt])

  const validateEndDate = useCallback((value: string) => {
    if (!value) {
      setError('endDate', { type: 'required', message: '필수 입력사항입니다.' });
      return
    }

    if (new Date(value) > new Date(maxDate)) {
      setError('endDate', { type: 'max', message: '공연일 이전까지 선택 가능합니다.' });
      return
    }

    if (new Date(value) < new Date(minEndDate)) {
      setError('endDate', { type: 'min', message: '시작일부터 선택 가능합니다.' });
      return
    }

    clearErrors('endDate')
  }, [clearErrors, maxDate, minEndDate, setError])

  useEffect(() => {
    if (!watch('startDate') || !watch('endDate')) return;

    validateStartDate(watch('startDate'));
    validateEndDate(watch('endDate'));
  }, [validateEndDate, validateStartDate, watch])

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormGroupInfo>
        <Styled.ShowInfoFormTitle>티켓 판매</Styled.ShowInfoFormTitle>
      </Styled.ShowInfoFormGroupInfo>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormResponsiveRowColumn>
            <Styled.ShowInfoFormContent>
              <Styled.ShowInfoFormLabel required>시작일</Styled.ShowInfoFormLabel>
              <Styled.TextField>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      inputType="date"
                      size="big"
                      onChange={(event) => {
                        onChange(event);
                        validateStartDate(event.target.value);
                      }}
                      onBlur={() => {
                        onBlur();
                        validateStartDate(value);
                      }}
                      placeholder={value}
                      min={minStartDate}
                      max={maxDate}
                      required
                      disabled={disabled}
                      errorMessage={errors.startDate?.message}
                    />
                  )}
                  name="startDate"
                />
              </Styled.TextField>
            </Styled.ShowInfoFormContent>
            <Styled.ShowInfoFormContent>
              <Styled.ShowInfoFormLabel required>종료일</Styled.ShowInfoFormLabel>
              <Styled.TextField>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                      inputType="date"
                      size="big"
                      onChange={(event) => {
                        onChange(event);
                        validateEndDate(event.target.value);
                      }}
                      onBlur={() => {
                        onBlur();
                        validateEndDate(value);
                      }}
                      placeholder={value}
                      min={minEndDate}
                      max={maxDate}
                      required
                      disabled={disabled}
                      errorMessage={errors.endDate?.message}
                    />
                  )}
                  name="endDate"
                />
              </Styled.TextField>
            </Styled.ShowInfoFormContent>
          </Styled.ShowInfoFormResponsiveRowColumn>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel>티켓 구매 시 안내사항</Styled.ShowInfoFormLabel>
          <Styled.ShowInfoFormDescription>
            방문자에게 안내할 사항이 있다면 작성해 주세요. 작성한 내용은 티켓 상세 화면에
            노출됩니다.
          </Styled.ShowInfoFormDescription>
          <Styled.TextField>
            <Controller
              control={control}
              rules={{
                required: false,
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
              name="ticketNotice"
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
    </Styled.ShowInfoFormGroup>
  );
};

export default ShowTicketInfoFormContent;

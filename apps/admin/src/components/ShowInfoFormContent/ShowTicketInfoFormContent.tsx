import { TextField } from '@boolti/ui';
import { format, sub } from 'date-fns';
import { Controller, UseFormReturn } from 'react-hook-form';

import Styled from './ShowInfoFormContent.styles';
import { ShowTicketFormInputs } from './types';

interface ShowTicketInfoFormContentProps {
  form: UseFormReturn<ShowTicketFormInputs>;
  showDate: string;
  salesMinStartDate?: string;
  salesStartTime?: string;
  disabled?: boolean;
}

const ShowTicketInfoFormContent = ({
  form,
  showDate,
  salesMinStartDate,
  salesStartTime,
  disabled,
}: ShowTicketInfoFormContentProps) => {
  const { watch, control, formState: { errors }, setError, clearErrors } = form;

  const minStartDate = format(salesMinStartDate ?? new Date(), 'yyyy-MM-dd')
  const minEndDate = format(
    watch('startDate') ||
    (salesStartTime ? new Date(salesStartTime) : new Date()),
    'yyyy-MM-dd',
  )
  const maxDate = format(
    sub(showDate ? new Date(showDate) : new Date(), { days: 1 }),
    'yyyy-MM-dd',
  )

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
                        clearErrors('startDate');

                        if (new Date(event.target.value) < new Date(minStartDate)) {
                          setError('startDate', { type: 'min', message: '공연 생성일 이후의 날짜를 선택해 주세요.' });
                          return
                        }
                      }}
                      onBlur={() => {
                        onBlur();

                        if (!value) {
                          setError('startDate', { type: 'required', message: '필수 입력사항입니다.' });
                          return
                        }
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
                        clearErrors('endDate');

                        if (new Date(event.target.value) < new Date(minEndDate)) {
                          setError('endDate', { type: 'min', message: '시작일 이후로 선택 가능합니다.' });
                          return
                        }

                        if (new Date(event.target.value) > new Date(maxDate)) {
                          setError('endDate', { type: 'max', message: '공연 전날까지 선택 가능합니다.' });
                          return
                        }
                      }}
                      onBlur={() => {
                        onBlur();

                        if (!value) {
                          setError('endDate', { type: 'required', message: '필수 입력사항입니다.' });
                          return
                        }
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

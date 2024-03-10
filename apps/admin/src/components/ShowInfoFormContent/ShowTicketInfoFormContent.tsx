import { TextField } from '@boolti/ui';
import { format, sub } from 'date-fns';
import { Controller, UseFormReturn } from 'react-hook-form';

import Styled from './ShowInfoFormContent.styles';
import { ShowTicketFormInputs } from './types';

interface ShowTicketInfoFormContentProps {
  form: UseFormReturn<ShowTicketFormInputs>;
  showDate: string;
  salesStartTime?: string;
  disabled?: boolean;
}

const ShowTicketInfoFormContent = ({
  form,
  showDate,
  salesStartTime,
  disabled,
}: ShowTicketInfoFormContentProps) => {
  const { watch, control } = form;

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormTitle>티켓 판매 정보</Styled.ShowInfoFormTitle>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormRow>
            <Styled.ShowInfoFormContent>
              <Styled.ShowInfoFormLabel required>판매 시작일</Styled.ShowInfoFormLabel>
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
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={value}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      max={format(
                        sub(showDate ? new Date(showDate) : new Date(), { days: 1 }),
                        'yyyy-MM-dd',
                      )}
                      defaultValue={watch('startDate') || ''}
                      required
                      disabled={disabled}
                    />
                  )}
                  name="startDate"
                />
              </Styled.TextField>
            </Styled.ShowInfoFormContent>
            <Styled.ShowInfoFormContent>
              <Styled.ShowInfoFormLabel required>판매 종료일</Styled.ShowInfoFormLabel>
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
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder={value}
                      min={format(
                        watch('startDate') ||
                          (salesStartTime ? new Date(salesStartTime) : new Date()),
                        'yyyy-MM-dd',
                      )}
                      max={format(
                        sub(showDate ? new Date(showDate) : new Date(), { days: 1 }),
                        'yyyy-MM-dd',
                      )}
                      defaultValue={watch('endDate') || ''}
                      required
                      disabled={disabled}
                    />
                  )}
                  name="endDate"
                />
              </Styled.TextField>
            </Styled.ShowInfoFormContent>
          </Styled.ShowInfoFormRow>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel>티켓 구매 시 안내사항</Styled.ShowInfoFormLabel>
          <Styled.ShowInfoFormDescription>
            예매자에게 안내할 사항이 있다면 작성해 주세요. 작성한 내용은 티켓 상세 화면에
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

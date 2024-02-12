import { TextField } from '@boolti/ui';
import { format, sub } from 'date-fns';
import { Controller, UseFormReturn } from 'react-hook-form';

import Styled from './ShowInfoFormContent.styles';
import { ShowTicketFormInputs } from './types';

interface ShowTicketInfoFormContentProps {
  form: UseFormReturn<ShowTicketFormInputs>;
  showDate: string;
}

const ShowTicketInfoFormContent = ({ form, showDate }: ShowTicketInfoFormContentProps) => {
  const { register, watch, control } = form;

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormTitle>티켓 정보</Styled.ShowInfoFormTitle>
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
                      min={format(watch('startDate') || new Date(), 'yyyy-MM-dd')}
                      max={format(
                        sub(showDate ? new Date(showDate) : new Date(), { days: 1 }),
                        'yyyy-MM-dd',
                      )}
                      defaultValue={watch('endDate') || ''}
                      required
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
            (ex. 주류반입이 불가한 공연장입니다. 드시던 음료는 입구에 놓고 입장해주세요.)
          </Styled.ShowInfoFormDescription>
          <Styled.TextField>
            <Styled.TextArea
              placeholder="(ex. 공연 참가팀, 팀소개, 공연곡 소개 등)"
              rows={10}
              {...register('ticketNotice')}
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
    </Styled.ShowInfoFormGroup>
  );
};

export default ShowTicketInfoFormContent;

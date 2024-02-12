import { TextField } from '@boolti/ui';
import { UseFormReturn } from 'react-hook-form';

import Styled from './ShowInfoFormContent.styles';
import { ShowInfoFormInputs } from './types';

interface ShowDetailInfoFormContentProps {
  form: UseFormReturn<ShowInfoFormInputs>;
}

const ShowDetailInfoFormContent = ({ form }: ShowDetailInfoFormContentProps) => {
  const { register } = form;

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormTitle>상세 정보</Styled.ShowInfoFormTitle>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>공연 내용</Styled.ShowInfoFormLabel>
          <Styled.ShowInfoFormDescription>
            예매자에게 알리고 싶은 공연 내용을 작성해주세요.
          </Styled.ShowInfoFormDescription>
          <Styled.TextArea
            placeholder="(ex. 공연 참가팀, 팀소개, 공연곡 소개 등)"
            rows={10}
            {...register('notice', { required: true })}
          />
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>대표자 이름</Styled.ShowInfoFormLabel>
          <Styled.TextField>
            <TextField
              inputType="text"
              size="big"
              placeholder="대표자 이름을 입력해 주세요"
              required
              {...register('hostName', { required: true })}
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>대표 연락처</Styled.ShowInfoFormLabel>
          <Styled.TextField>
            <TextField
              inputType="text"
              size="big"
              placeholder="대표자 연락처를 입력해 주세요"
              required
              {...register('hostPhoneNumber', { required: true })}
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
    </Styled.ShowInfoFormGroup>
  );
};

export default ShowDetailInfoFormContent;

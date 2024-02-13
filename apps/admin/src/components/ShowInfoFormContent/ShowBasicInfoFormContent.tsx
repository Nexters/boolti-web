import { ImageFile } from '@boolti/api';
import { CloseIcon, FileUpIcon } from '@boolti/icon';
import { TextField } from '@boolti/ui';
import { useDropzone } from 'react-dropzone';
import { Controller, UseFormReturn } from 'react-hook-form';

import Styled from './ShowInfoFormContent.styles';
import { ShowInfoFormInputs } from './types';

const MAX_IMAGE_COUNT = 3;

interface ShowBasicInfoFormContentProps {
  form: UseFormReturn<ShowInfoFormInputs>;
  imageFiles: ImageFile[];
  disabled?: boolean;
  onDropImage: (acceptedFiles: File[]) => void;
  onDeleteImage: (file: ImageFile) => void;
}

const ShowBasicInfoFormContent = ({
  form,
  imageFiles,
  disabled,
  onDropImage,
  onDeleteImage,
}: ShowBasicInfoFormContentProps) => {
  const { register, watch, control } = form;

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: MAX_IMAGE_COUNT,
    onDrop: onDropImage,
  });

  return (
    <Styled.ShowInfoFormGroup>
      <Styled.ShowInfoFormTitle>기본 정보</Styled.ShowInfoFormTitle>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>공연 포스터</Styled.ShowInfoFormLabel>
          <Styled.ShowInfoFormDescription>
            원하시는 <strong>노출 순서대로</strong> 이미지를 업로드해주세요. (최소 1장, 최대{' '}
            {MAX_IMAGE_COUNT}장 업로드 가능 / jpg, png 형식)
          </Styled.ShowInfoFormDescription>
          <Styled.PreviewImageContainer>
            {imageFiles.map((file) => (
              <Styled.PreviewImage
                key={file.preview}
                style={{ backgroundImage: `url(${file.preview})` }}
              >
                {!disabled && (
                  <Styled.PreviewImageDeleteButton
                    type="button"
                    onClick={() => onDeleteImage(file)}
                  >
                    <CloseIcon />
                  </Styled.PreviewImageDeleteButton>
                )}
              </Styled.PreviewImage>
            ))}
            {imageFiles.length < MAX_IMAGE_COUNT && !disabled && (
              <Styled.FileUploadArea {...getRootProps()} imageCount={imageFiles.length}>
                <input {...getInputProps()} />
                <FileUpIcon />
                <Styled.FileUploadAreaText>이미지 업로드</Styled.FileUploadAreaText>
              </Styled.FileUploadArea>
            )}
          </Styled.PreviewImageContainer>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>공연명</Styled.ShowInfoFormLabel>
          <Styled.TextField>
            <TextField
              inputType="text"
              size="big"
              placeholder="공연명을 입력해 주세요 (띄어쓰기 포함 최대 40자)"
              required
              disabled={disabled}
              {...register('name', { required: true, disabled })}
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>공연일</Styled.ShowInfoFormLabel>
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
                  defaultValue={watch('date')}
                  required
                  disabled={disabled}
                />
              )}
              name="date"
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>공연 시작 시간</Styled.ShowInfoFormLabel>
          <Styled.TextField>
            <TextField
              inputType="time"
              size="big"
              required
              disabled={disabled}
              {...register('startTime', { required: true, disabled })}
            />
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>러닝타임</Styled.ShowInfoFormLabel>
          <Styled.TextField>
            <TextField
              inputType="number"
              size="big"
              min={0}
              required
              disabled={disabled}
              {...register('runningTime', { required: true, disabled })}
            />
            <Styled.TextFieldSuffix>분</Styled.TextFieldSuffix>
          </Styled.TextField>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
      <Styled.ShowInfoFormRow>
        <Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormLabel required>공연 장소</Styled.ShowInfoFormLabel>
          <Styled.TextField>
            <TextField
              inputType="text"
              size="big"
              placeholder="공연장명을 입력해 주세요"
              required
              disabled={disabled}
              {...register('placeName', { required: true, disabled })}
            />
          </Styled.TextField>
          <Styled.TextFieldRow>
            <Styled.TextField flex={2}>
              <TextField
                inputType="text"
                size="big"
                placeholder="도로명 주소를 입력해 주세요"
                required
                disabled={disabled}
                {...register('placeStreetAddress', { required: true, disabled })}
              />
            </Styled.TextField>
            <Styled.TextField flex={1}>
              <TextField
                inputType="text"
                size="big"
                placeholder="상세 주소를 입력해 주세요"
                required
                disabled={disabled}
                {...register('placeDetailAddress', { required: true, disabled })}
              />
            </Styled.TextField>
          </Styled.TextFieldRow>
        </Styled.ShowInfoFormContent>
      </Styled.ShowInfoFormRow>
    </Styled.ShowInfoFormGroup>
  );
};

export default ShowBasicInfoFormContent;

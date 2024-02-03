import { ArrowLeftIcon, CloseIcon, FileUpIcon } from '@boolti/icon';
import Styled from './ShowAddPage.styles';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@boolti/ui';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const MAX_IMAGE_COUNT = 3;

interface ImageFile extends File {
  preview: string;
}

interface Inputs {
  name: string;
  date: string;
  startTime: string;
  runningTime: number;
  placeName: string;
  placeStreetAddress: string;
  placeDetailAddress: string;
  notice: string;
  hostName: string;
  hostPhoneNumber: string;
}

const ShowAddPage = () => {
  const navigate = useNavigate();

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  const { control, register, handleSubmit } = useForm<Inputs>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImageFiles((prevImageFiles) => [
      ...prevImageFiles,
      ...acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: MAX_IMAGE_COUNT,
    onDrop,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    return () => imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [imageFiles]);

  return (
    <Styled.ShowAddPage>
      <Styled.HeaderContainer>
        <Styled.Header>
          <Styled.BackButton
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftIcon />
          </Styled.BackButton>
          <Styled.HeaderText>주최자 홈</Styled.HeaderText>
        </Styled.Header>
      </Styled.HeaderContainer>
      <Styled.CardContainer>
        <Styled.Card>
          <Styled.CardHeader>
            <Styled.CardHeaderText>공연 등록</Styled.CardHeaderText>
          </Styled.CardHeader>
          <Styled.CardContent>
            <Styled.ProcessIndicator>
              <Styled.ProcessIndicatorItem active>
                <Styled.ProcessIndicatorDot active currentStep />
                <Styled.ProcessIndicatorText active>정보 입력</Styled.ProcessIndicatorText>
              </Styled.ProcessIndicatorItem>
              <Styled.ProcessIndicatorItem>
                <Styled.ProcessIndicatorDot />
                <Styled.ProcessIndicatorText>티켓 생성</Styled.ProcessIndicatorText>
              </Styled.ProcessIndicatorItem>
            </Styled.ProcessIndicator>
            <Styled.CardDescription>
              등록하려는 공연의 정보를 입력해 주세요.
              <br />
              공연 정보는 티켓 판매 시작 전까지 수정할 수 있어요.
            </Styled.CardDescription>
            <Styled.ShowAddForm onSubmit={handleSubmit(onSubmit)}>
              <Styled.ShowAddFormGroup>
                <Styled.ShowAddFormTitle>기본 정보</Styled.ShowAddFormTitle>
                <Styled.ShowAddFormRow>
                  <Styled.ShowAddFormContent>
                    <Styled.ShowAddFormLabel required>공연 포스터</Styled.ShowAddFormLabel>
                    <Styled.ShowAddFormDescription>
                      원하시는 <strong>노출 순서대로</strong> 이미지를 업로드해주세요. (최소 1장,
                      최대 {MAX_IMAGE_COUNT}장 업로드 가능 / jpg, png 형식)
                    </Styled.ShowAddFormDescription>
                    <Styled.PreviewImageContainer>
                      {imageFiles.map((file) => (
                        <Styled.PreviewImage
                          key={file.preview}
                          style={{ backgroundImage: `url(${file.preview})` }}
                        >
                          <Styled.PreviewImageDeleteButton
                            type="button"
                            onClick={() => {
                              setImageFiles((prevImageFiles) =>
                                prevImageFiles.filter((prevFile) => prevFile !== file),
                              );
                            }}
                          >
                            <CloseIcon />
                          </Styled.PreviewImageDeleteButton>
                        </Styled.PreviewImage>
                      ))}
                      {imageFiles.length < MAX_IMAGE_COUNT && (
                        <Styled.FileUploadArea {...getRootProps()} imageCount={imageFiles.length}>
                          <input {...getInputProps()} />
                          <FileUpIcon />
                          <Styled.FileUploadAreaText>이미지 업로드</Styled.FileUploadAreaText>
                        </Styled.FileUploadArea>
                      )}
                    </Styled.PreviewImageContainer>
                  </Styled.ShowAddFormContent>
                </Styled.ShowAddFormRow>
                <Styled.ShowAddFormRow>
                  <Styled.ShowAddFormContent>
                    <Styled.ShowAddFormLabel required>공연명</Styled.ShowAddFormLabel>
                    <Styled.TextField>
                      <TextField
                        inputType="text"
                        size="big"
                        placeholder="공연명을 입력해 주세요 (띄어쓰기 포함 최대 40자)"
                        required
                        {...register('name', { required: true })}
                      />
                    </Styled.TextField>
                  </Styled.ShowAddFormContent>
                </Styled.ShowAddFormRow>
                <Styled.ShowAddFormRow>
                  <Styled.ShowAddFormContent>
                    <Styled.ShowAddFormLabel required>공연일</Styled.ShowAddFormLabel>
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
                            required
                          />
                        )}
                        name="date"
                      />
                    </Styled.TextField>
                  </Styled.ShowAddFormContent>
                </Styled.ShowAddFormRow>
                <Styled.ShowAddFormRow>
                  <Styled.ShowAddFormContent>
                    <Styled.ShowAddFormLabel required>공연 시작 시간</Styled.ShowAddFormLabel>
                    <Styled.TextField>
                      <TextField
                        inputType="time"
                        size="big"
                        required
                        {...register('startTime', { required: true })}
                      />
                    </Styled.TextField>
                  </Styled.ShowAddFormContent>
                  <Styled.ShowAddFormContent>
                    <Styled.ShowAddFormLabel required>러닝타임</Styled.ShowAddFormLabel>
                    <Styled.TextField>
                      <TextField
                        inputType="number"
                        size="big"
                        min={0}
                        required
                        {...register('runningTime', { required: true })}
                      />
                      <Styled.TextFieldSuffix>분</Styled.TextFieldSuffix>
                    </Styled.TextField>
                  </Styled.ShowAddFormContent>
                </Styled.ShowAddFormRow>
                <Styled.ShowAddFormRow>
                  <Styled.ShowAddFormContent>
                    <Styled.ShowAddFormLabel required>공연 장소</Styled.ShowAddFormLabel>
                    <Styled.TextField>
                      <TextField
                        inputType="text"
                        size="big"
                        placeholder="공연장명을 입력해 주세요"
                        required
                        {...register('placeName', { required: true })}
                      />
                    </Styled.TextField>
                    <Styled.TextFieldRow>
                      <Styled.TextField flex={2}>
                        <TextField
                          inputType="text"
                          size="big"
                          placeholder="도로명 주소를 입력해 주세요"
                          required
                          {...register('placeStreetAddress', { required: true })}
                        />
                      </Styled.TextField>
                      <Styled.TextField flex={1}>
                        <TextField
                          inputType="text"
                          size="big"
                          placeholder="상세 주소를 입력해 주세요"
                          required
                          {...register('placeDetailAddress', { required: true })}
                        />
                      </Styled.TextField>
                    </Styled.TextFieldRow>
                  </Styled.ShowAddFormContent>
                </Styled.ShowAddFormRow>
              </Styled.ShowAddFormGroup>
              <Styled.ShowAddFormGroup>
                <Styled.ShowAddFormTitle>상세 정보</Styled.ShowAddFormTitle>
                <Styled.ShowAddFormRow>
                  <Styled.ShowAddFormContent>
                    <Styled.ShowAddFormLabel required>공연 내용</Styled.ShowAddFormLabel>
                    <Styled.ShowAddFormDescription>
                      예매자에게 알리고 싶은 공연 내용을 작성해주세요.
                    </Styled.ShowAddFormDescription>
                    <Styled.TextArea
                      placeholder="(ex. 공연 참가팀, 팀소개, 공연곡 소개 등)"
                      rows={10}
                      {...register('notice', { required: true })}
                    />
                  </Styled.ShowAddFormContent>
                </Styled.ShowAddFormRow>
                <Styled.ShowAddFormRow>
                  <Styled.ShowAddFormContent>
                    <Styled.ShowAddFormLabel required>대표자 이름</Styled.ShowAddFormLabel>
                    <Styled.TextField>
                      <TextField
                        inputType="text"
                        size="big"
                        placeholder="대표자 이름을 입력해 주세요"
                        required
                        {...register('hostName', { required: true })}
                      />
                    </Styled.TextField>
                  </Styled.ShowAddFormContent>
                </Styled.ShowAddFormRow>
                <Styled.ShowAddFormRow>
                  <Styled.ShowAddFormContent>
                    <Styled.ShowAddFormLabel required>대표 연락처</Styled.ShowAddFormLabel>
                    <Styled.TextField>
                      <TextField
                        inputType="text"
                        size="big"
                        placeholder="대표자 연락처를 입력해 주세요"
                        required
                        {...register('hostPhoneNumber', { required: true })}
                      />
                    </Styled.TextField>
                  </Styled.ShowAddFormContent>
                </Styled.ShowAddFormRow>
              </Styled.ShowAddFormGroup>
              <Button type="submit" colorTheme="primary" size="bold">
                저장하기
              </Button>
            </Styled.ShowAddForm>
          </Styled.CardContent>
        </Styled.Card>
      </Styled.CardContainer>
    </Styled.ShowAddPage>
  );
};

export default ShowAddPage;

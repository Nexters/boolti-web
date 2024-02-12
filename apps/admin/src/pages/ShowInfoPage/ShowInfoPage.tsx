import { ImageFile } from '@boolti/api';
import { Button } from '@boolti/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import ShowDetailLayout from '~/components/ShowDetailLayout';
import ShowBasicInfoFormContent from '~/components/ShowInfoFormContent/ShowBasicInfoFormContent';
import ShowDetailInfoFormContent from '~/components/ShowInfoFormContent/ShowDetailInfoFormContent';
import { ShowInfoFormInputs } from '~/components/ShowInfoFormContent/types';

import Styled from './ShowInfoPage.styles';

const ShowInfoPage = () => {
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  const showInfoForm = useForm<ShowInfoFormInputs>();

  const onSubmit: SubmitHandler<ShowInfoFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <ShowDetailLayout showName="불다람쥐 파이어 쇼">
      <Styled.ShowInfoPage>
        <Styled.ShowInfoForm onSubmit={showInfoForm.handleSubmit(onSubmit)}>
          <Styled.ShowInfoFormContent>
            <ShowBasicInfoFormContent
              form={showInfoForm}
              imageFiles={imageFiles}
              onDropImage={(acceptedFiles) => {
                setImageFiles((prevImageFiles) => [
                  ...prevImageFiles,
                  ...acceptedFiles.map((file) => ({
                    ...file,
                    preview: URL.createObjectURL(file),
                  })),
                ]);
              }}
              onDeleteImage={(file) => {
                setImageFiles((prevImageFiles) =>
                  prevImageFiles.filter((prevFile) => prevFile !== file),
                );
              }}
            />
          </Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormDivider />
          <Styled.ShowInfoFormContent>
            <ShowDetailInfoFormContent form={showInfoForm} />
          </Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormFooter>
            <Button
              size="bold"
              colorTheme="primary"
              type="submit"
              disabled={
                !showInfoForm.formState.isDirty ||
                !showInfoForm.formState.isValid ||
                imageFiles.length === 0
              }
            >
              저장하기
            </Button>
            <Button size="bold" colorTheme="line" type="button">
              공연 삭제하기
            </Button>
          </Styled.ShowInfoFormFooter>
        </Styled.ShowInfoForm>
      </Styled.ShowInfoPage>
    </ShowDetailLayout>
  );
};

export default ShowInfoPage;

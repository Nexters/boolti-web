import {
  ImageFile,
  ShowImage,
  useDeleteShow,
  useEditShowInfo,
  useShowDetail,
  useShowSalesInfo,
  useUploadShowImage,
} from '@boolti/api';
import { Button, Drawer, useConfirm, useDialog, useToast } from '@boolti/ui';
import { compareAsc, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import ShowDeleteForm from '~/components/ShowDeleteForm';
import ShowDetailLayout from '~/components/ShowDetailLayout';
import ShowBasicInfoFormContent from '~/components/ShowInfoFormContent/ShowBasicInfoFormContent';
import ShowDetailInfoFormContent from '~/components/ShowInfoFormContent/ShowDetailInfoFormContent';
import { ShowInfoFormInputs } from '~/components/ShowInfoFormContent/types';
import ShowPreview from '~/components/ShowPreview';
import { PATH } from '~/constants/routes';

import PreviewFrame from './PreviewFrame';
import Styled from './ShowInfoPage.styles';

const ShowInfoPage = () => {
  const params = useParams<{ showId: string }>();
  const navigate = useNavigate();

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [showImages, setShowImages] = useState<ShowImage[]>([]);
  const isImageFilesDirty = imageFiles.some((file) => file.preview.startsWith('blob:'));
  const showInfoForm = useForm<ShowInfoFormInputs>();

  const { data: show } = useShowDetail(Number(params!.showId));
  const { data: showSalesInfo } = useShowSalesInfo(Number(params!.showId));

  const editShowInfoMutation = useEditShowInfo();
  const uploadShowImageMutation = useUploadShowImage();
  const deleteShowMutation = useDeleteShow();

  const toast = useToast();
  const confirm = useConfirm();
  const deleteShowDialog = useDialog();

  const [previewDrawerOpen, setPreviewDrawerOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ShowInfoFormInputs> = async (data) => {
    if (!show) return;

    const newImageFiles = imageFiles.filter((file) => file.preview.startsWith('blob:'));
    const newShowImages = await (async () => {
      if (newImageFiles.length === 0) return [];

      return await uploadShowImageMutation.mutateAsync(newImageFiles);
    })();

    await editShowInfoMutation.mutateAsync({
      showId: show.id,
      body: {
        name: data.name,
        images: [...showImages, ...newShowImages].map((image, index) => ({
          sequence: index + 1,
          thumbnailPath: image.thumbnailPath,
          path: image.path,
        })),
        date: `${data.date}T${data.startTime}:00.000Z`,
        runningTime: Number(data.runningTime),
        place: {
          name: data.placeName,
          streetAddress: data.placeStreetAddress,
          detailAddress: data.placeDetailAddress,
        },
        notice: data.notice,
        host: {
          name: data.hostName,
          phoneNumber: data.hostPhoneNumber,
        },
      },
    });

    toast.success('공연 정보를 저장했습니다.');
    setPreviewDrawerOpen(false);
  };

  const confirmSaveShowInfo = async () => {
    if (!showInfoForm.formState.isDirty && !isImageFilesDirty) {
      return true;
    }

    const result = await confirm(
      '저장하지 않고 이 페이지를 나가면 작성한 정보가 손실됩니다.\n변경된 정보를 저장할까요?',
      {
        cancel: '취소하기',
        confirm: '저장하기',
      },
    );

    if (result) {
      showInfoForm.handleSubmit(onSubmit)();
    }

    return true;
  };

  useEffect(() => {
    if (!show) return;

    showInfoForm.reset({
      name: show.name,
      date: format(show.date, 'yyyy-MM-dd'),
      startTime: format(show.date, 'HH:mm'),
      runningTime: `${show.runningTime}`,
      placeName: show.place.name,
      placeStreetAddress: show.place.streetAddress,
      placeDetailAddress: show.place.detailAddress,
      notice: show.notice,
      hostName: show.host.name,
      hostPhoneNumber: show.host.phoneNumber,
    });

    setImageFiles(show.images.map((image) => ({ preview: image.thumbnailPath })));
    setShowImages(show.images);
  }, [show, showInfoForm]);

  if (!show || !showSalesInfo) return null;

  const salesStarted = compareAsc(new Date(showSalesInfo.salesStartTime), new Date()) === -1;

  return (
    <ShowDetailLayout showName={show.name} onClickMiddleware={confirmSaveShowInfo}>
      <Styled.ShowInfoPage>
        <Styled.ShowInfoForm onSubmit={showInfoForm.handleSubmit(onSubmit)}>
          <Styled.ShowInfoFormContent>
            <ShowBasicInfoFormContent
              form={showInfoForm}
              imageFiles={imageFiles}
              disabled={show.isEnded}
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
                setShowImages((prevShowImages) =>
                  prevShowImages.filter((prevImage) => prevImage.thumbnailPath !== file.preview),
                );
              }}
            />
          </Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormDivider />
          <Styled.ShowInfoFormContent>
            <ShowDetailInfoFormContent form={showInfoForm} disabled={show.isEnded} />
          </Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormFooter>
            <Styled.SaveButton>
              <Button
                size="bold"
                colorTheme="primary"
                type="button"
                disabled={
                  !showInfoForm.formState.isValid || imageFiles.length === 0 || show.isEnded
                }
                onClick={() => {
                  setPreviewDrawerOpen(true);
                }}
              >
                저장하기
              </Button>
            </Styled.SaveButton>
            <Styled.DeleteButton>
              <Button
                size="bold"
                colorTheme="line"
                type="button"
                disabled={salesStarted}
                onClick={() => {
                  deleteShowDialog.open({
                    title: '공연 삭제하기',
                    content: (
                      <ShowDeleteForm
                        showName={show.name}
                        onSubmit={async () => {
                          await deleteShowMutation.mutateAsync(show.id);

                          deleteShowDialog.close();
                          navigate(PATH.HOME);
                          toast.success('공연을 삭제했습니다.');
                        }}
                      />
                    ),
                  });
                }}
              >
                공연 삭제하기
              </Button>
            </Styled.DeleteButton>
          </Styled.ShowInfoFormFooter>
          <Drawer
            open={previewDrawerOpen}
            title="공연 상세 미리보기"
            onClose={() => {
              setPreviewDrawerOpen(false);
            }}
          >
            <Styled.ShowInfoPreviewContainer>
              <Styled.ShowInfoPreview>
                <Styled.ShowInfoPreviewFrameContainer>
                  <Styled.ShowInfoPreviewFrame>
                    <PreviewFrame />
                  </Styled.ShowInfoPreviewFrame>
                  <Styled.ShowPreviewContainer>
                    <Styled.ShowPreview>
                      <ShowPreview
                        images={imageFiles.map((file) => file.preview)}
                        name={showInfoForm.watch('name') ? showInfoForm.watch('name') : ''}
                        date={
                          showInfoForm.watch('date')
                            ? format(showInfoForm.watch('date'), 'yyyy.MM.dd (E)')
                            : ''
                        }
                        startTime={showInfoForm.watch('startTime')}
                        runningTime={showInfoForm.watch('runningTime')}
                        salesStartTime={
                          showSalesInfo
                            ? format(showSalesInfo.salesStartTime, 'yyyy.MM.dd (E)')
                            : ''
                        }
                        salesEndTime={
                          showSalesInfo ? format(showSalesInfo.salesEndTime, 'yyyy.MM.dd (E)') : ''
                        }
                        placeName={showInfoForm.watch('placeName')}
                        placeStreetAddress={showInfoForm.watch('placeStreetAddress')}
                        placeDetailAddress={showInfoForm.watch('placeDetailAddress')}
                        notice={showInfoForm.watch('notice')}
                        hostName={showInfoForm.watch('hostName')}
                        hostPhoneNumber={showInfoForm.watch('hostPhoneNumber')}
                      />
                    </Styled.ShowPreview>
                  </Styled.ShowPreviewContainer>
                </Styled.ShowInfoPreviewFrameContainer>
              </Styled.ShowInfoPreview>
              <Styled.ShowInfoPreviewFooter>
                <Styled.ShowInfoPreviewCloseButton
                  type="button"
                  onClick={() => {
                    setPreviewDrawerOpen(false);
                  }}
                >
                  닫기
                </Styled.ShowInfoPreviewCloseButton>
                <Styled.ShowInfoPreviewSubmitButton
                  type="button"
                  onClick={() => {
                    showInfoForm.handleSubmit(onSubmit)();
                  }}
                >
                  저장하기
                </Styled.ShowInfoPreviewSubmitButton>
              </Styled.ShowInfoPreviewFooter>
            </Styled.ShowInfoPreviewContainer>
          </Drawer>
        </Styled.ShowInfoForm>
      </Styled.ShowInfoPage>
    </ShowDetailLayout>
  );
};

export default ShowInfoPage;

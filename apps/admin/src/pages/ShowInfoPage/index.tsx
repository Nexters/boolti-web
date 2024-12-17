import {
  ImageFile,
  ShowCastTeamCreateOrUpdateRequest,
  ShowImage,
  queryKeys,
  useCastTeamList,
  useDeleteCastTeams,
  useDeleteShow,
  useEditShowInfo,
  usePostCastTeams,
  usePutCastTeams,
  useQueryClient,
  useShowDetail,
  useShowSalesInfo,
  useUploadShowImage,
} from '@boolti/api';
import { Button, Drawer, ShowPreview, useConfirm, useDialog, useToast } from '@boolti/ui';
import { compareAsc, format } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import ShowDeleteForm from '~/components/ShowDeleteForm';
import { middlewareAtom, myHostInfoAtom } from '~/components/ShowDetailLayout';
import ShowBasicInfoFormContent from '~/components/ShowInfoFormContent/ShowBasicInfoFormContent';
import ShowDetailInfoFormContent from '~/components/ShowInfoFormContent/ShowDetailInfoFormContent';
import { ShowBasicInfoFormInputs, ShowDetailInfoFormInputs } from '~/components/ShowInfoFormContent/types';
import { PATH } from '~/constants/routes';

import PreviewFrame from './PreviewFrame';
import Styled from './ShowInfoPage.styles';
import { useAtom, useSetAtom } from 'jotai';
import { HostType } from '@boolti/api/src/types/host';
import ShowDetailUnauthorized from '~/components/ShowDetailUnauthorized';
import Portal from '@boolti/ui/src/components/Portal';
import ShowCastInfoFormContent from '~/components/ShowInfoFormContent/ShowCastInfoFormContent';
import ShowCastInfo from '~/components/ShowCastInfo';
import { TempShowCastInfoFormInput } from '~/components/ShowCastInfoFormDialogContent';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import useCastTeamListOrder from '~/hooks/useCastTeamListOrder';

const ShowInfoPage = () => {
  const queryClient = useQueryClient();
  const params = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const [myHostInfo] = useAtom(myHostInfoAtom);
  const showPreviewRef = useRef<HTMLDivElement>(null);
  const showPreviewMobileRef = useRef<HTMLDivElement>(null);

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [showImages, setShowImages] = useState<ShowImage[]>([]);
  const isImageFilesDirty = imageFiles.some((file) => file.preview.startsWith('blob:'));
  const showBasicInfoForm = useForm<ShowBasicInfoFormInputs>();
  const showDetailInfoForm = useForm<ShowDetailInfoFormInputs>();

  const showId = Number(params!.showId);
  const { data: show } = useShowDetail(showId);
  const { data: showSalesInfo } = useShowSalesInfo(showId);
  const { data: castTeamList, refetch: refetchCastTeamList } = useCastTeamList(showId);
  const { castTeamListDraft, sensors, castTeamDragEndHandler } = useCastTeamListOrder({ showId, castTeamList, onChange: refetchCastTeamList });

  const editShowInfoMutation = useEditShowInfo();
  const uploadShowImageMutation = useUploadShowImage();
  const deleteShowMutation = useDeleteShow();
  const putCastTeams = usePutCastTeams();
  const postCastTeams = usePostCastTeams();
  const deleteCastTeams = useDeleteCastTeams();

  const toast = useToast();
  const confirm = useConfirm();
  const deleteShowDialog = useDialog();

  const setMiddleware = useSetAtom(middlewareAtom);

  const [previewDrawerOpen, setPreviewDrawerOpen] = useState<boolean>(false);

  useBodyScrollLock(previewDrawerOpen);

  const submitHandler = useCallback(async () => {
    if (!show) return;

    const newImageFiles = imageFiles.filter((file) => file.preview.startsWith('blob:'));
    const newShowImages = await (async () => {
      if (newImageFiles.length === 0) return [];

      return await uploadShowImageMutation.mutateAsync(newImageFiles);
    })();

    const [isValidShowBasicInfoFormInputs, isValidShowDetailInfoFormInputs] = await Promise.all([
      showBasicInfoForm.trigger(),
      showDetailInfoForm.trigger()
    ]);

    if (!isValidShowBasicInfoFormInputs || !isValidShowDetailInfoFormInputs) return;

    const showBasicInfoFormInputs = showBasicInfoForm.getValues();
    const showDetailInfoFormInputs = showDetailInfoForm.getValues();

    await editShowInfoMutation.mutateAsync({
      showId,
      body: {
        name: showBasicInfoFormInputs.name,
        images: [...showImages, ...newShowImages].map((image, index) => ({
          sequence: index + 1,
          thumbnailPath: image.thumbnailPath,
          path: image.path,
        })),
        date: `${showBasicInfoFormInputs.date}T${showBasicInfoFormInputs.startTime}:00.000Z`,
        runningTime: +showBasicInfoFormInputs.runningTime,
        place: {
          name: showBasicInfoFormInputs.placeName,
          streetAddress: showBasicInfoFormInputs.placeStreetAddress,
          detailAddress: showBasicInfoFormInputs.placeDetailAddress,
        },
        notice: showDetailInfoFormInputs.notice,
        host: {
          name: showDetailInfoFormInputs.hostName,
          phoneNumber: showDetailInfoFormInputs.hostPhoneNumber,
        },
      },
    });

    toast.success('공연 정보를 저장했습니다.');
    setPreviewDrawerOpen(false);
  }, [editShowInfoMutation, imageFiles, show, showBasicInfoForm, showDetailInfoForm, showId, showImages, toast, uploadShowImageMutation])


  const confirmSaveShowInfo = useCallback(async () => {
    if (!showBasicInfoForm.formState.isDirty && !showDetailInfoForm.formState.isDirty && !isImageFilesDirty) {
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
      showBasicInfoForm.handleSubmit(submitHandler)();
      showDetailInfoForm.handleSubmit(submitHandler)();
    }

    return true;
  }, [confirm, isImageFilesDirty, submitHandler, showBasicInfoForm, showDetailInfoForm]);

  useEffect(() => {
    if (!show) return;

    showBasicInfoForm.reset({
      name: show.name,
      date: format(show.date, 'yyyy-MM-dd'),
      startTime: format(show.date, 'HH:mm'),
      runningTime: `${show.runningTime}`,
      placeName: show.place.name,
      placeStreetAddress: show.place.streetAddress,
      placeDetailAddress: show.place.detailAddress,
    });

    showDetailInfoForm.reset({
      notice: show.notice,
      hostName: show.host.name,
      hostPhoneNumber: show.host.phoneNumber,
    });

    setImageFiles(show.images.map((image) => ({ preview: image.thumbnailPath })));
    setShowImages(show.images);
  }, [show, showBasicInfoForm, showDetailInfoForm]);

  useEffect(() => {
    setMiddleware(() => confirmSaveShowInfo);
    return () => {
      setMiddleware(undefined);
    };
  }, [confirmSaveShowInfo, setMiddleware]);

  if (!show || !showSalesInfo || !castTeamList) {
    return null;
  }

  const salesStarted = compareAsc(new Date(showSalesInfo.salesStartTime), new Date()) === -1;

  return (
    <>
      {myHostInfo?.type === HostType.SUPPORTER ? (
        <ShowDetailUnauthorized
          pageName={'공연 기본 정보'}
          name={myHostInfo?.hostName as string}
          type={myHostInfo?.type as HostType}
        />
      ) : (
        <Styled.ShowInfoPage>
          <Styled.ShowInfoForm onSubmit={submitHandler}>
            <Styled.ShowInfoFormContent>
              <ShowBasicInfoFormContent
                form={showBasicInfoForm}
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
              <ShowDetailInfoFormContent form={showDetailInfoForm} disabled={show.isEnded} />
            </Styled.ShowInfoFormContent>
            <Styled.ShowInfoFormFooter>
              <Styled.SaveButton>
                <Button
                  size="bold"
                  colorTheme="primary"
                  type="button"
                  disabled={
                    !showBasicInfoForm.formState.isValid || !showDetailInfoForm.formState.isValid || imageFiles.length === 0 || show.isEnded
                  }
                  onClick={() => {
                    setPreviewDrawerOpen(true);
                  }}
                >
                  저장하기
                </Button>
              </Styled.SaveButton>
            </Styled.ShowInfoFormFooter>
          </Styled.ShowInfoForm>
          <Styled.ShowInfoFormDivider />
          <Styled.ShowInfoFormContent>
            <ShowCastInfoFormContent
              onSave={async ({ name, members }: TempShowCastInfoFormInput) => {
                await postCastTeams.mutateAsync(
                  {
                    showId,
                    name,
                    members: members
                      ?.filter(({ userCode, roleName }) => userCode && roleName)
                      .map(({ id, userCode, roleName }) => ({
                        id: id < 0 ? undefined : id,
                        userCode,
                        roleName,
                      })) as ShowCastTeamCreateOrUpdateRequest['members'],
                  },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries(queryKeys.castTeams.list(showId));
                    },
                  },
                );
              }}
            />
            <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} collisionDetection={closestCenter} onDragEnd={castTeamDragEndHandler}>
              <SortableContext items={castTeamListDraft.map((info) => info.id)} strategy={verticalListSortingStrategy}>
                {castTeamListDraft?.map((info) => (
                  <ShowCastInfo
                    key={info.id}
                    showCastInfo={info}
                    onSave={async ({ name, members }: TempShowCastInfoFormInput) => {
                      if (info.id === undefined) return;

                      await putCastTeams.mutateAsync(
                        {
                          name,
                          members: members
                            ?.filter(({ userCode, roleName }) => userCode && roleName)
                            .map(({ id, userCode, roleName }) => ({
                              id: id < 0 ? undefined : id,
                              userCode,
                              roleName,
                            })) as ShowCastTeamCreateOrUpdateRequest['members'],
                          castTeamId: info.id,
                        },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries(queryKeys.castTeams.list(showId));
                          },
                        },
                      );
                    }}
                    onDelete={async () => {
                      if (info.id === undefined) return;

                      await deleteCastTeams.mutateAsync(info.id, {
                        onSuccess: () => {
                          queryClient.invalidateQueries(queryKeys.castTeams.list(showId));
                        },
                      });
                    }}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </Styled.ShowInfoFormContent>
          <Styled.ShowInfoFormFooter>
            <Styled.DeleteButton>
              <Button
                size="bold"
                colorTheme="line"
                type="button"
                disabled={salesStarted || show.isEnded}
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
                삭제하기
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
                    <Styled.ShowPreview ref={showPreviewRef}>
                      <ShowPreview
                        show={{
                          images: imageFiles.map((file) => file.preview),
                          name: showBasicInfoForm.watch('name') ? showBasicInfoForm.watch('name') : '',
                          date: showBasicInfoForm.watch('date')
                            ? format(showBasicInfoForm.watch('date'), 'yyyy.MM.dd (E)')
                            : '',
                          startTime: showBasicInfoForm.watch('startTime'),
                          runningTime: showBasicInfoForm.watch('runningTime'),
                          salesStartTime: showSalesInfo
                            ? format(showSalesInfo.salesStartTime, 'yyyy.MM.dd (E)')
                            : '',
                          salesEndTime: showSalesInfo
                            ? format(showSalesInfo.salesEndTime, 'yyyy.MM.dd (E)')
                            : '',
                          placeName: showBasicInfoForm.watch('placeName'),
                          placeStreetAddress: showBasicInfoForm.watch('placeStreetAddress'),
                          placeDetailAddress: showBasicInfoForm.watch('placeDetailAddress'),
                          notice: showDetailInfoForm.watch('notice'),
                          hostName: showDetailInfoForm.watch('hostName'),
                          hostPhoneNumber: showDetailInfoForm.watch('hostPhoneNumber'),
                        }}
                        showCastTeams={castTeamList}
                        hasNoticePage
                        containerRef={showPreviewRef}
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
                  onClick={submitHandler}
                >
                  저장하기
                </Styled.ShowInfoPreviewSubmitButton>
              </Styled.ShowInfoPreviewFooter>
            </Styled.ShowInfoPreviewContainer>
          </Drawer>
          {previewDrawerOpen && (
            <Portal>
              <Styled.ShowInfoPreviewMobile ref={showPreviewMobileRef}>
                <Styled.ShowInfoPreview>
                  <ShowPreview
                    show={{
                      images: imageFiles.map((file) => file.preview),
                      name: showBasicInfoForm.watch('name') ? showBasicInfoForm.watch('name') : '',
                      date: showBasicInfoForm.watch('date')
                        ? format(showBasicInfoForm.watch('date'), 'yyyy.MM.dd (E)')
                        : '',
                      startTime: showBasicInfoForm.watch('startTime'),
                      runningTime: showBasicInfoForm.watch('runningTime'),
                      salesStartTime: showSalesInfo
                        ? format(showSalesInfo.salesStartTime, 'yyyy.MM.dd (E)')
                        : '',
                      salesEndTime: showSalesInfo
                        ? format(showSalesInfo.salesEndTime, 'yyyy.MM.dd (E)')
                        : '',
                      placeName: showBasicInfoForm.watch('placeName'),
                      placeStreetAddress: showBasicInfoForm.watch('placeStreetAddress'),
                      placeDetailAddress: showBasicInfoForm.watch('placeDetailAddress'),
                      notice: showDetailInfoForm.watch('notice'),
                      hostName: showDetailInfoForm.watch('hostName'),
                      hostPhoneNumber: showDetailInfoForm.watch('hostPhoneNumber'),
                    }}
                    showCastTeams={castTeamList}
                    hasNoticePage
                    containerRef={showPreviewMobileRef}
                  />
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
                    onClick={submitHandler}
                  >
                    저장하기
                  </Styled.ShowInfoPreviewSubmitButton>
                </Styled.ShowInfoPreviewFooter>
              </Styled.ShowInfoPreviewMobile>
            </Portal>
          )}
        </Styled.ShowInfoPage>
      )}
    </>
  );
};

export default ShowInfoPage;

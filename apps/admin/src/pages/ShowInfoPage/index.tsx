import {
  ImageFile,
  ShowImage,
  useCastTeamList,
  useEditShowInfo,
  useShowDetail,
  useShowSalesInfo,
  useUploadShowImage,
} from '@boolti/api';
import { Button, Drawer, ShowPreview, useConfirm, useToast } from '@boolti/ui';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { middlewareAtom, myHostInfoAtom } from '~/components/ShowDetailLayout';
import ShowBasicInfoFormContent from '~/components/ShowInfoFormContent/ShowBasicInfoFormContent';
import ShowDetailInfoFormContent from '~/components/ShowInfoFormContent/ShowDetailInfoFormContent';
import {
  ShowBasicInfoFormInputs,
  ShowDetailInfoFormInputs,
} from '~/components/ShowInfoFormContent/types';

import PreviewFrame from './PreviewFrame';
import Styled from './ShowInfoPage.styles';
import { useAtom, useSetAtom } from 'jotai';
import { HostType } from '@boolti/api/src/types/host';
import ShowDetailUnauthorized, { PAGE_PERMISSION } from '~/components/ShowDetailUnauthorized';
import Portal from '@boolti/ui/src/components/Portal';
import ShowCastInfoFormContent from '~/components/ShowInfoFormContent/ShowCastInfoFormContent';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { TempShowCastInfoFormInput } from '~/components/ShowCastInfoFormDialogContent';

const ShowInfoPage = () => {
  const params = useParams<{ showId: string }>();
  const [myHostInfo] = useAtom(myHostInfoAtom);
  const showPreviewRef = useRef<HTMLDivElement>(null);
  const showPreviewMobileRef = useRef<HTMLDivElement>(null);
  const initialCastTeamListRef = useRef<string | null>(null);

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [showImages, setShowImages] = useState<ShowImage[]>([]);
  const [castTeamListDraft, setCastTeamListDraft] = useState<TempShowCastInfoFormInput[] | null>(
    null,
  );
  const isImageFilesDirty = imageFiles.some((file) => file.preview.startsWith('blob:'));
  const isCastTeamListDraftDirty =
    initialCastTeamListRef.current !== JSON.stringify(castTeamListDraft);
  const showBasicInfoForm = useForm<ShowBasicInfoFormInputs>();
  const showDetailInfoForm = useForm<ShowDetailInfoFormInputs>();

  const showId = Number(params!.showId);
  const { data: show, refetch: refetchShowDetail } = useShowDetail(showId);
  const { data: showSalesInfo, refetch: refetchShowSalesInfo } = useShowSalesInfo(showId);
  const { data: castTeamList, refetch: refetchCastTeamList } = useCastTeamList(showId);

  const editShowInfoMutation = useEditShowInfo();
  const uploadShowImageMutation = useUploadShowImage();

  const isNonTicketingShow =
    showSalesInfo?.salesEndTime === undefined && showSalesInfo?.salesStartTime === undefined;

  const isSaveButtonDisabled = useMemo(
    () =>
      !showBasicInfoForm.formState.isValid ||
      !showDetailInfoForm.formState.isValid ||
      imageFiles.length === 0 ||
      (!isNonTicketingShow && show?.isEnded),
    [
      imageFiles.length,
      isNonTicketingShow,
      show?.isEnded,
      showBasicInfoForm.formState.isValid,
      showDetailInfoForm.formState.isValid,
    ],
  );

  const toast = useToast();
  const confirm = useConfirm();

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
      showDetailInfoForm.trigger(),
    ]);

    if (!isValidShowBasicInfoFormInputs || !isValidShowDetailInfoFormInputs) return;

    const showBasicInfoFormInputs = showBasicInfoForm.getValues();
    const showDetailInfoFormInputs = showDetailInfoForm.getValues();
    const castTeams =
      castTeamListDraft?.map((team) => ({
        id: team.id >= 0 ? team.id : undefined,
        name: team.name,
        members: team.members?.map((member) => ({
          id: member.id >= 0 ? member.id : undefined,
          roleName: member.roleName ?? '',
          userCode: member.userCode ?? '',
        })),
      })) ?? [];

    await editShowInfoMutation.mutateAsync(
      {
        showId,
        body: {
          name: showBasicInfoFormInputs.name,
          images: [...showImages, ...newShowImages].map((image, index) => ({
            sequence: index + 1,
            thumbnailPath: image.thumbnailPath,
            path: image.path,
          })),
          latitude: showBasicInfoForm.getValues('latitude'),
          longitude: showBasicInfoForm.getValues('longitude'),
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
          castTeams,
        },
      },
      {
        onSuccess: () => {
          refetchShowDetail();
          refetchShowSalesInfo();
          refetchCastTeamList();

          toast.success('공연 정보를 저장했습니다.');
          setPreviewDrawerOpen(false);
        },
      },
    );
  }, [
    castTeamListDraft,
    editShowInfoMutation,
    imageFiles,
    refetchCastTeamList,
    refetchShowDetail,
    refetchShowSalesInfo,
    show,
    showBasicInfoForm,
    showDetailInfoForm,
    showId,
    showImages,
    toast,
    uploadShowImageMutation,
  ]);

  const confirmSaveShowInfo = useCallback(async () => {
    const isDirty =
      Object.values(showBasicInfoForm.formState.dirtyFields).some((value) => value) ||
      Object.values(showDetailInfoForm.formState.dirtyFields).some((value) => value) ||
      isImageFilesDirty ||
      isCastTeamListDraftDirty;

    if (!isDirty) return true;

    const result = await confirm(
      <Styled.ConfirmMessageContainer>
        <Styled.ConfirmMessage>
          저장하지 않고 이 페이지를 나가면 작성한 정보가 손실됩니다.
          <br />이 페이지를 나갈까요?
        </Styled.ConfirmMessage>
        <Styled.ConfirmSubMessage>
          *페이지 하단의 [저장하기] 버튼을 눌러 정보를 저장할 수 있습니다.
        </Styled.ConfirmSubMessage>
      </Styled.ConfirmMessageContainer>,
      {
        cancel: '나가기',
        confirm: '머무르기',
      },
    );

    return !result;
  }, [showBasicInfoForm, showDetailInfoForm, isImageFilesDirty, isCastTeamListDraftDirty, confirm]);

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
    if (!castTeamList) return;

    const initialCastTeamList = castTeamList.map((team) => ({
      id: team.id,
      name: team.name,
      members: team.members,
    }));

    setCastTeamListDraft(initialCastTeamList);
    initialCastTeamListRef.current = JSON.stringify(initialCastTeamList);
  }, [castTeamList]);

  useEffect(() => {
    setMiddleware(() => confirmSaveShowInfo);
    return () => {
      setMiddleware(undefined);
    };
  }, [confirmSaveShowInfo, setMiddleware]);

  if (!show || !showSalesInfo || !castTeamList || !myHostInfo) {
    return null;
  }

  if (!PAGE_PERMISSION['공연 정보'].includes(myHostInfo.type)) {
    return (
      <ShowDetailUnauthorized
        pageName={'공연 정보'}
        name={myHostInfo.hostName as string}
        type={myHostInfo.type as HostType}
      />
    );
  }

  return (
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
        <Styled.ShowInfoFormContent style={{ marginBottom: '48px' }}>
          <ShowDetailInfoFormContent form={showDetailInfoForm} disabled={show.isEnded} />
        </Styled.ShowInfoFormContent>
        <Styled.ShowInfoFormContent>
          {castTeamListDraft && (
            <ShowCastInfoFormContent
              initialCastTeamList={castTeamListDraft}
              onChange={(data) => {
                setCastTeamListDraft(data);
              }}
            />
          )}
        </Styled.ShowInfoFormContent>
        <Styled.ShowInfoFormFooter>
          <Styled.SaveButton>
            <Button
              size="bold"
              colorTheme="primary"
              type="button"
              disabled={isSaveButtonDisabled}
              onClick={() => {
                setPreviewDrawerOpen(true);
              }}
            >
              저장하기
            </Button>
          </Styled.SaveButton>
        </Styled.ShowInfoFormFooter>
      </Styled.ShowInfoForm>
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
                      latitude: showBasicInfoForm.watch('latitude'),
                      longitude: showBasicInfoForm.watch('longitude'),
                      salesStartTime: showSalesInfo.salesStartTime
                        ? format(showSalesInfo.salesStartTime, 'yyyy.MM.dd (E)')
                        : '',
                      salesEndTime: showSalesInfo.salesEndTime
                        ? format(showSalesInfo.salesEndTime, 'yyyy.MM.dd (E)')
                        : '',
                      placeName: showBasicInfoForm.watch('placeName'),
                      streetAddress: showBasicInfoForm.watch('placeStreetAddress'),
                      detailAddress: showBasicInfoForm.watch('placeDetailAddress'),
                      notice: showDetailInfoForm.watch('notice'),
                      hostName: showDetailInfoForm.watch('hostName'),
                      hostPhoneNumber: showDetailInfoForm.watch('hostPhoneNumber'),
                    }}
                    showCastTeams={
                      castTeamListDraft?.map((team) => ({
                        name: team.name,
                        members: team.members?.map((member) => ({
                          roleName: member.roleName ?? '',
                          userNickname: member.userNickname ?? '',
                          userImgPath: member.userImgPath ?? '',
                        })),
                      })) ?? []
                    }
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
            <Styled.ShowInfoPreviewSubmitButton type="button" onClick={submitHandler}>
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
                  salesStartTime: showSalesInfo.salesStartTime
                    ? format(showSalesInfo.salesStartTime, 'yyyy.MM.dd (E)')
                    : '',
                  salesEndTime: showSalesInfo.salesEndTime
                    ? format(showSalesInfo.salesEndTime, 'yyyy.MM.dd (E)')
                    : '',
                  placeName: showBasicInfoForm.watch('placeName'),
                  streetAddress: showBasicInfoForm.watch('placeStreetAddress'),
                  detailAddress: showBasicInfoForm.watch('placeDetailAddress'),
                  notice: showDetailInfoForm.watch('notice'),
                  hostName: showDetailInfoForm.watch('hostName'),
                  hostPhoneNumber: showDetailInfoForm.watch('hostPhoneNumber'),
                }}
                showCastTeams={
                  castTeamListDraft?.map((team) => ({
                    name: team.name,
                    members: team.members?.map((member) => ({
                      roleName: member.roleName ?? '',
                      userNickname: member.userNickname ?? '',
                      userImgPath: member.userImgPath ?? '',
                    })),
                  })) ?? []
                }
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
              <Styled.ShowInfoPreviewSubmitButton type="button" onClick={submitHandler}>
                저장하기
              </Styled.ShowInfoPreviewSubmitButton>
            </Styled.ShowInfoPreviewFooter>
          </Styled.ShowInfoPreviewMobile>
        </Portal>
      )}
    </Styled.ShowInfoPage>
  );
};

export default ShowInfoPage;

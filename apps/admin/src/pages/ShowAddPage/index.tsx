import {
  ImageFile,
  ShowCastTeamCreateOrUpdateRequest,
  useAddShow,
  useUploadShowImage,
} from '@boolti/api';
import { ArrowLeftIcon } from '@boolti/icon';
import { Button, StepProgressBar, useToast } from '@boolti/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import ShowBasicInfoFormContent from '~/components/ShowInfoFormContent/ShowBasicInfoFormContent';
import ShowDetailInfoFormContent from '~/components/ShowInfoFormContent/ShowDetailInfoFormContent';
import ShowInvitationTicketFormContent, {
  InvitationTicket,
} from '~/components/ShowInfoFormContent/ShowInvitationTicketFormContent';
import ShowSalesTicketFormContent, {
  SalesTicket,
} from '~/components/ShowInfoFormContent/ShowSalesTicketFormContent';
import ShowTicketInfoFormContent from '~/components/ShowInfoFormContent/ShowTicketInfoFormContent';
import { ShowBasicInfoFormInputs, ShowDetailInfoFormInputs, ShowSalesInfoFormInputs } from '~/components/ShowInfoFormContent/types';
import { PATH } from '~/constants/routes';

import Styled from './ShowAddPage.styles';
import ShowCastInfoFormContent from '~/components/ShowInfoFormContent/ShowCastInfoFormContent';
import ShowCastInfo from '~/components/ShowCastInfo';
import { TempShowCastInfoFormInput } from '~/components/ShowCastInfoFormDialogContent';
import { checkIsWebView } from '~/utils/webview';
import useCastTeamListOrder from '~/hooks/useCastTeamListOrder';

const stepItems = [
  { key: 'basic', title: '기본 정보' },
  { key: 'detail', title: '상세 정보' },
  { key: 'sales', title: '판매 정보' },
]

interface ShowAddPageProps {
  step: 'basic' | 'detail' | 'sales'
}

const ShowAddPage = ({ step }: ShowAddPageProps) => {
  const navigate = useNavigate();
  const isWebView = checkIsWebView(window.navigator.userAgent);

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [salesTicketList, setSalesTicketList] = useState<SalesTicket[]>([]);
  const [invitationTicketList, setInvitationTicketList] = useState<InvitationTicket[]>([]);

  const showBasicInfoForm = useForm<ShowBasicInfoFormInputs>();
  const showDetailInfoForm = useForm<ShowDetailInfoFormInputs>();
  const showSalesInfoForm = useForm<ShowSalesInfoFormInputs>();

  const uploadShowImageMutation = useUploadShowImage();
  const addShowMutation = useAddShow();
  const { castTeamListDraft, sensors, setCastTeamListDraft, castTeamDragEndHandler } = useCastTeamListOrder();

  const toast = useToast();

  const onSubmitBasicInfoForm: SubmitHandler<ShowBasicInfoFormInputs> = async () => {
    navigate(PATH.SHOW_ADD_DETAIL);
  };

  const onSubmitDetailInfoForm: SubmitHandler<ShowDetailInfoFormInputs> = async () => {
    navigate(PATH.SHOW_ADD_SALES);
  };

  const onSubmitSalesInfoForm: SubmitHandler<ShowSalesInfoFormInputs> = async () => {
    if (uploadShowImageMutation.status === 'loading' || addShowMutation.status === 'loading')
      return;

    // 공연 이미지 업로드
    const showImageInfo = await uploadShowImageMutation.mutateAsync(imageFiles);

    // 공연 생성
    await addShowMutation.mutateAsync({
      name: showBasicInfoForm.getValues('name'),
      images: showImageInfo,
      date: `${showBasicInfoForm.getValues('date')}T${showBasicInfoForm.getValues('startTime')}:00.000Z`,
      runningTime: Number(showBasicInfoForm.getValues('runningTime')),
      place: {
        name: showBasicInfoForm.getValues('placeName'),
        streetAddress: showBasicInfoForm.getValues('placeStreetAddress'),
        detailAddress: showBasicInfoForm.getValues('placeDetailAddress'),
      },
      notice: showDetailInfoForm.getValues('notice'),
      host: {
        name: showDetailInfoForm.getValues('hostName'),
        phoneNumber: showDetailInfoForm.getValues('hostPhoneNumber'),
      },
      salesStartTime: `${showSalesInfoForm.getValues('startDate')}T00:00:00.000Z`,
      salesEndTime: `${showSalesInfoForm.getValues('endDate')}T23:59:59.000Z`,
      ticketNotice: `${showSalesInfoForm.getValues('ticketNotice') ?? ''}`,
      salesTickets: salesTicketList.map((ticket) => ({
        ticketName: ticket.name,
        price: ticket.price,
        totalForSale: ticket.quantity,
      })),
      invitationTickets: invitationTicketList.map((ticket) => ({
        ticketName: ticket.name,
        totalForSale: ticket.quantity,
      })),
      castTeams: castTeamListDraft.map(({ name, members }) => ({
        name,
        members: members
          ?.filter(({ userCode, roleName }) => userCode && roleName)
          .map(({ userCode, roleName }) => ({
            userCode,
            roleName,
          })),
      })) as ShowCastTeamCreateOrUpdateRequest[],
    });

    navigate(PATH.SHOW_ADD_COMPLETE);
  };

  return (
    <>
      <Styled.ShowAddPage>
        {!isWebView && (
          <Styled.HeaderContainer>
            <Styled.Header>
              <Styled.BackButton
                type="button"
                onClick={() => {
                  navigate(PATH.HOME);
                }}
              >
                <ArrowLeftIcon />
              </Styled.BackButton>
              <Styled.HeaderText>홈</Styled.HeaderText>
            </Styled.Header>
          </Styled.HeaderContainer>
        )}
        <Styled.CardContainer>
          <Styled.Card>
            <Styled.CardHeader>
              <Styled.CardHeaderText>공연 등록</Styled.CardHeaderText>
            </Styled.CardHeader>
            <Styled.CardContent>
              <Styled.ProcessIndicator>
                <StepProgressBar width="175px" activeKey={step} items={stepItems} />
              </Styled.ProcessIndicator>
              {step === 'basic' && (
                <>
                  <Styled.CardDescription>
                    공연의 기본 정보를 입력해 주세요.
                    <br />
                    입력한 정보는 등록 후에도 수정할 수 있어요.
                  </Styled.CardDescription>
                  <Styled.ShowAddForm onSubmit={showBasicInfoForm.handleSubmit(onSubmitBasicInfoForm)}>
                    <Styled.ShowInfoFormContent>
                      <ShowBasicInfoFormContent
                        form={showBasicInfoForm}
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
                    <Button
                      size="bold"
                      colorTheme="primary"
                      type="submit"
                      disabled={
                        !showBasicInfoForm.formState.isDirty ||
                        !showBasicInfoForm.formState.isValid ||
                        imageFiles.length === 0
                      }
                    >
                      다음으로
                    </Button>
                  </Styled.ShowAddForm>
                </>
              )}
              {step === 'detail' && (
                <>
                  {(!showBasicInfoForm.formState.isDirty || !showBasicInfoForm.formState.isValid) && (
                    <Navigate to={PATH.SHOW_ADD} replace />
                  )}
                  <Styled.CardDescription>
                    공연의 상세 정보를 입력해 주세요.
                    <br />
                    입력한 정보는 등록 후에도 수정할 수 있어요.
                  </Styled.CardDescription>
                  <Styled.ShowAddForm onSubmit={showDetailInfoForm.handleSubmit(onSubmitDetailInfoForm)}>
                    <Styled.ShowInfoFormContent>
                      <ShowDetailInfoFormContent form={showDetailInfoForm} />
                    </Styled.ShowInfoFormContent>
                    <Styled.ShowInfoFormContent>
                      <ShowCastInfoFormContent
                        onSave={(showCastInfoFormInput: TempShowCastInfoFormInput) => {
                          setCastTeamListDraft((prev) => [...prev, showCastInfoFormInput]);
                          return new Promise((reslve) => reslve());
                        }}
                      />
                      <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} collisionDetection={closestCenter} onDragEnd={castTeamDragEndHandler}>
                        <SortableContext items={castTeamListDraft.map((info) => info.id)} strategy={verticalListSortingStrategy}>
                          {castTeamListDraft.map((info) => (
                            <ShowCastInfo
                              key={info.id}
                              showCastInfo={info}
                              onSave={(showCastInfoFormInput: TempShowCastInfoFormInput) => {
                                setCastTeamListDraft((prev) =>
                                  prev.map((item) =>
                                    item.id === info.id ? showCastInfoFormInput : item,
                                  )
                                );
                                return new Promise((reslve) => reslve());
                              }}
                              onDelete={() => {
                                setCastTeamListDraft((prev) =>
                                  prev.filter((item) => item.id !== info.id)
                                );
                                return new Promise((reslve) => reslve());
                              }}
                            />
                          ))}
                        </SortableContext>
                      </DndContext>
                    </Styled.ShowInfoFormContent>
                    <Styled.ShowAddFormButtonContainer>
                      <Styled.ShowAddFormButton
                        width="152px"
                        type="button"
                        colorTheme="line"
                        size="bold"
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        이전으로
                      </Styled.ShowAddFormButton>
                      <Styled.ShowAddFormButton
                        width="calc(100% - 152px)"
                        type="submit"
                        colorTheme="primary"
                        size="bold"
                        disabled={
                          !showDetailInfoForm.formState.isDirty ||
                          !showDetailInfoForm.formState.isValid
                        }
                      >
                        다음으로
                      </Styled.ShowAddFormButton>
                    </Styled.ShowAddFormButtonContainer>
                  </Styled.ShowAddForm>
                </>
              )}
              {step === 'sales' && (
                <>
                  {(!showBasicInfoForm.formState.isDirty || !showBasicInfoForm.formState.isValid) &&
                    (!showDetailInfoForm.formState.isDirty || !showDetailInfoForm.formState.isValid) && (
                      <Navigate to={PATH.SHOW_ADD} replace />
                    )}
                  <Styled.CardDescription>
                    티켓 판매 기간을 설정하고 티켓을 생성해 주세요.
                    <br />
                    티켓은 판매 종료일까지 추가할 수 있어요.
                  </Styled.CardDescription>
                  <Styled.ShowAddForm onSubmit={showSalesInfoForm.handleSubmit(onSubmitSalesInfoForm)}>
                    <ShowTicketInfoFormContent
                      form={showSalesInfoForm}
                      showDate={showBasicInfoForm.watch('date')}
                    />
                    <Styled.TicketGroupContainer>
                      <ShowSalesTicketFormContent
                        fullEditable
                        salesTicketList={salesTicketList}
                        onSubmitTicket={(ticket) => {
                          setSalesTicketList((prevList) =>
                            [...prevList, ticket].map((ticket) => ({
                              name: ticket.name,
                              price: Number(ticket.price),
                              quantity: Number(ticket.totalForSale),
                              totalForSale: Number(ticket.totalForSale),
                            })),
                          );
                          toast.success('일반 티켓을 생성했습니다.');
                        }}
                        onDeleteTicket={(ticket) => {
                          setSalesTicketList((prevList) =>
                            prevList.filter((prevTicket) => prevTicket.name !== ticket.name),
                          );
                          toast.success('티켓을 삭제했습니다.');
                        }}
                      />
                      <ShowInvitationTicketFormContent
                        fullEditable
                        invitationTicketList={invitationTicketList}
                        description={
                          <>
                            초청 티켓 이용을 원하시면 티켓을 생성해주세요.
                            <br />* 초청 코드는 공연 등록 후{' '}
                            <strong>공연 관리 &gt; 티켓 관리</strong>
                            에서 확인할 수 있습니다.
                          </>
                        }
                        onSubmitTicket={(ticket) => {
                          setInvitationTicketList((prevList) =>
                            [...prevList, ticket].map((ticket) => ({
                              name: ticket.name,
                              quantity: Number(ticket.totalForSale),
                              totalForSale: Number(ticket.totalForSale),
                            })),
                          );
                          toast.success('초청 티켓을 생성했습니다.');
                        }}
                        onDeleteTicket={(ticket) => {
                          setInvitationTicketList((prevList) =>
                            prevList.filter((prevTicket) => prevTicket.name !== ticket.name),
                          );
                          toast.success('티켓을 삭제했습니다.');
                        }}
                      />
                    </Styled.TicketGroupContainer>
                    <Styled.ShowAddFormButtonContainer>
                      <Styled.ShowAddFormButton
                        width="152px"
                        type="button"
                        colorTheme="line"
                        size="bold"
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        이전으로
                      </Styled.ShowAddFormButton>
                      <Styled.ShowAddFormButton
                        width="calc(100% - 152px)"
                        type="submit"
                        colorTheme="primary"
                        size="bold"
                        disabled={
                          !showSalesInfoForm.formState.isDirty ||
                          !showSalesInfoForm.formState.isValid ||
                          salesTicketList.length === 0
                        }
                      >
                        공연 등록 완료하기
                      </Styled.ShowAddFormButton>
                    </Styled.ShowAddFormButtonContainer>
                  </Styled.ShowAddForm>
                </>
              )}
            </Styled.CardContent>
          </Styled.Card>
        </Styled.CardContainer>
      </Styled.ShowAddPage>
      <Styled.MobileShowAddPage>
        {!isWebView && (
          <Styled.MobileHeader>
            <Styled.BackButton
              type="button"
              onClick={() => {
                navigate(PATH.HOME);
              }}
            >
              <ArrowLeftIcon />
            </Styled.BackButton>
            <Styled.MobileHeaderText>공연 등록</Styled.MobileHeaderText>
          </Styled.MobileHeader>
        )}
        {step === 'basic' && (
          <Styled.MobileContent>
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
            <Styled.MobileDescription>
              등록하려는 공연의 정보를 입력해 주세요.
              <br />
              입력한 정보는 등록 후에도 수정할 수 있어요.
            </Styled.MobileDescription>
            <Styled.ShowAddForm onSubmit={showBasicInfoForm.handleSubmit(onSubmitBasicInfoForm)}>
              <Styled.ShowInfoFormContent>
                <ShowBasicInfoFormContent
                  form={showBasicInfoForm}
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
              <Styled.ShowInfoFormContent>
                <ShowDetailInfoFormContent form={showDetailInfoForm} />
              </Styled.ShowInfoFormContent>
              <Styled.ShowInfoFormContent>
                <ShowCastInfoFormContent
                  onSave={(showCastInfoFormInput: TempShowCastInfoFormInput) => {
                    setCastTeamListDraft((prev) => [...prev, showCastInfoFormInput]);
                    return new Promise((reslve) => reslve());
                  }}
                />
                <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} collisionDetection={closestCenter} onDragEnd={castTeamDragEndHandler}>
                  <SortableContext items={castTeamListDraft.map((info) => info.id)} strategy={verticalListSortingStrategy}>
                    {castTeamListDraft.map((info) => (
                      <ShowCastInfo
                        key={info.id}
                        showCastInfo={info}
                        onSave={(showCastInfoFormInput: TempShowCastInfoFormInput) => {
                          setCastTeamListDraft((prev) =>
                            prev.map((item) =>
                              item.id === info.id ? showCastInfoFormInput : item,
                            )
                          );
                          return new Promise((reslve) => reslve());
                        }}
                        onDelete={() => {
                          setCastTeamListDraft((prev) =>
                            prev.filter((item) => item.id !== info.id)
                          );
                          return new Promise((reslve) => reslve());
                        }}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </Styled.ShowInfoFormContent>
              <Button
                size="bold"
                colorTheme="primary"
                type="submit"
                disabled={
                  !showBasicInfoForm.formState.isDirty ||
                  !showBasicInfoForm.formState.isValid ||
                  imageFiles.length === 0
                }
              >
                다음으로
              </Button>
            </Styled.ShowAddForm>
          </Styled.MobileContent>
        )}
        {step === 'detail' && (
          <Styled.MobileContent>
            <Styled.ProcessIndicator>
              <Styled.ProcessIndicatorItem active>
                <Styled.ProcessIndicatorDot active />
                <Styled.ProcessIndicatorText active>정보 입력</Styled.ProcessIndicatorText>
              </Styled.ProcessIndicatorItem>
              <Styled.ProcessIndicatorItem active>
                <Styled.ProcessIndicatorDot active currentStep />
                <Styled.ProcessIndicatorText active>티켓 생성</Styled.ProcessIndicatorText>
              </Styled.ProcessIndicatorItem>
            </Styled.ProcessIndicator>
            <Styled.MobileDescription>
              티켓 판매 기간을 설정하고 티켓을 생성해 주세요.
              <br />
              티켓은 판매 종료일까지 추가할 수 있어요.
            </Styled.MobileDescription>
            <Styled.ShowAddForm onSubmit={showSalesInfoForm.handleSubmit(onSubmitSalesInfoForm)}>
              <ShowTicketInfoFormContent
                form={showSalesInfoForm}
                showDate={showBasicInfoForm.watch('date')}
              />
              <Styled.TicketGroupContainer>
                <ShowSalesTicketFormContent
                  fullEditable
                  salesTicketList={salesTicketList}
                  onSubmitTicket={(ticket) => {
                    setSalesTicketList((prevList) =>
                      [...prevList, ticket].map((ticket) => ({
                        name: ticket.name,
                        price: Number(ticket.price),
                        quantity: Number(ticket.totalForSale),
                        totalForSale: Number(ticket.totalForSale),
                      })),
                    );
                    toast.success('일반 티켓을 생성했습니다.');
                  }}
                  onDeleteTicket={(ticket) => {
                    setSalesTicketList((prevList) =>
                      prevList.filter((prevTicket) => prevTicket.name !== ticket.name),
                    );
                    toast.success('티켓을 삭제했습니다.');
                  }}
                />
                <ShowInvitationTicketFormContent
                  fullEditable
                  invitationTicketList={invitationTicketList}
                  description={
                    <>
                      초청 티켓 이용을 원하시면 티켓을 생성해주세요.
                      <br />* 초청 코드는 공연 등록 후 <strong>공연 관리 &gt; 티켓 관리</strong>
                      에서 확인할 수 있습니다.
                    </>
                  }
                  onSubmitTicket={(ticket) => {
                    setInvitationTicketList((prevList) =>
                      [...prevList, ticket].map((ticket) => ({
                        name: ticket.name,
                        quantity: Number(ticket.totalForSale),
                        totalForSale: Number(ticket.totalForSale),
                      })),
                    );
                    toast.success('초청 티켓을 생성했습니다.');
                  }}
                  onDeleteTicket={(ticket) => {
                    setInvitationTicketList((prevList) =>
                      prevList.filter((prevTicket) => prevTicket.name !== ticket.name),
                    );
                    toast.success('티켓을 삭제했습니다.');
                  }}
                />
              </Styled.TicketGroupContainer>
              <Styled.ShowAddFormButtonContainer>
                <Styled.ShowAddFormButton
                  width="100px"
                  type="button"
                  colorTheme="line"
                  size="bold"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  이전으로
                </Styled.ShowAddFormButton>
                <Styled.ShowAddFormButton
                  width="calc(100% - 100px)"
                  type="submit"
                  colorTheme="primary"
                  size="bold"
                  disabled={
                    !showSalesInfoForm.formState.isDirty ||
                    !showSalesInfoForm.formState.isValid ||
                    salesTicketList.length === 0
                  }
                >
                  공연 등록
                </Styled.ShowAddFormButton>
              </Styled.ShowAddFormButtonContainer>
            </Styled.ShowAddForm>
          </Styled.MobileContent>
        )}
      </Styled.MobileShowAddPage>
    </>
  );
};

export default ShowAddPage;

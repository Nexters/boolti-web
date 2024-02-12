import { ImageFile, useAddShow, useUploadShowImage } from '@boolti/api';
import { ArrowLeftIcon } from '@boolti/icon';
import { Button } from '@boolti/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import ShowBasicInfoFormContent from '~/components/ShowInfoFormContent/ShowBasicInfoFormContent';
import ShowDetailInfoFormContent from '~/components/ShowInfoFormContent/ShowDetailInfoFormContent';
import ShowInvitationTicketFormContent from '~/components/ShowInfoFormContent/ShowInvitationTicketFormContent';
import ShowSalesTicketFormContent from '~/components/ShowInfoFormContent/ShowSalesTicketFormContent';
import ShowTicketInfoFormContent from '~/components/ShowInfoFormContent/ShowTicketInfoFormContent';
import { ShowInfoFormInputs, ShowTicketFormInputs } from '~/components/ShowInfoFormContent/types';
import { InvitationTicketFormInputs } from '~/components/TicketForm/InvitationTicketForm';
import { SalesTicketFormInputs } from '~/components/TicketForm/SalesTicketForm';
import { PATH } from '~/constants/routes';

import Styled from './ShowAddPage.styles';

interface ShowAddPageProps {
  step: 'info' | 'ticket';
}

const ShowAddPage = ({ step }: ShowAddPageProps) => {
  const navigate = useNavigate();

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [salesTicketList, setSalesTicketList] = useState<SalesTicketFormInputs[]>([]);
  const [invitationTicketList, setInvitationTicketList] = useState<InvitationTicketFormInputs[]>(
    [],
  );

  const showInfoForm = useForm<ShowInfoFormInputs>();
  const showTicketForm = useForm<ShowTicketFormInputs>();

  const uploadShowImageMutation = useUploadShowImage();
  const addShowMutation = useAddShow();

  const onSubmitInfoForm: SubmitHandler<ShowInfoFormInputs> = async () => {
    navigate(PATH.SHOW_ADD_TICKET);
  };

  const onSubmitTicketForm: SubmitHandler<ShowTicketFormInputs> = async () => {
    // 공연 이미지 업로드
    const showImageInfo = await uploadShowImageMutation.mutateAsync(imageFiles);

    // 공연 생성
    await addShowMutation.mutateAsync({
      name: showInfoForm.getValues('name'),
      images: showImageInfo.map((info) => ({
        sequence: info.sequence,
        thumbnailPath: info.thumbnailUrl,
        path: info.imageUrl,
      })),
      date: `${showInfoForm.getValues('date')}T${showInfoForm.getValues('startTime')}:00.000Z`,
      runningTime: Number(showInfoForm.getValues('runningTime')),
      place: {
        name: showInfoForm.getValues('placeName'),
        streetAddress: showInfoForm.getValues('placeStreetAddress'),
        detailAddress: showInfoForm.getValues('placeDetailAddress'),
      },
      notice: showInfoForm.getValues('notice'),
      host: {
        name: showInfoForm.getValues('hostName'),
        phoneNumber: showInfoForm.getValues('hostPhoneNumber'),
      },
      salesStartTime: `${showTicketForm.getValues('startDate')}T00:00:00.000Z`,
      salesEndTime: `${showTicketForm.getValues('endDate')}T23:59:59.000Z`,
      ticketNotice: `${showTicketForm.getValues('ticketNotice')}`,
      salesTickets: salesTicketList.map((ticket) => ({
        ticketName: ticket.name,
        price: ticket.price,
        totalForSale: ticket.quantity,
      })),
      invitationTickets: invitationTicketList.map((ticket) => ({
        ticketName: ticket.name,
        totalForSale: ticket.quantity,
      })),
    });

    navigate(PATH.SHOW_ADD_COMPLETE);
  };

  return (
    <Styled.ShowAddPage>
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
          <Styled.HeaderText>주최자 홈</Styled.HeaderText>
        </Styled.Header>
      </Styled.HeaderContainer>
      <Styled.CardContainer>
        <Styled.Card>
          {step === 'info' && (
            <>
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
                <Styled.ShowAddForm onSubmit={showInfoForm.handleSubmit(onSubmitInfoForm)}>
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
                  <Styled.ShowInfoFormContent>
                    <ShowDetailInfoFormContent form={showInfoForm} />
                  </Styled.ShowInfoFormContent>
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
                    다음으로
                  </Button>
                </Styled.ShowAddForm>
              </Styled.CardContent>
            </>
          )}
          {step === 'ticket' && (
            <>
              {(!showInfoForm.formState.isDirty || !showInfoForm.formState.isValid) && (
                <Navigate to={PATH.SHOW_ADD} replace />
              )}
              <Styled.CardHeader>
                <Styled.CardHeaderText>티켓 생성</Styled.CardHeaderText>
              </Styled.CardHeader>
              <Styled.CardContent>
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
                <Styled.CardDescription>
                  등록하려는 공연의 정보를 입력해 주세요.
                  <br />
                  공연 정보는 티켓 판매 시작 전까지 수정할 수 있어요.
                </Styled.CardDescription>
                <Styled.ShowAddForm onSubmit={showTicketForm.handleSubmit(onSubmitTicketForm)}>
                  <ShowTicketInfoFormContent
                    form={showTicketForm}
                    showDate={showInfoForm.watch('date')}
                  />
                  <Styled.TicketGroupContainer>
                    <ShowSalesTicketFormContent
                      salesTicketList={salesTicketList}
                      onSubmitTicket={(ticket) => {
                        setSalesTicketList((prevList) => [...prevList, ticket]);
                      }}
                      onDeleteTicket={(ticket) => {
                        setSalesTicketList((prevList) =>
                          prevList.filter((prevTicket) => prevTicket.name !== ticket.name),
                        );
                      }}
                    />
                    <ShowInvitationTicketFormContent
                      invitationTicketList={invitationTicketList}
                      onSubmitTicket={(ticket) => {
                        setInvitationTicketList((prevList) => [...prevList, ticket]);
                      }}
                      onDeleteTicket={(ticket) => {
                        setInvitationTicketList((prevList) =>
                          prevList.filter((prevTicket) => prevTicket.name !== ticket.name),
                        );
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
                        !showTicketForm.formState.isDirty ||
                        !showTicketForm.formState.isValid ||
                        salesTicketList.length === 0
                      }
                    >
                      공연 등록 완료하기
                    </Styled.ShowAddFormButton>
                  </Styled.ShowAddFormButtonContainer>
                </Styled.ShowAddForm>
              </Styled.CardContent>
            </>
          )}
        </Styled.Card>
      </Styled.CardContainer>
    </Styled.ShowAddPage>
  );
};

export default ShowAddPage;

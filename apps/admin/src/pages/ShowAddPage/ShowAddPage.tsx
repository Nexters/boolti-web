import { ImageFile, useAddShow, useUploadShowImage } from '@boolti/api';
import { ArrowLeftIcon, PlusIcon } from '@boolti/icon';
import { Badge, Button, TextField, useDialog } from '@boolti/ui';
import { format } from 'date-fns/format';
import { sub } from 'date-fns/sub';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import ShowBasicInfoFormContent from '~/components/ShowInfoFormContent/ShowBasicInfoFormContent';
import ShowDetailInfoFormContent from '~/components/ShowInfoFormContent/ShowDetailInfoFormContent';
import { ShowInfoFormInputs } from '~/components/ShowInfoFormContent/types';
import GeneralTicketDialogContent, {
  GeneralTicketFormInputs,
} from '~/components/TicketForm/GeneralTicketForm';
import InvitationTicketForm, {
  InvitationTicketFormInputs,
} from '~/components/TicketForm/InvitationTicketForm';
import { PATH } from '~/constants/routes';

import Styled from './ShowAddPage.styles';

interface ShowTicketFormInputs {
  startDate: string;
  endDate: string;
  ticketNotice: string;
}

interface ShowAddPageProps {
  step: 'info' | 'ticket';
}

const ShowAddPage = ({ step }: ShowAddPageProps) => {
  const navigate = useNavigate();

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [generalTicketList, setGeneralTicketList] = useState<GeneralTicketFormInputs[]>([]);
  const [invitationTicketList, setInvitationTicketList] = useState<InvitationTicketFormInputs[]>(
    [],
  );

  const showInfoForm = useForm<ShowInfoFormInputs>();
  const showTicketForm = useForm<ShowTicketFormInputs>();

  const generalTicketDialog = useDialog();
  const invitationTicketDialog = useDialog();

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
      salesTickets: generalTicketList.map((ticket) => ({
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

  const onSubmitGeneralTicketForm: SubmitHandler<GeneralTicketFormInputs> = (data) => {
    setGeneralTicketList((prevList) => [...prevList, data]);
    generalTicketDialog.close();
  };

  const onSubmitInvitationTicketForm: SubmitHandler<InvitationTicketFormInputs> = (data) => {
    setInvitationTicketList((prevList) => [...prevList, data]);
    invitationTicketDialog.close();
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
                  <Styled.ShowAddFormGroup>
                    <Styled.ShowAddFormTitle>티켓 정보</Styled.ShowAddFormTitle>
                    <Styled.ShowAddFormRow>
                      <Styled.ShowAddFormContent>
                        <Styled.ShowAddFormRow>
                          <Styled.ShowAddFormContent>
                            <Styled.ShowAddFormLabel required>판매 시작일</Styled.ShowAddFormLabel>
                            <Styled.TextField>
                              <Controller
                                control={showTicketForm.control}
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
                                      sub(
                                        showInfoForm.watch('date')
                                          ? new Date(showInfoForm.watch('date'))
                                          : new Date(),
                                        { days: 1 },
                                      ),
                                      'yyyy-MM-dd',
                                    )}
                                    defaultValue={showTicketForm.watch('startDate') || ''}
                                    required
                                  />
                                )}
                                name="startDate"
                              />
                            </Styled.TextField>
                          </Styled.ShowAddFormContent>
                          <Styled.ShowAddFormContent>
                            <Styled.ShowAddFormLabel required>판매 종료일</Styled.ShowAddFormLabel>
                            <Styled.TextField>
                              <Controller
                                control={showTicketForm.control}
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
                                    min={format(
                                      showTicketForm.watch('startDate') || new Date(),
                                      'yyyy-MM-dd',
                                    )}
                                    max={format(
                                      sub(
                                        showInfoForm.watch('date')
                                          ? new Date(showInfoForm.watch('date'))
                                          : new Date(),
                                        { days: 1 },
                                      ),
                                      'yyyy-MM-dd',
                                    )}
                                    defaultValue={showTicketForm.watch('endDate') || ''}
                                    required
                                  />
                                )}
                                name="endDate"
                              />
                            </Styled.TextField>
                          </Styled.ShowAddFormContent>
                        </Styled.ShowAddFormRow>
                      </Styled.ShowAddFormContent>
                    </Styled.ShowAddFormRow>
                    <Styled.ShowAddFormRow>
                      <Styled.ShowAddFormContent>
                        <Styled.ShowAddFormLabel>티켓 구매 시 안내사항</Styled.ShowAddFormLabel>
                        <Styled.ShowAddFormDescription>
                          (ex. 주류반입이 불가한 공연장입니다. 드시던 음료는 입구에 놓고
                          입장해주세요.)
                        </Styled.ShowAddFormDescription>
                        <Styled.TextField>
                          <Styled.TextArea
                            placeholder="(ex. 공연 참가팀, 팀소개, 공연곡 소개 등)"
                            rows={10}
                            {...showTicketForm.register('ticketNotice')}
                          />
                        </Styled.TextField>
                      </Styled.ShowAddFormContent>
                    </Styled.ShowAddFormRow>
                  </Styled.ShowAddFormGroup>
                  <Styled.TicketGroupContainer>
                    <Styled.TicketGroup>
                      <Styled.TicketGroupHeader>
                        <Styled.TicketGroupInfo>
                          <Styled.TicketGroupTitle required>일반 티켓</Styled.TicketGroupTitle>
                          <Styled.TicketGroupDescription>
                            티켓 판매를 위해서는 최소 1개 이상의 티켓이 필요해요.
                            <br />* 1매 이상 판매된 티켓은 삭제할 수 없습니다.
                          </Styled.TicketGroupDescription>
                        </Styled.TicketGroupInfo>
                        <Styled.TicketAddButtonContainer>
                          <Button
                            type="button"
                            colorTheme="netural"
                            size="bold"
                            icon={<PlusIcon />}
                            onClick={() => {
                              generalTicketDialog.open({
                                title: '일반 티켓 생성하기',
                                content: (
                                  <GeneralTicketDialogContent
                                    onSubmit={onSubmitGeneralTicketForm}
                                  />
                                ),
                              });
                            }}
                          >
                            생성하기
                          </Button>
                        </Styled.TicketAddButtonContainer>
                      </Styled.TicketGroupHeader>
                      {generalTicketList.length > 0 && (
                        <Styled.TicketList>
                          {generalTicketList.map((ticket) => (
                            <Styled.Ticket key={ticket.name}>
                              <Styled.TicketInfo>
                                <Styled.TicketTitle>
                                  <Styled.TicketTitleText>{ticket.name}</Styled.TicketTitleText>
                                  <Badge colorTheme="red">
                                    재고 {ticket.quantity}/{ticket.quantity}
                                  </Badge>
                                </Styled.TicketTitle>
                                <Styled.TicketDescription>
                                  {ticket.price}원 · 1인당 1매
                                </Styled.TicketDescription>
                              </Styled.TicketInfo>
                              <Styled.TicketAction>
                                <Button
                                  type="button"
                                  colorTheme="line"
                                  size="bold"
                                  onClick={() => {
                                    setGeneralTicketList((prevList) =>
                                      prevList.filter(
                                        (prevTicket) => prevTicket.name !== ticket.name,
                                      ),
                                    );
                                  }}
                                >
                                  삭제하기
                                </Button>
                              </Styled.TicketAction>
                            </Styled.Ticket>
                          ))}
                        </Styled.TicketList>
                      )}
                    </Styled.TicketGroup>
                    <Styled.TicketGroup>
                      <Styled.TicketGroupHeader>
                        <Styled.TicketGroupInfo>
                          <Styled.TicketGroupTitle>초청 티켓</Styled.TicketGroupTitle>
                          <Styled.TicketGroupDescription>
                            초청 티켓 이용을 원하시면 티켓을 생성해주세요.
                            <br />* 초청 코드는 공연 등록 후{' '}
                            <strong>공연 관리 &gt; 티켓 관리</strong>에서 확인할 수 있습니다.
                          </Styled.TicketGroupDescription>
                        </Styled.TicketGroupInfo>
                        <Styled.TicketAddButtonContainer>
                          <Button
                            type="button"
                            colorTheme="netural"
                            size="bold"
                            icon={<PlusIcon />}
                            onClick={() => {
                              invitationTicketDialog.open({
                                title: '초청 티켓 생성하기',
                                content: (
                                  <InvitationTicketForm onSubmit={onSubmitInvitationTicketForm} />
                                ),
                              });
                            }}
                          >
                            생성하기
                          </Button>
                        </Styled.TicketAddButtonContainer>
                      </Styled.TicketGroupHeader>
                      {invitationTicketList.length > 0 && (
                        <Styled.TicketList>
                          {invitationTicketList.map((ticket) => (
                            <Styled.Ticket key={ticket.name}>
                              <Styled.TicketInfo>
                                <Styled.TicketTitle>
                                  <Styled.TicketTitleText>{ticket.name}</Styled.TicketTitleText>
                                  <Badge colorTheme="red">
                                    재고 {ticket.quantity}/{ticket.quantity}
                                  </Badge>
                                </Styled.TicketTitle>
                                <Styled.TicketDescription>1인당 1매</Styled.TicketDescription>
                              </Styled.TicketInfo>
                              <Styled.TicketAction>
                                <Button
                                  type="button"
                                  colorTheme="line"
                                  size="bold"
                                  onClick={() => {
                                    setInvitationTicketList((prevList) =>
                                      prevList.filter(
                                        (prevTicket) => prevTicket.name !== ticket.name,
                                      ),
                                    );
                                  }}
                                >
                                  삭제하기
                                </Button>
                              </Styled.TicketAction>
                            </Styled.Ticket>
                          ))}
                        </Styled.TicketList>
                      )}
                    </Styled.TicketGroup>
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
                        generalTicketList.length === 0
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

import {
  ImageFile,
  ShowCastTeamCreateOrUpdateRequest,
  useAddShow,
  useUploadShowImage,
} from '@boolti/api';
import { ArrowLeftIcon } from '@boolti/icon';
import { Button, Checkbox, StepProgressBar, useToast } from '@boolti/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import ShowBasicInfoFormContent from '~/components/ShowInfoFormContent/ShowBasicInfoFormContent';
import ShowDetailInfoFormContent from '~/components/ShowInfoFormContent/ShowDetailInfoFormContent';
import ShowInvitationTicketFormContent, {
  InvitationTicket,
} from '~/components/ShowInfoFormContent/ShowInvitationTicketFormContent';
import ShowSalesTicketFormContent, {
  SalesTicket,
} from '~/components/ShowInfoFormContent/ShowSalesTicketFormContent';
import ShowTicketInfoFormContent from '~/components/ShowInfoFormContent/ShowTicketInfoFormContent';
import {
  ShowBasicInfoFormInputs,
  ShowDetailInfoFormInputs,
  ShowSalesInfoFormInputs,
} from '~/components/ShowInfoFormContent/types';
import { HREF, PATH } from '~/constants/routes';

import Styled from './ShowAddPage.styles';
import ShowCastInfoFormContent from '~/components/ShowInfoFormContent/ShowCastInfoFormContent';
import { TempShowCastInfoFormInput } from '~/components/ShowCastInfoFormDialogContent';
import {
  TOAST_DURATIONS,
  checkIsWebView,
  isWebViewBridgeAvailable,
  navigateToShowDetail,
  showToast,
} from '@boolti/bridge';

const stepItems = [
  { key: 'basic', title: '기본 정보' },
  { key: 'detail', title: '상세 정보' },
  { key: 'sales', title: '판매 정보' },
];

interface ShowAddPageProps {
  step: 'basic' | 'detail' | 'sales';
}

const ShowAddPage = ({ step }: ShowAddPageProps) => {
  const navigate = useNavigate();
  const isWebView = checkIsWebView();

  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [castTeamList, setCastTeamList] = useState<TempShowCastInfoFormInput[]>([]);
  const [salesTicketList, setSalesTicketList] = useState<SalesTicket[]>([]);
  const [invitationTicketList, setInvitationTicketList] = useState<InvitationTicket[]>([]);

  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const showBasicInfoForm = useForm<ShowBasicInfoFormInputs>();
  const showDetailInfoForm = useForm<ShowDetailInfoFormInputs>();
  const showSalesInfoForm = useForm<ShowSalesInfoFormInputs>();

  const uploadShowImageMutation = useUploadShowImage();
  const addShowMutation = useAddShow();

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
    const showId = await addShowMutation.mutateAsync({
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
      castTeams: castTeamList.map(({ name, members }) => ({
        name,
        members: members
          ?.filter(({ userCode, roleName }) => userCode && roleName)
          .map(({ userCode, roleName }) => ({
            userCode,
            roleName,
          })),
      })) as ShowCastTeamCreateOrUpdateRequest[],
    });

    if (isWebView && isWebViewBridgeAvailable()) {
      showToast({ message: '공연 등록을 완료했습니다.', duration: TOAST_DURATIONS.SHORT });
      navigateToShowDetail({ showId });
      return;
    }

    toast.success('공연 등록을 완료했습니다.')
    navigate(HREF.SHOW_INFO(showId));
  };

  const basicStepContent = (
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
  );

  const detailStepContent = (
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
        <Styled.ShowInfoFormContent style={{ marginBottom: '28px' }}>
          <ShowDetailInfoFormContent form={showDetailInfoForm} />
        </Styled.ShowInfoFormContent>
        <Styled.ShowInfoFormContent style={{ marginBottom: '32px' }}>
          <ShowCastInfoFormContent
            initialCastTeamList={castTeamList}
            onChange={(data) => {
              setCastTeamList(data);
            }}
          />
        </Styled.ShowInfoFormContent>
        <Styled.ShowAddFormButtonContainer>
          <Styled.ShowAddFormButton
            variant="prev"
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
            variant="next"
            type="submit"
            colorTheme="primary"
            size="bold"
            disabled={
              !showDetailInfoForm.formState.isDirty || !showDetailInfoForm.formState.isValid
            }
          >
            다음으로
          </Styled.ShowAddFormButton>
        </Styled.ShowAddFormButtonContainer>
      </Styled.ShowAddForm>
    </>
  );

  const salesStepContent = (
    <>
      {(!showBasicInfoForm.formState.isDirty || !showBasicInfoForm.formState.isValid) &&
        (!showDetailInfoForm.formState.isDirty || !showDetailInfoForm.formState.isValid) && (
          <Navigate to={PATH.SHOW_ADD} replace />
        )}
      <Styled.CardDescription>
        판매할 티켓의 정보를 입력하고 약관에 동의해 주세요.
        <br />
        티켓은 판매 종료일까지 추가할 수 있어요.
      </Styled.CardDescription>
      <Styled.ShowAddForm onSubmit={showSalesInfoForm.handleSubmit(onSubmitSalesInfoForm)}>
        <Styled.ShowAddFormGroup>
          <ShowTicketInfoFormContent
            form={showSalesInfoForm}
            showDate={showBasicInfoForm.watch('date')}
          />
        </Styled.ShowAddFormGroup>
        <Styled.TicketFormContainer>
          <Styled.TicketFormTitle>판매 티켓</Styled.TicketFormTitle>
          <Styled.TicketForm>
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
          </Styled.TicketForm>
        </Styled.TicketFormContainer>
        <Styled.TermGroupContainer>
          <Styled.TermGroup>
            <Styled.Term>
              <Styled.TermLabel main>
                <Checkbox
                  variant="main"
                  checked={isTermsAccepted}
                  onChange={(event) => {
                    setIsTermsAccepted(event.target.checked);
                  }}
                />
                정책 확인 및 약관 동의
              </Styled.TermLabel>
            </Styled.Term>
          </Styled.TermGroup>
          <Styled.TermGroup>
            <Styled.Term>
              <Styled.TermLabel>
                <Checkbox variant="sub" checked={isTermsAccepted} />
                [필수] 공연 등록 및 관리 이용 약관
              </Styled.TermLabel>
              <Styled.TermLink
                href="https://boolti.notion.site/a84dec05901b419d9d98191220e34985"
                target="_blank"
                rel="noopener noreferrer"
              >
                보기
              </Styled.TermLink>
            </Styled.Term>
            <Styled.Term>
              <Styled.TermLabel>
                <Checkbox variant="sub" checked={isTermsAccepted} />
                [필수] 수수료 정책
              </Styled.TermLabel>
              <Styled.TermLink
                href="https://boolti.notion.site/155969481bd380918aa9c03c9cda4d08"
                target="_blank"
                rel="noopener noreferrer"
              >
                보기
              </Styled.TermLink>
            </Styled.Term>
            <Styled.Term>
              <Styled.TermLabel>
                <Checkbox variant="sub" checked={isTermsAccepted} />
                [필수] 환불 정책
              </Styled.TermLabel>
              <Styled.TermLink
                href="https://boolti.notion.site/d2a89e2c19824c60bb1e928370d16989"
                target="_blank"
                rel="noopener noreferrer"
              >
                보기
              </Styled.TermLink>
            </Styled.Term>
          </Styled.TermGroup>
        </Styled.TermGroupContainer>
        <Styled.ShowAddFormButtonContainer>
          <Styled.ShowAddFormButton
            variant="prev"
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
            variant="next"
            type="submit"
            colorTheme="primary"
            size="bold"
            disabled={
              !showSalesInfoForm.formState.isDirty ||
              !showSalesInfoForm.formState.isValid ||
              salesTicketList.length === 0 ||
              !isTermsAccepted
            }
          >
            공연 등록 완료하기
          </Styled.ShowAddFormButton>
        </Styled.ShowAddFormButtonContainer>
      </Styled.ShowAddForm>
    </>
  );

  const showAddPageContent = (
    <>
      <Styled.ProcessIndicator>
        <StepProgressBar width="175px" activeKey={step} items={stepItems} />
      </Styled.ProcessIndicator>
      {step === 'basic' && basicStepContent}
      {step === 'detail' && detailStepContent}
      {step === 'sales' && salesStepContent}
    </>
  );

  return (
    <Styled.ShowAddPage>
      {!isWebView && (
        <>
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
        </>
      )}
      <Styled.Content>
        <Styled.Card>
          <Styled.CardHeader>
            <Styled.CardHeaderText>공연 등록</Styled.CardHeaderText>
          </Styled.CardHeader>
          <Styled.CardContent>{showAddPageContent}</Styled.CardContent>
        </Styled.Card>
      </Styled.Content>
      <Styled.MobileContent isWebView={isWebView}>{showAddPageContent}</Styled.MobileContent>
    </Styled.ShowAddPage>
  );
};

export default ShowAddPage;

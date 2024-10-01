import { TicketSalesInfo } from '@boolti/api/src/types/adminShow';
import { Button } from '@boolti/ui';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { bankItems } from '~/constants/bankItems';

import Styled from './SettlementStatement.styles';
import SettlementStatementPreview from './SettlementStatementPreview';

export interface SettlementStatementFormInputs {
  showName: string;
  hostName: string;
  businessNumber: string;
  accountHolder: string;
  bankCode: string;
  accountNumber: string;
  salesItems: Record<string, string>[];
  salesAmount: string;
  fee: string;
  brokerageFee: string;
  paymentAgencyFee: string;
  vat: string;
  adjustmentAmount: string;
  adjustmentReason: string;
}

export interface SettlementStatementData extends SettlementStatementFormInputs {
  totalSettlementAmount: string;
  dateText: string;
}

interface SettlementStatementFormProps {
  ticketSalesInfo: TicketSalesInfo;
  initialValues?: {
    showName?: string;
    hostName?: string;
    accountHolder?: string;
    bankCode?: string;
    accountNumber?: string;
  };
  onSubmit: SubmitHandler<SettlementStatementFormInputs>;
}

const SettlementStatementFormDialog = ({
  ticketSalesInfo,
  initialValues,
  onSubmit,
}: SettlementStatementFormProps) => {
  const [step, setStep] = useState<number>(1);

  const initialSalesAmount = ticketSalesInfo
    .reduce((acc, ticket) => acc + ticket.amount, 0)
    .toString();

  const { handleSubmit, register, watch, control } = useForm<SettlementStatementFormInputs>({
    defaultValues: {
      salesAmount: initialSalesAmount,
      ...initialValues,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'salesItems',
  });

  const goToPrevStep = () => {
    setStep(1);
  };

  const goToNextStep = () => {
    setStep(2);
  };

  const submitHandler: SubmitHandler<SettlementStatementData> = (data) => {
    onSubmit(data);
  };

  const dateText = format(new Date(), 'yyyy.MM.dd');
  const totalSettlementAmount = (() => {
    const salesAmount = watch('salesAmount');
    const fee = watch('fee');
    const vat = watch('vat');
    const adjustmentAmount = watch('adjustmentAmount');

    const parsedSalesAmount = parseInt(salesAmount || '0');
    const parsedFee = parseInt(fee || '0');
    const parsedVat = parseInt(vat || '0');
    const parsedAdjustmentAmount = parseInt(adjustmentAmount || '0');

    const salesAmountNumber = Number.isNaN(parsedSalesAmount) ? 0 : parsedSalesAmount;
    const feeNumber = Number.isNaN(parsedFee) ? 0 : parsedFee;
    const vatNumber = Number.isNaN(parsedVat) ? 0 : parsedVat;
    const adjustmentAmountNumber = Number.isNaN(parsedAdjustmentAmount)
      ? 0
      : parsedAdjustmentAmount;

    return salesAmountNumber - feeNumber - vatNumber - adjustmentAmountNumber;
  })();

  useEffect(() => {
    const defaultValue = ticketSalesInfo.reduce((acc: Record<string, string>[], ticket) => {
      return [
        ...acc,
        {
          salesTicketId: ticket.salesTicketId.toString(),
          ticketType: ticket.ticketType,
          ticketName: ticket.ticketName,
          price: ticket.price.toString(),
          salesCount: ticket.salesCount.toString(),
          amount: ticket.amount.toString(),
        },
      ];
    }, []);

    remove();
    append(defaultValue);
  }, [append, remove, ticketSalesInfo]);

  return (
    <>
      {step === 1 && (
        <Styled.SettlementStatement>
          <Styled.SettlementStatementForm onSubmit={handleSubmit(goToNextStep)}>
            <h1>정산 내역서</h1>
            <div className="header-section">
              <h2>공연 정보</h2>
              <div className="header-section-row">
                <h3>공연명</h3>
                <Styled.TextField
                  type="text"
                  placeholder="공연명"
                  width="308px"
                  {...register('showName')}
                />
              </div>
              <div className="header-section-row">
                <h3>주최자명</h3>
                <Styled.TextField
                  type="text"
                  placeholder="주최자명"
                  width="308px"
                  {...register('hostName')}
                />
              </div>
            </div>
            <div className="header-section">
              <h2>정산 정보</h2>
              <div className="header-section-row">
                <h3>사업자등록번호</h3>
                <Styled.TextField
                  type="text"
                  placeholder="사업자등록번호"
                  width="308px"
                  {...register('businessNumber')}
                />
              </div>
              <div className="header-section-row">
                <h3>정산 계좌 정보</h3>
                <Styled.TextField
                  type="text"
                  placeholder="예금주명"
                  width="308px"
                  {...register('accountHolder')}
                />
              </div>
              <div className="header-section-row">
                <h3></h3>
                <Styled.TextFieldRow>
                  <Styled.Select width="100px" {...register('bankCode')}>
                    {bankItems.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.name}
                      </option>
                    ))}
                  </Styled.Select>
                  <Styled.TextField
                    type="text"
                    placeholder="계좌번호"
                    width="200px"
                    {...register('accountNumber')}
                  />
                </Styled.TextFieldRow>
              </div>
            </div>
            <div className="middle-section">
              <div className="table-row">
                <div className="row">
                  <h3>A. 총 판매액</h3>
                  <span>
                    <Styled.TextField
                      type="number"
                      width="200px"
                      align="right"
                      {...register('salesAmount')}
                    />
                    <span className="placeholder">원</span>
                  </span>
                </div>
              </div>
              <div className="table-sub-row">
                <ul>
                  {fields.map((field, index) => (
                    <li key={field.id}>
                      <span className="dot"></span>
                      <div className="row">
                        <h3>
                          {field.ticketName} ({field.salesCount}매)
                        </h3>
                        <span>
                          {field.ticketType === 'INVITE' ? (
                            '0원'
                          ) : (
                            <>
                              <Styled.TextField
                                type="number"
                                width="200px"
                                align="right"
                                {...register(`salesItems.${index}.amount`)}
                              />
                              <span className="placeholder">원</span>
                            </>
                          )}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="table-row">
                <div className="row">
                  <h3>B. 수수료</h3>
                  <span>
                    <Styled.TextField
                      type="number"
                      width="200px"
                      align="right"
                      {...register('fee')}
                    />
                    <span className="placeholder">원</span>
                  </span>
                </div>
              </div>
              <div className="table-sub-row">
                <div className="row">
                  <h3>중개 수수료</h3>
                  <span>
                    <Styled.TextField
                      type="number"
                      width="200px"
                      align="right"
                      {...register('brokerageFee')}
                    />
                    <span className="placeholder">원</span>
                  </span>
                </div>
              </div>
              <div className="table-sub-row">
                <div className="row">
                  <h3>결제 대행 수수료</h3>
                  <span>
                    <Styled.TextField
                      type="number"
                      width="200px"
                      align="right"
                      {...register('paymentAgencyFee')}
                    />
                    <span className="placeholder">원</span>
                  </span>
                </div>
              </div>
              <div className="table-row">
                <div className="row">
                  <h3>C. 부가가치세</h3>
                  <span>
                    <Styled.TextField
                      type="number"
                      width="200px"
                      align="right"
                      {...register('vat')}
                    />
                    <span className="placeholder">원</span>
                  </span>
                </div>
              </div>
              <div className="table-row">
                <div className="row">
                  <h3>D. 조정액</h3>
                  <span>
                    <Styled.TextField
                      type="number"
                      width="200px"
                      align="right"
                      {...register('adjustmentAmount')}
                    />
                    <span className="placeholder">원</span>
                  </span>
                </div>
              </div>
              <div className="table-sub-row">
                <div className="row">
                  <h3>조정 사유</h3>
                  <Styled.TextField
                    type="text"
                    placeholder="사유를 입력해 주세요"
                    width="308px"
                    align="right"
                    {...register('adjustmentReason')}
                  />
                </div>
              </div>
              <div className="table-row">
                <div className="row">
                  <h3>최종 정산액 (A - B - C - D)</h3>
                  <span>{totalSettlementAmount.toLocaleString()}원</span>
                </div>
              </div>
            </div>
            <div className="notice-section">
              <h3>※ 안내사항</h3>
              <div>
                정산액은 전체 판매 금액에서 수수료를 제외한 금액이며, 전체 수수료에 대하여
                현금영수증을 발행합니다.
              </div>
              <div>
                정산액 수령 후 법인세법, 소득세법, 부가가치세법 등 관계법령에 따라 의무적으로 세금
                신고를 하여야 합니다.
              </div>
              <div>
                <span className="dot"></span>
                대표자의 유형에 따라 적용되는 관계법령이 달라지므로, 세무 담당자나 전문 세무사 또는
                국세청을 통해 정확한 내용을 확인하신 후 세금을 납부해 주세요.
              </div>
              <div>
                <span className="dot"></span>
                개인도 매출 신고가 필요합니다. '개인'으로 공연을 주최한 경우, 종합소득세 납부 대상이
                됩니다.
              </div>
              <div>
                정산 내역서를 참고하여 수수료를 포함한 전체 판매 금액으로 소득 신고를 진행해 주세요.
              </div>
            </div>
            <div className="footer-section">
              <p>{dateText} 스튜디오 불티</p>
            </div>
            <Styled.SettlementStatementFooter>
              <Button colorTheme="netural" size="medium">
                생성하기
              </Button>
            </Styled.SettlementStatementFooter>
          </Styled.SettlementStatementForm>
        </Styled.SettlementStatement>
      )}
      {step === 2 && (
        <Styled.SettlementStatementPreviewContainer>
          <SettlementStatementPreview
            data={{
              showName: watch('showName'),
              hostName: watch('hostName'),
              businessNumber: watch('businessNumber'),
              accountHolder: watch('accountHolder'),
              bankCode: watch('bankCode') ?? '',
              accountNumber: watch('accountNumber'),
              salesItems: fields.map((field) => ({
                ...field,
                salesCount: parseInt(field.salesCount || '0').toLocaleString(),
                amount: parseInt(field.amount || '0').toLocaleString(),
              })),
              salesAmount: parseInt(watch('salesAmount') || '0').toLocaleString(),
              fee: parseInt(watch('fee') || '0').toLocaleString(),
              brokerageFee: parseInt(watch('brokerageFee') || '0').toLocaleString(),
              paymentAgencyFee: parseInt(watch('paymentAgencyFee') || '0').toLocaleString(),
              vat: parseInt(watch('vat') || '0').toLocaleString(),
              adjustmentAmount: parseInt(watch('adjustmentAmount') || '0').toLocaleString(),
              adjustmentReason: watch('adjustmentReason'),
              totalSettlementAmount: totalSettlementAmount.toLocaleString(),
              dateText,
            }}
            onPrev={goToPrevStep}
            onSubmit={submitHandler}
          />
        </Styled.SettlementStatementPreviewContainer>
      )}
    </>
  );
};

export default SettlementStatementFormDialog;

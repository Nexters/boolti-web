import { Button } from '@boolti/ui';
import { SubmitHandler } from 'react-hook-form';

import { bankItems } from '~/constants/bankItems';

import Styled from './SettlementStatement.styles';
import { SettlementStatementData } from './SettlementStatementFormDialog';

interface SettlementStatementPreviewProps {
  data: SettlementStatementData;
  onPrev: () => void;
  onSubmit: SubmitHandler<SettlementStatementData>;
}

const SettlementStatementPreview = ({
  data,
  onPrev,
  onSubmit,
}: SettlementStatementPreviewProps) => {
  const {
    showName,
    hostName,
    businessNumber,
    accountHolder,
    bankCode,
    accountNumber,
    salesAmount,
    salesItems,
    fee,
    brokerageFee,
    paymentAgencyFee,
    vat,
    adjustmentAmount,
    adjustmentReason,
    totalSettlementAmount,
    dateText,
  } = data;

  const submitHandler = () => {
    onSubmit(data);
  };

  return (
    <Styled.SettlementStatement>
      {/* https://codesandbox.io/p/sandbox/boolti-settlement-statement-t8dndd */}
      <h1>정산 내역서</h1>
      <div className="header-section">
        <h2>공연 정보</h2>
        <div className="header-section-row">
          <h3>공연명</h3>
          <span>{showName}</span>
        </div>
        <div className="header-section-row">
          <h3>주최자명</h3>
          <span>{hostName}</span>
        </div>
      </div>
      <div className="header-section">
        <h2>정산 정보</h2>
        {businessNumber && (
          <div className="header-section-row">
            <h3>사업자등록번호</h3>
            <span>{businessNumber}</span>
          </div>
        )}
        <div className="header-section-row">
          <h3>정산 계좌 정보</h3>
          <span>{accountHolder}</span>
        </div>
        <div className="header-section-row">
          <h3></h3>
          <span>
            {bankItems.find((item) => item.code === bankCode)?.name} {accountNumber}
          </span>
        </div>
      </div>
      <div className="middle-section">
        <div className="table-row">
          <div className="row">
            <h3>A. 총 판매액</h3>
            <span>{salesAmount}원</span>
          </div>
        </div>
        <div className="table-sub-row">
          <ul>
            {salesItems.map((item) => (
              <li key={item.id}>
                <span className="dot"></span>
                <div className="row">
                  <h3>
                    {item.ticketName} ({item.salesCount}매)
                  </h3>
                  <span>{item.amount}원</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="table-row">
          <div className="row">
            <h3>B. 수수료</h3>
            <span>{fee}원</span>
          </div>
        </div>
        <div className="table-sub-row">
          <div className="row">
            <h3>중개 수수료</h3>
            <span>{brokerageFee}원</span>
          </div>
        </div>
        <div className="table-sub-row">
          <div className="row">
            <h3>결제 대행 수수료</h3>
            <span>{paymentAgencyFee}원</span>
          </div>
        </div>
        <div className="table-row">
          <div className="row">
            <h3>C. 부가가치세</h3>
            <span>{vat}원</span>
          </div>
        </div>
        <div className="table-row">
          <div className="row">
            <h3>D. 조정액</h3>
            <span>{adjustmentAmount}원</span>
          </div>
        </div>
        <div className="table-sub-row">
          <div className="row">
            <h3>조정 사유</h3>
            <span>{adjustmentReason}</span>
          </div>
        </div>
        <div className="table-row">
          <div className="row">
            <h3>최종 정산액 (A - B - C - D)</h3>
            <span>{totalSettlementAmount}원</span>
          </div>
        </div>
      </div>
      <div className="notice-section">
        <h3>※ 안내사항</h3>
        <div>
          정산액은 전체 판매 금액에서 수수료를 제외한 금액이며, 전체 수수료에 대하여 현금영수증을
          발행합니다.
        </div>
        <div>
          정산액 수령 후 법인세법, 소득세법, 부가가치세법 등 관계법령에 따라 의무적으로 세금 신고를
          하여야 합니다.
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
        <Button type="button" colorTheme="line" size="medium" onClick={onPrev}>
          이전으로
        </Button>
        <Button colorTheme="netural" size="medium" onClick={submitHandler}>
          발송하기
        </Button>
      </Styled.SettlementStatementFooter>
    </Styled.SettlementStatement>
  );
};

export default SettlementStatementPreview;

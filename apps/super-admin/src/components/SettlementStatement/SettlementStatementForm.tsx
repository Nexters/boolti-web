import { Button } from '@boolti/ui';
import { format } from 'date-fns';
import { SubmitHandler, useForm } from 'react-hook-form';

import Styled from './SettlementStatement.styles';

export interface SettlementStatementFormInputs {
  showName: string;
  hostName: string;
  businessNumber: string;
  accountHolder: string;
  bankName: string;
  accountNumber: string;
  adjustmentReason: string;
  adjustmentAmount: string;
}

interface SettlementStatementFormProps {
  onSubmit: SubmitHandler<SettlementStatementFormInputs>;
}

const SettlementStatementForm = ({ onSubmit }: SettlementStatementFormProps) => {
  const { handleSubmit, register } = useForm<SettlementStatementFormInputs>();

  const submitHandler: SubmitHandler<SettlementStatementFormInputs> = (data) => {
    onSubmit(data);
  };

  const dateText = format(new Date(), 'yyyy.MM.dd');

  return (
    <Styled.SettlementStatement>
      <Styled.SettlementStatementForm onSubmit={handleSubmit(submitHandler)}>
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
              {...register('showName')}
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
              <Styled.TextField
                type="text"
                placeholder="은행명"
                width="100px"
                {...register('bankName')}
              />
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
              <span>800,000원</span>
            </div>
          </div>
          <div className="table-sub-row">
            <ul>
              <li>
                <span className="dot"></span>
                <div className="row">
                  <h3>일반 티켓 A (60매)</h3>
                  <span>600,000원</span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div className="row">
                  <h3>일반 티켓 B (20매)</h3>
                  <span>200,000원</span>
                </div>
              </li>
              <li>
                <span className="dot"></span>
                <div className="row">
                  <h3>초청 티켓 (10매)</h3>
                  <span>0원</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="table-row">
            <div className="row">
              <h3>B. 수수료</h3>
              <span>34,400원</span>
            </div>
          </div>
          <div className="table-sub-row">
            <div className="row">
              <h3>중개 수수료</h3>
              <span>8,000원</span>
            </div>
          </div>
          <div className="table-sub-row">
            <div className="row">
              <h3>결제 대행 수수료</h3>
              <span>26,400원</span>
            </div>
          </div>
          <div className="table-row">
            <div className="row">
              <h3>C. 부가가치세</h3>
              <span>3,440원</span>
            </div>
          </div>
          <div className="table-row">
            <div className="row">
              <h3>D. 조정액</h3>
              <span>
                <Styled.TextField
                  type="text"
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
              <span>762,160원</span>
            </div>
          </div>
        </div>
        <div className="notice-section">
          <h3>※ 안내사항</h3>
          <div>
            정산액은 전체 판매 금액에서 수수료를 제외한 금액이며, 전체 수수료에 대하여 세금계산서를
            발행합니다.
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
  );
};

export default SettlementStatementForm;

import { PlusIcon } from '@boolti/icon';
import { Button, useDialog } from '@boolti/ui';

import Styled from './SettlementPage.styles';

const SettlementPage = () => {
  const dialog = useDialog();

  return (
    <Styled.SettlementPage>
      <Styled.Breadcrumb>정산 관리 / 정산 내역서</Styled.Breadcrumb>
      <Styled.PageHeader>
        <Styled.PageTitle>정산 내역서</Styled.PageTitle>
        <Styled.PageDescription>
          공연 종료 후 수익이 있을 때만 생성하는 내역서 입니다.
          <br />
          신분증과 정산 계좌 정보, 통장 사본을 꼼꼼히 확인한 후 발송을 진행해 주세요.
        </Styled.PageDescription>
      </Styled.PageHeader>
      <Styled.Section>
        <Styled.SectionTitle>정산 진행 현황</Styled.SectionTitle>
        <Styled.Progress>
          <Styled.ProgressItem active>
            <Styled.ProgressItemNumber active>1</Styled.ProgressItemNumber>
            <Styled.ProgressItemTitle active>내역서 발송</Styled.ProgressItemTitle>
            <Styled.ProgressItemDescription>2024.01.21 00:00</Styled.ProgressItemDescription>
          </Styled.ProgressItem>
          <Styled.ProgressItem>
            <Styled.ProgressItemNumber>2</Styled.ProgressItemNumber>
            <Styled.ProgressItemTitle>주최자 확인 및 정산 요청</Styled.ProgressItemTitle>
          </Styled.ProgressItem>
          <Styled.ProgressItem>
            <Styled.ProgressItemNumber>3</Styled.ProgressItemNumber>
            <Styled.ProgressItemTitle>정산 완료</Styled.ProgressItemTitle>
          </Styled.ProgressItem>
        </Styled.Progress>
      </Styled.Section>
      <Styled.SectionDivider />
      <Styled.Section>
        <Styled.SectionTitle>사용자 입력 정보</Styled.SectionTitle>
        <Styled.UserInfo>
          <Styled.UserInfoItem>
            <Styled.UserInfoTitle>신분증 또는 사업자등록증 사본</Styled.UserInfoTitle>
            <Styled.UserInfoContent>
              <Styled.UserInfoLink>김불티_신분증.jpg</Styled.UserInfoLink>
            </Styled.UserInfoContent>
          </Styled.UserInfoItem>
          <Styled.UserInfoItem>
            <Styled.UserInfoTitle>정산 계좌</Styled.UserInfoTitle>
            <Styled.UserInfoContent>
              <Styled.UserInfoText>신한은행 110-123-456789</Styled.UserInfoText>
              <Button colorTheme="netural" size="x-small">
                복사하기
              </Button>
            </Styled.UserInfoContent>
          </Styled.UserInfoItem>
          <Styled.UserInfoItem>
            <Styled.UserInfoTitle>통장 사본</Styled.UserInfoTitle>
            <Styled.UserInfoContent>
              <Styled.UserInfoLink>김불티_신분증.jpg</Styled.UserInfoLink>
            </Styled.UserInfoContent>
          </Styled.UserInfoItem>
        </Styled.UserInfo>
      </Styled.Section>
      <Styled.SectionDivider />
      <Styled.Section>
        <Styled.SectionTitle>티켓 판매 정보</Styled.SectionTitle>
        <Styled.Table>
          <Styled.TableHead>
            <Styled.TableHeader>
              <Styled.TableHeaderItem>티켓 종류</Styled.TableHeaderItem>
              <Styled.TableHeaderItem minWidth={180}>티켓명</Styled.TableHeaderItem>
              <Styled.TableHeaderItem align="right">매당 판매액</Styled.TableHeaderItem>
              <Styled.TableHeaderItem align="right">판매 매수</Styled.TableHeaderItem>
              <Styled.TableHeaderItem align="right">총 판매액</Styled.TableHeaderItem>
              <Styled.TableHeaderItem></Styled.TableHeaderItem>
            </Styled.TableHeader>
          </Styled.TableHead>
          <Styled.TableBody>
            <Styled.TableRow>
              <Styled.TableItem>일반 티켓</Styled.TableItem>
              <Styled.TableItem minWidth={180}>일반 티켓 A</Styled.TableItem>
              <Styled.TableItem align="right">10,000원</Styled.TableItem>
              <Styled.TableItem align="right">60매</Styled.TableItem>
              <Styled.TableItem align="right">600,000원</Styled.TableItem>
              <Styled.TableItem></Styled.TableItem>
            </Styled.TableRow>
            <Styled.TableRow>
              <Styled.TableItem>총 판매</Styled.TableItem>
              <Styled.TableItem minWidth={180}></Styled.TableItem>
              <Styled.TableItem align="right">10,000원</Styled.TableItem>
              <Styled.TableItem align="right">60매</Styled.TableItem>
              <Styled.TableItem align="right">600,000원</Styled.TableItem>
              <Styled.TableItem></Styled.TableItem>
            </Styled.TableRow>
          </Styled.TableBody>
        </Styled.Table>
      </Styled.Section>
      <Styled.Section>
        <Button
          type="button"
          size="medium"
          colorTheme="netural"
          onClick={() => {
            dialog.open({
              title: '정산 내역서 생성하기',
              content: (
                <>
                  {/* https://codesandbox.io/p/sandbox/boolti-settlement-statement-t8dndd */}
                  <Styled.SettlementStatement>
                    <h1>정산 내역서</h1>
                    <div className="header-section">
                      <h2>공연 정보</h2>
                      <div className="header-section-row">
                        <h3>공연명</h3>
                        <span>공연명</span>
                      </div>
                      <div className="header-section-row">
                        <h3>주최자명</h3>
                        <span>주최자명</span>
                      </div>
                    </div>
                    <div className="header-section">
                      <h2>정산 정보</h2>
                      <div className="header-section-row">
                        <h3>사업자등록번호</h3>
                        <span>202-43-63442</span>
                      </div>
                      <div className="header-section-row">
                        <h3>정산 계좌 정보</h3>
                        <span>
                          김불티
                          <br />
                          토스뱅크 000000-00-000000
                        </span>
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
                          <span>0원</span>
                        </div>
                      </div>
                      <div className="table-sub-row">
                        <div className="row">
                          <h3>조정 사유</h3>
                          <span>-</span>
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
                        정산액은 전체 판매 금액에서 수수료를 제외한 금액이며, 전체 수수료에 대하여
                        세금계산서를 발행합니다.
                      </div>
                      <div>
                        정산액 수령 후 법인세법, 소득세법, 부가가치세법 등 관계법령에 따라
                        의무적으로 세금 신고를 하여야 합니다.
                      </div>
                      <div>
                        <span className="dot"></span>
                        대표자의 유형에 따라 적용되는 관계법령이 달라지므로, 세무 담당자나 전문
                        세무사 또는 국세청을 통해 정확한 내용을 확인하신 후 세금을 납부해 주세요.
                      </div>
                      <div>
                        <span className="dot"></span>
                        개인도 매출 신고가 필요합니다. '개인'으로 공연을 주최한 경우, 종합소득세
                        납부 대상이 됩니다.
                      </div>
                      <div>
                        정산 내역서를 참고하여 수수료를 포함한 전체 판매 금액으로 소득 신고를 진행해
                        주세요.
                      </div>
                    </div>
                    <div className="footer-section">
                      <p>2024.03.03 스튜디오 불티</p>
                    </div>
                  </Styled.SettlementStatement>
                  <Styled.SettlementStatementFooter>
                    <Button colorTheme="netural" size="medium">
                      생성하기
                    </Button>
                  </Styled.SettlementStatementFooter>
                </>
              ),
              isAuto: true,
            });
          }}
        >
          <PlusIcon />
          내역서 생성하기
        </Button>
      </Styled.Section>
    </Styled.SettlementPage>
  );
};

export default SettlementPage;

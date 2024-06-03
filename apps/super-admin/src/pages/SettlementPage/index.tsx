import { useSettlementInfo } from '@boolti/api';
import { PlusIcon } from '@boolti/icon';
import { Button, useDialog } from '@boolti/ui';

import SettlementStatementForm from '~/components/SettlementStatement/SettlementStatementForm';

import Styled from './SettlementPage.styles';

const SettlementPage = () => {
  const dialog = useDialog();

  const { data: settlementInfo } = useSettlementInfo(1);

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
              content: <SettlementStatementForm onSubmit={() => {}} />,
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

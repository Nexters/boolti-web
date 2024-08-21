import { Button, useConfirm } from '@boolti/ui';
import Styled from './EntranceTable.styles';

interface EntranceTableInterface {}

const EntranceTable = () => {
  const confirm = useConfirm();

  const handleEntrance = async (isEntered: boolean) => {
    try {
      const result = await confirm(
        getConfirmTextNode(isEntered),
        {
          cancel: '돌아가기',
          confirm: isEntered ? '미입장 처리하기' : '입장 처리하기',
        },
        {
          confirmButtonColorTheme: 'neutral',
        },
      );

      if (result) {
        // 미입장 혹은 입장 처리
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getConfirmTextNode = (isEntered: boolean) => {
    const title = isEntered
      ? '미입장 처리 전 다시 한 번 확인해 주세요!'
      : '입장 처리 전 다시 한 번 확인해 주세요!';
    const description = isEntered
      ? '미입장 처리 시 관객 앱화면의 QR이 [사용 가능] 상태로 변경되고 주최자 웹화면에서 해당 관객이 미입장 테이블로 이동합니다. 미입장 처리된 QR코드는 사용이 가능합니다.'
      : '입장 처리 시 관객 앱화면의 QR이 [입장 완료] 상태로 변경되고 주최자 웹화면에서 해당 관객이 입장 확인 테이블로 이동합니다. 입장 처리된 QR코드는 재사용할 수 없습니다.';
    const confirmTextNode = (
      <>
        <Styled.ConfirmTextTitle>{title}</Styled.ConfirmTextTitle>
        <br />
        <Styled.ConfirmText>{description}</Styled.ConfirmText>
      </>
    );
    return confirmTextNode;
  };
  return (
    <Styled.TableContainer>
      <Styled.Table>
        <Styled.TableHead>
          <Styled.TableHeader>
            <Styled.TableHeaderItem>상태</Styled.TableHeaderItem>
            <Styled.TableHeaderItem>티켓 번호</Styled.TableHeaderItem>
            <Styled.TableHeaderItem align="center">티켓 종류</Styled.TableHeaderItem>
            <Styled.TableHeaderItem>티켓 이름</Styled.TableHeaderItem>
            <Styled.TableHeaderItem>예매자 이름</Styled.TableHeaderItem>
            <Styled.TableHeaderItem>예매자 연락처</Styled.TableHeaderItem>
            <Styled.TableHeaderItem>입장 일시</Styled.TableHeaderItem>
            <Styled.TableHeaderItem></Styled.TableHeaderItem>
          </Styled.TableHeader>
        </Styled.TableHead>
        <Styled.TableBody>
          <Styled.TableRow>
            <Styled.TableItem>
              <Styled.EntranceStateText complete>입장 완료</Styled.EntranceStateText>
            </Styled.TableItem>
            <Styled.TableItem>BO0001010</Styled.TableItem>
            <Styled.TableItem>초청 티켓</Styled.TableItem>
            <Styled.TableItem>넥스터즈 초청 티켓</Styled.TableItem>
            <Styled.TableItem>박영호</Styled.TableItem>
            <Styled.TableItem>010-0000-0000</Styled.TableItem>
            <Styled.TableItem>2024.01.21 00:00</Styled.TableItem>
            <Styled.TableItem>
              <Button size="x-small" colorTheme="netural" onClick={() => handleEntrance(false)}>
                미입장 처리
              </Button>
            </Styled.TableItem>
          </Styled.TableRow>
        </Styled.TableBody>
      </Styled.Table>
    </Styled.TableContainer>
  );
};

export default EntranceTable;

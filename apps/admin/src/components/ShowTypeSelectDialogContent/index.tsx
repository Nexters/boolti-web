import { DollarTicketIcon, FreeTicketIcon } from '@boolti/icon';
import Styled from './ShowTypeSelectDialogContent.styles';
import { useBodyScrollLock } from '~/hooks/useBodyScrollLock';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/routes';

interface Props {
  close: VoidFunction;
}

const ShowTypeSelectDialogContent = ({ close }: Props) => {
  const naviate = useNavigate();

  const onClickButton = (isSalesTicket: boolean) => {
    close();
    const to = `${PATH.SHOW_ADD}?type=${isSalesTicket ? 'SALES' : 'FREE'}`;
    naviate(to);
  };

  useBodyScrollLock();

  return (
    <Styled.Container>
      <Styled.Title>등록하시려는 공연의 유형을 선택해 주세요.</Styled.Title>

      <Styled.Button onClick={() => onClickButton(true)}>
        <DollarTicketIcon />
        <Styled.ButtonText>
          <Styled.ButtonTitle>티켓 판매 공연</Styled.ButtonTitle>
          <Styled.ButtonDescription>유료 티켓, 0원 티켓 판매 공연</Styled.ButtonDescription>
        </Styled.ButtonText>
        <Styled.ChevronRightIcon />
      </Styled.Button>

      <Styled.Button onClick={() => onClickButton(false)}>
        <FreeTicketIcon />
        <Styled.ButtonText>
          <Styled.ButtonTitle>티켓 미판매 공연</Styled.ButtonTitle>
          <Styled.ButtonDescription>
            버스킹, 무료 공연, 과거에 진행한 공연 등
          </Styled.ButtonDescription>
        </Styled.ButtonText>
        <Styled.ChevronRightIcon />
      </Styled.Button>
    </Styled.Container>
  );
};

export default ShowTypeSelectDialogContent;

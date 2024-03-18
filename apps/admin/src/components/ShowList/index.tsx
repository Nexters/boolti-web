import { ChevronRightIcon, PlusIcon } from '@boolti/icon';
import { useDialog } from '@boolti/ui';
import { useNavigate } from 'react-router-dom';

import { PATH } from '~/constants/routes';

import EntranceConfirmDialogContent from '../EntranceConfirmDialogContent';
import ShowListItem from '../ShowListItem';
import Styled from './ShowList.styles';

interface Props {
  shows: React.ComponentProps<typeof ShowListItem>[];
}

const ShowList = ({ shows }: Props) => {
  const navigate = useNavigate();
  const { open, close } = useDialog();

  const isEmpty = shows.length === 0;

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.TextContainer>
          <Styled.HeaderText>등록한 공연</Styled.HeaderText>
          <Styled.InfoButton
            onClick={() => {
              open({
                title: '관객 입장 확인 방법',
                content: <EntranceConfirmDialogContent close={close} />,
                isAuto: true,
                width: '920px',
              });
            }}
          >
            관객 입장은 어떻게 확인하나요?
            <ChevronRightIcon />
          </Styled.InfoButton>
        </Styled.TextContainer>
        <Styled.MobileButton
          type="button"
          colorTheme="primary"
          size="small"
          icon={<PlusIcon />}
          onClick={() => {
            navigate(PATH.SHOW_ADD);
          }}
        >
          공연 등록하기
        </Styled.MobileButton>
        <Styled.DesktopButton
          type="button"
          colorTheme="primary"
          size="bold"
          icon={<PlusIcon />}
          onClick={() => {
            navigate(PATH.SHOW_ADD);
          }}
        >
          공연 등록하기
        </Styled.DesktopButton>
      </Styled.Header>
      {isEmpty ? (
        <ShowListItem
          isEmpty
          id={0}
          thumbnailPath=""
          title=""
          date=""
          hostName=""
          salesStartTime=""
          salesEndTime=""
        />
      ) : (
        <Styled.List>
          {shows.map((show, index) => (
            <ShowListItem key={index} {...show} />
          ))}
        </Styled.List>
      )}
    </Styled.Container>
  );
};

export default ShowList;

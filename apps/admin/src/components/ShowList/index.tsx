import { PlusIcon } from '@boolti/icon';
import { Button } from '@boolti/ui';

import ShowListItem from '../ShowListItem';
import Styled from './ShowList.styles';
import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/routes';

interface Props {
  shows: React.ComponentProps<typeof ShowListItem>[];
}

const ShowList = ({ shows }: Props) => {
  const navigate = useNavigate();

  const isEmpty = shows.length === 0;

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.HeaderText>등록한 공연</Styled.HeaderText>
        <Button
          type="button"
          colorTheme="primary"
          size="bold"
          icon={<PlusIcon />}
          onClick={() => {
            navigate(PATH.SHOW_ADD);
          }}
        >
          공연 등록하기
        </Button>
      </Styled.Header>
      {isEmpty ? (
        <ShowListItem isEmpty thumbnailPath="" title="" date="" host="" />
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

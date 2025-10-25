import Styled from './Header.styles';
import { ArrowLeftIcon } from '@boolti/icon';
import { useNavigate } from 'react-router-dom';

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();

  return (
    <Styled.Header onClick={() => navigate(-1)}>
      <Styled.BackButton>
        <ArrowLeftIcon />
      </Styled.BackButton>
      <Styled.HeaderTitle>{title}</Styled.HeaderTitle>
    </Styled.Header>
  );
};

export default Header;

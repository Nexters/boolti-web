import Styled from './Header.styles';
import { ArrowLeftIcon } from '@boolti/icon';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
  rightButton?: React.ReactNode;
}

const Header = ({ title, rightButton }: Props) => {
  const navigate = useNavigate();

  const hasTitle = Boolean(title);

  return (
    <Styled.Header hasTitle={hasTitle} onClick={() => navigate(-1)}>
      {title && (
        <Styled.Left>
          <Styled.BackButton>
            <ArrowLeftIcon />
          </Styled.BackButton>
          <Styled.HeaderTitle>{title}</Styled.HeaderTitle>
        </Styled.Left>
      )}
      {rightButton}
    </Styled.Header>
  );
};

export default Header;

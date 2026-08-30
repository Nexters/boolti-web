import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/routes';

export const useFindSpace = () => {
  const navigate = useNavigate();
  const handleFindSpace = () => {
    navigate(PATH.PLACE);
  };

  return { handleFindSpace };
};

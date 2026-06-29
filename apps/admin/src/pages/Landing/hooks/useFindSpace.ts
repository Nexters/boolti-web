import { useNavigate } from 'react-router-dom';
import { PATH } from '~/constants/routes';

export const useFindSpace = () => {
  const navigate = useNavigate();
  const handleFindSpace = () => {
    navigate(PATH.CONERT_HALLS);
  };

  return { handleFindSpace };
};

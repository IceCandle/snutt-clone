import { useNavigate } from 'react-router-dom';

interface Navigation {
  toMain: () => void;
  toMypage: () => void;
}

export const useNavigation = (): Navigation => {
  const navigate = useNavigate();

  const toMain = () => {
    navigate('/');
  };
  const toMypage = () => {
    navigate('/mypage');
  };

  return { toMain, toMypage };
};

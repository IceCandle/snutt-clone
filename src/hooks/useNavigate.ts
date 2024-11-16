import { useNavigate } from 'react-router-dom';

interface Navigation {
  toMain: () => void;
  toMypage: () => void;
  toLectureList: (tableId: string) => void;
}

export const useNavigation = (): Navigation => {
  const navigate = useNavigate();

  const toMain = () => {
    navigate('/');
  };
  const toMypage = () => {
    navigate('/mypage');
  };

  const toLectureList = (tableId: string) => {
    navigate(`/timetables/${tableId}/lectures`);
  };

  return { toMain, toMypage, toLectureList };
};

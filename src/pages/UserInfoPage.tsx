import { BrowserRouter, Route, Routes } from 'react-router-dom';

<<<<<<< HEAD
import type { TimeRange } from '../components/types';
import MainPage from './Main/MainPage.tsx';
=======
import MainPage from './MainPage.tsx';
>>>>>>> origin
import MyPage from './MyPage.tsx';

interface UserInfoPageProps {
  nickname: string;
  onLogout: () => void;
  tableList: TimeRange[];
  title: string | null;
}

const UserInfoPage = ({
  nickname,
  onLogout,
  tableList,
  title,
}: UserInfoPageProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
<<<<<<< HEAD
          element={<MainPage tableList={tableList} table_title={title} />}
          path="/"
        />
        <Route
          element={<MyPage nickname={nickname} onLogout={onLogout} />}
          path="/mypage"
        />
=======
          element={<MainPage nickname={nickname} onLogout={onLogout} />}
          path="/"
        />
        <Route element={<MyPage />} path="/mypage" />
>>>>>>> origin
      </Routes>
    </BrowserRouter>
  );
};

export default UserInfoPage;

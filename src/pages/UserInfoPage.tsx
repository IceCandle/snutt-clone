import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from './Main/MainPage.tsx';
import MyPage from './MyPage.tsx';

interface UserInfoPageProps {
  nickname: string;
  onLogout: () => void;
}

const UserInfoPage = ({ nickname, onLogout }: UserInfoPageProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<MainPage nickname={nickname} onLogout={onLogout} />}
          path="/"
        />
        <Route element={<MyPage />} path="/mypage" />
      </Routes>
    </BrowserRouter>
  );
};

export default UserInfoPage;

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import type { TimeRange } from '../components/types';
import MainPage from './Main/MainPage.tsx';
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
          element={<MainPage tableList={tableList} table_title={title} />}
          path="/"
        />
        <Route
          element={<MyPage nickname={nickname} onLogout={onLogout} />}
          path="/mypage"
        />
      </Routes>
    </BrowserRouter>
  );
};

export default UserInfoPage;

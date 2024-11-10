import { BrowserRouter, Route, Routes } from 'react-router-dom';

import type { TimeRange } from '../components/types';
import AccountPage from './Account/AccountPage';
import ChangeNickname from './Account/ChangeNickname';
import MainPage from './Main/MainPage';
import MyPage from './MyPage';

interface UserInfoPageProps {
  nickname: string;
  onLogout: () => void;
  tableList: TimeRange[];
  title: string | null;
  token: string | null;
  onNicknameChange: () => Promise<void>;
}

const UserInfoPage = ({
  nickname,
  onLogout,
  tableList,
  title,
  token,
  onNicknameChange,
}: UserInfoPageProps) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage 
              tableList={tableList} 
              table_title={title} 
              token={token}
            />
          }
        />
        <Route
          path="/mypage"
          element={<MyPage nickname={nickname} onLogout={onLogout} />}
        />
        <Route
          path="/mypage/account"
          element={<AccountPage nickname={nickname} />}
        />
        <Route
          path="/mypage/account/change-nickname"
          element={
            <ChangeNickname 
              token={token} 
              onNicknameChange={onNicknameChange} 
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default UserInfoPage;
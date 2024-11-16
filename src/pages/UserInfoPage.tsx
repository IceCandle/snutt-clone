import { BrowserRouter, Route, Routes } from 'react-router-dom';

import type { TableResponse } from '../components/types';
import { useTheme } from '../contexts/ThemeContext';
import AccountPage from './Account/AccountPage';
import ChangeNickname from './Account/ChangeNickname';
import { ColorSchemePage } from './ColorScheme/ColorSchemePage';
import { CourseList } from './Lecture/CourseList';
import { LectureView } from './Lecture/LectureView';
import { NewLecture } from './Lecture/NewLecture';
import MainPage from './Main/MainPage';
import MyPage from './MyPage';

interface UserInfoPageProps {
  nickname: string;
  onLogout: () => void;
  tableList: TableResponse;
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
  const { isDarkMode, toggleTheme } = useTheme();
  const courselist_path = `/timetables/${tableList._id}/lectures`;
  const newlecture_path = `/timetables/${tableList._id}/new`;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage tableList={tableList} table_title={title} token={token} />
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
            <ChangeNickname token={token} onNicknameChange={onNicknameChange} />
          }
        />
        <Route
          path="/mypage/color-scheme"
          element={
            <ColorSchemePage
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
            />
          }
        />
        <Route path={courselist_path} element={<CourseList {...tableList} />} />
        <Route
          path="/timetables/:timetableId/lectures/:lectureId"
          element={<LectureView />}
        />
        <Route path={newlecture_path} element={<NewLecture />} />
      </Routes>
    </BrowserRouter>
  );
};

export default UserInfoPage;

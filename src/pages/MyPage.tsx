import { useNavigate } from 'react-router-dom';

import { Navbar } from '../components/Navbar';

interface MyPageProps {
  nickname: string;
  onLogout: () => void;
}

const MyPage = ({ nickname, onLogout }: MyPageProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex relative overflow-hidden flex-col h-screen max-w-[375px] mx-auto">
      <div className="h-full w-full flex flex-col bg-white dark:bg-gray-900">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            마이페이지
          </h1>
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              navigate('/mypage/account');
            }}
            className="w-full p-4 text-left bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow mb-4 flex justify-between items-center"
          >
            <span>내 계정</span>
            <span className="text-gray-400 dark:text-gray-500">
              {nickname} →
            </span>
          </button>

          <button
            onClick={() => {
              navigate('/mypage/color-scheme');
            }}
            className="w-full p-4 text-left bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow mb-4 flex justify-between items-center"
          >
            <span>색상 모드</span>
            <span className="text-gray-400 dark:text-gray-500">→</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full p-4 text-left text-red-500 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            로그아웃
          </button>
        </div>
      </div>
      <Navbar selectedMenu="mypage" />
    </div>
  );
};

export default MyPage;

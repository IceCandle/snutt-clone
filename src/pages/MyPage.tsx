import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Navbar } from '../components/Navbar';

interface MyPageProps {
  nickname: string;
  onLogout: () => void;
}

const MyPage: React.FC<MyPageProps> = ({ nickname, onLogout }: MyPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex relative overflow-hidden flex-col h-screen max-w-[375px] mx-auto">
      <div className="h-full w-full flex flex-col bg-white">
        <div className="p-4 border-b">
          <h1 className="text-lg font-semibold">마이페이지</h1>
        </div>

        <div className="p-4">
          <button
            onClick={() => {
              navigate('/mypage/account');
            }}
            className="w-full p-4 text-left bg-white rounded-lg shadow mb-4 flex justify-between items-center"
          >
            <span>내 계정</span>
            <span className="text-gray-400">{nickname} →</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full p-4 text-left text-red-500 bg-white rounded-lg shadow"
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

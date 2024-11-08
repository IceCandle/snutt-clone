import React from 'react';

import { Navbar } from '../components/Navbar';

interface MyPageProps {
  nickname: string;
  onLogout: () => void;
}

const MyPage: React.FC<MyPageProps> = ({ nickname, onLogout }) => {
  return (
    <div className="flex relative overflow-hidden flex-col h-screen max-w-[375px] mx-auto">
      <div className="h-full w-full flex flex-col justify-center items-center bg-white">
        <h1 className="text-2xl font-bold mb-4">{nickname}</h1>
        <button
          onClick={onLogout}
          className="bg-orange-400 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
      <Navbar selectedMenu="mypage" />
    </div>
  );
};

export default MyPage;

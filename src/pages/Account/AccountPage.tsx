import { useNavigate } from 'react-router-dom';

interface AccountPageProps {
  nickname: string;
}

const AccountPage = ({ nickname }: AccountPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen max-w-[375px] mx-auto bg-white dark:bg-gray-900">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => { navigate('/mypage'); }}
          className="mr-4 text-gray-600 dark:text-gray-300"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">내 계정</h1>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
          <div>
            <h2 className="text-sm text-gray-500 dark:text-gray-400">닉네임</h2>
            <p className="text-base text-gray-900 dark:text-white">{nickname}</p>
          </div>
          <button
            onClick={() => { navigate('/mypage/account/change-nickname'); }}
            className="text-orange-500 dark:text-orange-400"
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

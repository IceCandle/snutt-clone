import { useNavigate } from 'react-router-dom';

interface AccountPageProps {
  nickname: string;
}

const AccountPage = ({ nickname }: AccountPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen max-w-[375px] mx-auto">
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => {
            navigate('/mypage');
          }}
          className="mr-4"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">내 계정</h1>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow mb-4">
          <div>
            <h2 className="text-sm text-gray-500">닉네임</h2>
            <p className="text-base">{nickname}</p>
          </div>
          <button
            onClick={() => {
              navigate('/mypage/account/change-nickname');
            }}
            className="text-orange-500"
          >
            변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

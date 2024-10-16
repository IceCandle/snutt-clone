import { useNavigate } from 'react-router-dom';

import { useUser } from '../hooks/useUser';

const UserInfoPage = () => {
  const { user, logout, isLoading, error } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error != null) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-white">
      <h1 className="text-2xl font-bold mb-4">
        {`${user?.nickname.nickname ?? 'Unknown'}#${user?.nickname.tag ?? 'XXXX'}`}
      </h1>
      <button
        onClick={handleLogout}
        className="bg-orange-400 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfoPage;

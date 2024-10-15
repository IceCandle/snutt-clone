type UserInfoProps = {
  nickname: string;
  onLogout: () => void;
};

const UserInfo = ({ nickname, onLogout }: UserInfoProps) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center bg-white">
      <h1 className="text-2xl font-bold mb-4">{nickname}</h1>
      <button
        onClick={onLogout}
        className="bg-orange-400 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
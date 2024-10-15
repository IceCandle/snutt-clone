const SocialLoginButtons = () => {
  const handleSocialLogin = (platform: string) => {
    alert(`${platform} login is not implemented yet.`);
  };

  return (
    <div className="w-full px-4">
      <p className="text-center text-gray-400 mb-4">SNS 계정으로 계속하기</p>
      <div className="flex justify-center space-x-4">
        <button onClick={() => { handleSocialLogin('Kakao'); }} className="w-12 h-12 rounded-full bg-yellow-400"></button>
        <button onClick={() => { handleSocialLogin('Google'); }} className="w-12 h-12 rounded-full bg-red-500"></button>
        <button onClick={() => { handleSocialLogin('Facebook'); }} className="w-12 h-12 rounded-full bg-blue-600"></button>
        <button onClick={() => { handleSocialLogin('Apple'); }} className="w-12 h-12 rounded-full bg-black"></button>
      </div>
    </div>
  );
};

export default SocialLoginButtons;
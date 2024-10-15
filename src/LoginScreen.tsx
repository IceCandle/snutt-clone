import React, { useState } from 'react';

type LoginScreenProps = {
  onLogin: (username: string, password: string) => Promise<void>;
  error: string | null;
};

const LoginScreen = ({ onLogin, error }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onLogin(username, password).catch((loginError: unknown) => {
      console.error("Login failed", loginError);
    });
  };

  const handleSocialLogin = (platform: string) => {
    alert(`${platform} login is not implemented yet.`);
  };

  if (isLoginView) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col items-center justify-center px-4">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); }}
            className="w-full mb-4 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); }}
            className="w-full mb-4 p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-orange-400 text-white py-3 rounded-md"
          >
            로그인
          </button>
          {(error != null) && <p className="text-red-500 mt-2">{error}</p>}
        </form>
        <button
          onClick={() => { setIsLoginView(false); }}
          className="mt-4 text-gray-600"
        >
          Back to main screen
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-between py-20">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 bg-orange-400 flex items-center justify-center mb-2">
          <div className="w-10 h-10 border-4 border-white"></div>
        </div>
        <h1 className="text-2xl font-bold">TimeTable</h1>
      </div>
      
      <div className="w-full px-4 flex flex-col items-center">
        <button
          onClick={() => { setIsLoginView(true); }}
          className="w-full bg-orange-400 text-white py-3 rounded-md mb-3"
        >
          로그인
        </button>
        <button
          onClick={() => { alert("Sign up is not implemented yet."); }}
          className="w-full bg-white text-black py-3 rounded-md border border-gray-300"
        >
          회원가입
        </button>
      </div>
      
      <div className="w-full px-4">
        <p className="text-center text-gray-400 mb-4">SNS 계정으로 계속하기</p>
        <div className="flex justify-center space-x-4">
          <button onClick={() => { handleSocialLogin('Kakao'); }} className="w-12 h-12 rounded-full bg-yellow-400"></button>
          <button onClick={() => { handleSocialLogin('Google'); }} className="w-12 h-12 rounded-full bg-red-500"></button>
          <button onClick={() => { handleSocialLogin('Facebook'); }} className="w-12 h-12 rounded-full bg-blue-600"></button>
          <button onClick={() => { handleSocialLogin('Apple'); }} className="w-12 h-12 rounded-full bg-black"></button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
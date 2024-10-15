import React, { useState } from 'react';

import LoginForm from '../components/LoginForm';
import SocialLoginButtons from '../components/SocialLoginButtons';

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<void>;
  error: string | null;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, error }) => {
  const [isLoginView, setIsLoginView] = useState(false);

  if (isLoginView) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col items-center justify-center px-4">
        <LoginForm onLogin={onLogin} error={error} />
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
      <SocialLoginButtons />
    </div>
  );
};

export default LoginPage;
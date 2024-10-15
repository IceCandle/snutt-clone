import { useState } from 'react';

import LoginForm from '../components/LoginForm';
import SocialLoginButtons from '../components/SocialLoginButtons';

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<void>;
  error: string | null;
}

const LoginPage = ({ onLogin, error }: LoginPageProps) => {
  const [isLoginView, setIsLoginView] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mt-8">
        <div className="relative w-[60px] h-[60px]">
          {/* Logo grid */}
          <div className="absolute w-[20.15px] h-[20.86px] left-[16.24px] top-[15.52px] bg-[#ef975d]"></div>
          <div className="absolute w-[20.15px] h-[20.86px] left-[16.24px] top-[39.13px] bg-[#ef975d]"></div>
          <div className="absolute w-[20.15px] h-[20.86px] left-[39.85px] top-[15.52px] bg-[#ef975d]"></div>
          <div className="absolute w-[20.15px] h-[20.86px] left-[39.85px] top-[39.13px] bg-[#ec8572]"></div>
          {/* Vertical bars */}
          <div className="absolute w-[6.71px] h-[60px] left-[11px] top-0 bg-[#26181d]"></div>
          <div className="absolute w-[6.71px] h-[60px] left-[34.91px] top-0 bg-[#26181d]"></div>
          {/* Horizontal bars */}
          <div className="absolute w-[6.71px] h-[60px] left-0 top-[41.28px] -rotate-90 origin-top-left bg-[#26181d]"></div>
          <div className="absolute w-[6.71px] h-[60px] left-0 top-[17.37px] -rotate-90 origin-top-left bg-[#26181d]"></div>
        </div>
        <div className="text-center text-black text-[21.35px] font-['SF Pro'] mt-4">TimeTable</div>
      </div>

      {/* Login Form or Buttons */}
      <div className="w-full px-8 mt-8 max-w-sm">
        {isLoginView ? (
          <LoginForm onLogin={onLogin} error={error} />
        ) : (
          <>
            <button
              onClick={() => { setIsLoginView(true); }}
              className="w-full p-4 bg-[#f58d3d] rounded-md flex justify-center items-center"
            >
              <span className="text-white text-sm font-bold font-['Pretendard']">로그인</span>
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-[#505050]">회원가입</p>
            </div>
          </>
        )}
      </div>

      {/* Social Login Section */}
      <SocialLoginButtons />
    </div>
  );
};

export default LoginPage;

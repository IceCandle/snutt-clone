import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import SocialLoginButtons from '../components/SocialLoginButtons';
import { useUser } from '../hooks/useUser';

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(false);
  const { login, isLoginLoading, loginError } = useUser();
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    login(
      { id: username, password },
      {
        onSuccess: () => navigate('/user-info'),
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center mt-8">
        <div className="relative w-[60px] h-[60px]">
          <div className="absolute w-[20.15px] h-[20.86px] left-[16.24px] top-[15.52px] bg-[#ef975d]"></div>
          <div className="absolute w-[20.15px] h-[20.86px] left-[16.24px] top-[39.13px] bg-[#ef975d]"></div>
          <div className="absolute w-[20.15px] h-[20.86px] left-[39.85px] top-[15.52px] bg-[#ef975d]"></div>
          <div className="absolute w-[20.15px] h-[20.86px] left-[39.85px] top-[39.13px] bg-[#ec8572]"></div>
          <div className="absolute w-[6.71px] h-[60px] left-[11px] top-0 bg-[#26181d]"></div>
          <div className="absolute w-[6.71px] h-[60px] left-[34.91px] top-0 bg-[#26181d]"></div>
          <div className="absolute w-[6.71px] h-[60px] left-0 top-[41.28px] -rotate-90 origin-top-left bg-[#26181d]"></div>
          <div className="absolute w-[6.71px] h-[60px] left-0 top-[17.37px] -rotate-90 origin-top-left bg-[#26181d]"></div>
        </div>
        <div className="text-center text-black text-[21.35px] font-['SF Pro'] mt-4">
          TimeTable
        </div>
      </div>
      <div className="w-full px-8 mt-8 max-w-sm">
        {isLoginView ? (
          <LoginForm
            onLogin={handleLogin}
            error={loginError != null ? loginError.message : null}
            isLoading={isLoginLoading}
          />
        ) : (
          <>
            <button
              onClick={() => {
                setIsLoginView(true);
              }}
              className="w-full p-4 bg-[#f58d3d] rounded-md flex justify-center items-center"
            >
              <span className="text-white text-sm font-bold font-['Pretendard']">
                로그인
              </span>
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-[#505050]">회원가입</p>
            </div>
          </>
        )}
      </div>
      <SocialLoginButtons />
    </div>
  );
};

export default LoginPage;

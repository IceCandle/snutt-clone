import { motion } from 'framer-motion';
import { useState } from 'react';

import LoginForm from '../components/LoginForm';
import SocialLoginButtons from '../components/SocialLoginButtons';

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<void>;
  error: string | null;
}

const LoginPage = ({ onLogin, error }: LoginPageProps) => {
  const [isLoginView, setIsLoginView] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(error);

  const handleLogin = async (username: string, password: string) => {
    try {
      setLoginError(null);
      await onLogin(username, password);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 p-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="relative w-[60px] h-[60px]">
          <div className="absolute w-[20.15px] h-[20.86px] left-[16.24px] top-[15.52px] bg-[#ef975d]"></div>
          <div className="absolute w-[20.15px] h-[20.86px] left-[16.24px] top-[39.13px] bg-[#ef975d]"></div>
          <div className="absolute w-[20.15px] h-[20.86px] left-[39.85px] top-[15.52px] bg-[#ef975d]"></div>
          <div className="absolute w-[20.15px] h-[20.86px] left-[39.85px] top-[39.13px] bg-[#ec8572]"></div>
          <div className="absolute w-[6.71px] h-[60px] left-[11px] top-0 bg-[#26181d] dark:bg-white"></div>
          <div className="absolute w-[6.71px] h-[60px] left-[34.91px] top-0 bg-[#26181d] dark:bg-white"></div>
          <div className="absolute w-[6.71px] h-[60px] left-0 top-[41.28px] -rotate-90 origin-top-left bg-[#26181d] dark:bg-white"></div>
          <div className="absolute w-[6.71px] h-[60px] left-0 top-[17.37px] -rotate-90 origin-top-left bg-[#26181d] dark:bg-white"></div>
        </div>
        <div className="text-center text-black dark:text-white text-[21.35px] font-['SF Pro'] mt-4">
          TimeTable
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-sm px-8"
      >
        {isLoginView ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoginForm onLogin={handleLogin} error={loginError} />
            <button
              onClick={() => { setIsLoginView(false); }}
              className="w-full mt-4 text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              뒤로 가기
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => { setIsLoginView(true); }}
              className="w-full p-4 bg-[#f58d3d] hover:bg-[#e67d2d] rounded-md flex justify-center items-center transition-colors"
            >
              <span className="text-white text-sm font-bold font-['Pretendard']">
                로그인
              </span>
            </button>
            <div className="mt-4 text-center">
              <p className="text-sm font-semibold text-[#505050] dark:text-gray-400">회원가입</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SocialLoginButtons />
      </motion.div>
    </div>
  );
};

export default LoginPage;

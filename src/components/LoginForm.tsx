import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  error: string | null;
  isLoading: boolean;
}

const LoginForm = ({ onLogin, error, isLoading }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        placeholder="아이디를 입력하세요"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-3 bg-[#f58d3d] rounded-md justify-center items-center gap-[5px] inline-flex"
        disabled={isLoading}
      >
        <div className="text-white text-sm font-bold font-['Pretendard']">
          {isLoading ? '로그인 중...' : '로그인'}
        </div>
      </button>
      {error != null && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default LoginForm;

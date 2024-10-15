import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>;
  error: string | null;
}

const LoginForm = ({ onLogin, error }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onLogin(username, password).catch((loginError: unknown) => {
      console.error("Login failed", loginError);
    });
  };

  return (
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
  );
};

export default LoginForm;
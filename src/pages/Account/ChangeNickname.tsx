import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChangeNicknameProps {
  token: string | null;
  onNicknameChange: () => Promise<void>;
}

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

const ChangeNickname = ({ token, onNicknameChange }: ChangeNicknameProps) => {
  const navigate = useNavigate();
  const [newNickname, setNewNickname] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token != null && { 'x-access-token': token }),
        },
        body: JSON.stringify({ nickname: newNickname }),
      });

      if (!response.ok) {
        throw new Error('Failed to update nickname');
      }

      await onNicknameChange();
      navigate('/mypage/account');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update nickname',
      );
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-[375px] mx-auto">
      <div className="flex items-center p-4 border-b">
        <button
          onClick={() => {
            navigate('/mypage/account');
          }}
          className="mr-4"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">닉네임 변경</h1>
      </div>

      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className="p-4"
      >
        <input
          type="text"
          value={newNickname}
          onChange={(e) => {
            setNewNickname(e.target.value);
          }}
          placeholder="새로운 닉네임"
          className="w-full p-2 border rounded mb-4"
        />
        {error != null && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full p-3 bg-orange-500 text-white rounded"
        >
          변경하기
        </button>
      </form>
    </div>
  );
};

export default ChangeNickname;
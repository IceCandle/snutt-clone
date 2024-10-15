const API_BASE_URL = 'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

interface LoginResponse {
  token: string;
}

interface UserInfoResponse {
  nickname: {
    nickname: string;
    tag: string;
  };
}

export const login = async (id: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login_local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json() as LoginResponse;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unexpected error during login.');
  }
};

export const getUserInfo = async (token: string): Promise<{ nickname: { nickname: string; tag: string } }> => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      'x-access-token': token,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
    throw new Error(errorData.message || 'Failed to fetch user info');
  }

  return await response.json() as UserInfoResponse;
};
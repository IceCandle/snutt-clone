import { QueryClient } from '@tanstack/react-query';

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export interface LoginResponse {
  token: string;
}

export interface UserInfoResponse {
  nickname: {
    nickname: string;
    tag: string;
  };
}

export const login = async (
  id: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login_local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, password }),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      message?: string;
    };
    throw new Error(errorData.message ?? 'Login failed');
  }

  return response.json() as Promise<LoginResponse>;
};

export const getUserInfo = async (token: string): Promise<UserInfoResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      'x-access-token': token,
    },
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as {
      message?: string;
    };
    throw new Error(errorData.message ?? 'Failed to fetch user info');
  }

  return response.json() as Promise<UserInfoResponse>;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

// token imformation define
interface LoginResponse {
  token: string;
}

interface UserInfoResponse {
  nickname: {
    nickname: string;
    tag: string;
  };
}

interface TableResponse {
  _id: string;
  user_id: string;
  year: number;
  semester: string;
  lecture_list: {
    _id: string;
    academic_year: string;
    category: string;
    class_time_json: {
      day: number;
      place: string;
      startMinute: number;
      endMinute: number;
      start_time: string;
      end_time: string;
      len: number;
      start: number;
      lectureBuildings: {
        id: string;
        buildingNumber: string;
        buildingNameKor: string;
        buildingNameEng: string;
        locationInDMS: {
          latitude: number;
          longitude: number;
        };
        locationInDecimal: {
          latitude: number;
          longitude: number;
        };
        campus: string;
      }[];
    }[];
    classification: string;
    credit: number;
    department: string;
    instructor: string;
    lecture_number: string;
    quota: number;
    freshman_quota: number;
    remark: string;
    course_number: string;
    course_title: string;
    color: {
      bg: string;
      fg: string;
    };
    colorIndex: number;
    lecture_id: string;
    snuttEvLecture: {
      evLectureId: number;
    };
    class_time_mask: number[];
  }[];
  title: string;
}

export const login = async (
  id: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login_local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // id와 password가 같은지 확인
      body: JSON.stringify({ id, password }),
    });

    // response가 ok가 아닌 경우, login failed 메세지 출력
    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as {
        message?: string;
      };
      throw new Error(errorData.message ?? 'Login failed');
    }

    // response가 ok인 경우, token을 return
    return (await response.json()) as LoginResponse;
  } catch (error) {
    // 그 외의 예외처리
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error during login.',
    );
  }
};

// login에서 받은 token을 이용해서 user 정보를 return
export const getUserInfo = async (token: string): Promise<UserInfoResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      'x-access-token': token,
    },
  });

  // response가 ok가 아닌 경우, user 정보를 fetch할 수 없다는 메세지 출력
  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as unknown as {
      message?: string;
    };
    throw new Error(errorData.message ?? 'Failed to fetch user info');
  }

  return (await response.json()) as UserInfoResponse;
};

export const getTableInfo = async (token: string): Promise<TableResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tables/recent`, {
      headers: {
        'x-access-token': token,
      },
    });

    if (!response.ok) {
      const errorData = (await response
        .json()
        .catch(() => ({}))) as unknown as {
        message?: string;
      };
      throw new Error(errorData.message ?? 'Failed to fetch table info');
    }
    return (await response.json()) as TableResponse;
  } catch (error) {
    // 그 외의 예외처리
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error during login.',
    );
  }
};

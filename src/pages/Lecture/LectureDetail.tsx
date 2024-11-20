import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import alarm from '../../assets/header-alarm-icon.png';
import bookmark from '../../assets/lecturedetail-bookmark-white.png';
import type { Lecture } from '../../components/types';

interface LectureDetailProps {
  lecture?: Lecture;
  isEditing?: boolean;
}

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const LectureDetail = ({
  lecture,
  isEditing = false,
}: LectureDetailProps) => {
  const navigate = useNavigate();
  const { timetableId, lectureId } = useParams();
  const queryClient = useQueryClient();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (timetableId == null || lectureId == null) {
        throw new Error('Invalid timetableId or lectureId');
      }
      const response = await fetch(
        `${API_BASE_URL}/tables/${timetableId}/lecture/${lectureId}`,
        {
          method: 'DELETE',
          headers: {
            'x-access-token': localStorage.getItem('token') ?? '',
          },
        },
      );
      if (!response.ok) {
        const error = (await response.json()) as { message?: string };
        throw new Error(error.message ?? 'Failed to delete lecture');
      }
      return response.json() as Promise<{ message: string }>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tableInfo'] });
      if (timetableId != null) {
        navigate(`/timetables/${timetableId}/lectures`);
      }
    },
  });

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 강의를 삭제하시겠습니까?')) return;
    try {
      await deleteMutation.mutateAsync();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : '강의 삭제에 실패했습니다',
      );
    }
  };

  if (lecture == null) return null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="mr-4 text-gray-600 dark:text-gray-300"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold dark:text-white">강의 상세</h1>
        <div className="flex gap-2 items-center ml-auto">
          <button
            onClick={() => {
              setShowNotificationModal(true);
            }}
            className="text-xs text-primary"
          >
            <img src={alarm} alt="알림" className="w-8 h-8" />
          </button>
          <button
            onClick={() => {
              setIsWatchlisted(!isWatchlisted);
            }}
            className="text-xs text-primary"
          >
            <img
              src={bookmark}
              alt="북마크"
              className={`w-6 h-6 ${isWatchlisted ? 'opacity-100' : 'opacity-50'}`}
            />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-auto">
        <div className="space-y-2">
          <h2 className="text-xl font-bold dark:text-white">
            {lecture.course_title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {lecture.instructor} 교수님
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 dark:text-white">
              수업 시간 및 장소
            </h3>
            {lecture.class_time_json.map((time, index) => (
              <div key={index} className="text-gray-600 dark:text-gray-300">
                {['월', '화', '수', '목', '금', '토', '일'][time.day]}요일{' '}
                {time.start_time}-{time.end_time} / {time.place}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 dark:text-white">강의 정보</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-gray-500 dark:text-gray-400">학점</dt>
              <dd className="text-gray-900 dark:text-gray-200">
                {lecture.credit}
              </dd>

              <dt className="text-gray-500 dark:text-gray-400">분류</dt>
              <dd className="text-gray-900 dark:text-gray-200">
                {lecture.classification}
              </dd>

              <dt className="text-gray-500 dark:text-gray-400">수강정원</dt>
              <dd className="text-gray-900 dark:text-gray-200">
                {lecture.quota}
              </dd>

              <dt className="text-gray-500 dark:text-gray-400">신입생정원</dt>
              <dd className="text-gray-900 dark:text-gray-200">
                {lecture.freshman_quota}
              </dd>
            </dl>
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <button
                onClick={() => {
                  alert('강의계획서 기능은 아직 준비중입니다.');
                }}
                className="w-full p-3 bg-blue-500 text-white rounded-lg dark:bg-blue-600"
              >
                강의계획서
              </button>
              <button
                onClick={() => {
                  alert('강의평 기능은 아직 준비중입니다.');
                }}
                className="w-full p-3 bg-green-500 text-white rounded-lg dark:bg-green-600"
              >
                강의평
              </button>
              <button
                onClick={() => {
                  setShowNotificationModal(true);
                }}
                className="w-full p-3 bg-yellow-500 text-white rounded-lg dark:bg-yellow-600"
              >
                빈자리 알림
              </button>
              <button
                onClick={() => void handleDelete()}
                className="w-full p-3 bg-red-500 text-white rounded-lg dark:bg-red-600"
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? '삭제중...' : '강의 삭제'}
              </button>
            </div>
          )}
        </div>
      </div>

      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              빈자리 알림 설정
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              이 강의에 빈자리가 생기면 알림을 받으시겠습니까?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowNotificationModal(false);
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert('알림이 설정되었습니다.');
                  setShowNotificationModal(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                설정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

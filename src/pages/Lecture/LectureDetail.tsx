import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import alarm from '../../assets/header-alarm-icon.png';
import bookmark from '../../assets/lecturedetail-bookmark-white.png';
import type { Lecture } from '../../components/types';

interface LectureDetailProps {
  lecture?: Lecture;
  onDelete?: () => Promise<void>;
}

const API_BASE_URL = 'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const LectureDetail = ({ lecture, onDelete }: LectureDetailProps) => {
  const navigate = useNavigate();
  const { timetableId, lectureId } = useParams();
  const queryClient = useQueryClient();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

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
      navigate('/');
    },
  });

  const handleDelete = async () => {
    if (!window.confirm('강의를 삭제하시겠습니까?')) return;
    try {
      if (onDelete != null) {
        await onDelete();
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : '강의 삭제에 실패했습니다');
    }
  };

  if (lecture == null) return null;

  const renderDetailRow = (label: string, value: string | number | undefined) => (
    <div className="flex py-[10px]">
      <span className="w-[100px] text-gray-500">{label}</span>
      <span className="flex-1 text-gray-900">{value ?? '-'}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => { navigate('/'); }}
            className="mr-4 text-gray-600"
          >
            ←
          </button>
          <h1 className="text-lg">강의 상세</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowNotificationModal(true); }}
          >
            <img src={alarm} alt="알림" className="w-6 h-6" />
          </button>
          <button
            onClick={() => { setIsWatchlisted(!isWatchlisted); }}
          >
            <img
              src={bookmark}
              alt="북마크"
              className={`w-6 h-6 ${isWatchlisted ? 'opacity-100' : 'opacity-50'}`}
            />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {renderDetailRow('강의명', lecture.course_title)}
          {renderDetailRow('교수', lecture.instructor)}
          {renderDetailRow('색', lecture.colorIndex)}
          {renderDetailRow('강의평점', `-- (0개)`)}
          {renderDetailRow('학과', lecture.department)}
          {renderDetailRow('학년', '1학년')}
          {renderDetailRow('학점', lecture.credit)}
          {renderDetailRow('분류', lecture.classification)}
          {renderDetailRow('구분', '')}
          {renderDetailRow('강좌번호', lecture.lecture_number)}
          {renderDetailRow('분반번호', lecture.course_number)}
          {renderDetailRow('정원(재학생)', `${lecture.quota}(${lecture.quota - lecture.freshman_quota})`)}
          {renderDetailRow('비고', lecture.remark)}
        </div>

        <div className="px-4 mt-4">
          <h3 className="font-medium mb-2">시간 및 장소</h3>
          {lecture.class_time_json.map((time, index) => (
            <div key={index} className="mb-2">
              <div>시간: {['월', '화', '수', '목', '금'][time.day]}요일 {time.start_time}-{time.end_time}</div>
              <div>장소: {time.place}</div>
            </div>
          ))}
        </div>

        <div className="p-4 space-y-2">
          <button
            onClick={() => { alert('강의계획서 기능은 준비중입니다.'); }}
            className="w-full p-3 text-center border border-gray-300 rounded"
          >
            강의계획서
          </button>
          <button
            onClick={() => { alert('강의평 기능은 준비중입니다.'); }}
            className="w-full p-3 text-center border border-gray-300 rounded"
          >
            강의평
          </button>
          <button
            onClick={() => { setShowNotificationModal(true); }}
            className="w-full p-3 text-center border border-gray-300 rounded"
          >
            빈자리 알림
          </button>
          <button
            onClick={() => void handleDelete()}
            className="w-full p-3 text-center border border-gray-300 rounded text-red-500"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? '삭제중...' : '삭제'}
          </button>
        </div>
      </div>

      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-sm">
            <h3 className="text-lg font-medium mb-4">빈자리 알림 설정</h3>
            <p className="text-gray-600 mb-4">
              이 강의에 빈자리가 생기면 알림을 받으시겠습니까?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => { setShowNotificationModal(false); }}
                className="px-4 py-2 text-gray-600"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert('알림이 설정되었습니다.');
                  setShowNotificationModal(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded"
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
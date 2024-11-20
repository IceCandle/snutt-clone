import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingSpinner from '../../components/LoadingSpinner';
import type { TableResponse } from '../../components/types';

const API_BASE_URL = 'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const CourseList = () => {
  const { timetableId } = useParams<{ timetableId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { data: tableInfo, isLoading: isTableLoading } = useQuery<TableResponse>({
    queryKey: ['table', timetableId],
    queryFn: async () => {
      if (timetableId == null) {
        throw new Error('Timetable ID is required');
      }
      const response = await fetch(`${API_BASE_URL}/tables/${timetableId}`, {
        headers: {
          'x-access-token': localStorage.getItem('token') ?? '',
        },
      });
      if (!response.ok) {
        const error = (await response.json()) as { message?: string };
        throw new Error(error.message ?? 'Failed to fetch table info');
      }
      return response.json() as Promise<TableResponse>;
    },
    enabled: !(timetableId == null),
  });

  const handleBack = () => {
    navigate('/'); // Always go to main page
  };

  const handleAddNew = () => {
    if (timetableId == null) return;
    setIsLoading(true);
    navigate(`/timetables/${timetableId}/new`);
  };

  const handleLectureClick = (lectureId: string) => {
    if (timetableId == null) return;
    setIsLoading(true);
    navigate(`/timetables/${timetableId}/lectures/${lectureId}`);
  };

  if (isTableLoading || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex relative overflow-hidden flex-col h-screen max-w-[375px] mx-auto">
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 text-gray-600 dark:text-gray-300"
            >
              ←
            </button>
            <h1 className="text-lg font-semibold dark:text-white">강의 목록</h1>
          </div>
          <button
            onClick={handleAddNew}
            className="text-gray-600 dark:text-gray-400"
          >
            + 새 강의
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {tableInfo?.lecture_list.length == null ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              강의 목록이 없습니다.
            </div>
          ) : (
            tableInfo.lecture_list.map((lecture) => (
              <div
                key={lecture._id}
                onClick={() => { handleLectureClick(lecture._id); }}
                className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              >
                <h3 className="font-medium dark:text-white">
                  {lecture.course_title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lecture.instructor} / {lecture.credit}학점
                </p>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {lecture.class_time_json.map((time, index) => (
                    <div key={index}>
                      {['월', '화', '수', '목', '금'][time.day]}요일 {time.start_time}-{time.end_time} ({time.place})
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
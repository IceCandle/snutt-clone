import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Lecture, TableResponse } from '../../components/types';

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const CourseList = () => {
  const { timetableId } = useParams<{ timetableId: string }>();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLectures = async () => {
      if (timetableId == null) return;

      try {
        const token = localStorage.getItem('token');
        if (token == null) return;

        const response = await fetch(`${API_BASE_URL}/tables/${timetableId}`, {
          headers: {
            'x-access-token': token,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch lectures');
        const data = (await response.json()) as TableResponse;
        setLectures(data.lecture_list);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    };

    void fetchLectures();
  }, [timetableId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddNew = () => {
    if (timetableId == null) return;
    navigate(`/timetables/${timetableId}/new`);
  };

  const handleLectureClick = (lectureId: string) => {
    if (timetableId == null) return;
    navigate(`/timetables/${timetableId}/lectures/${lectureId}`);
  };

  return (
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
          className="text-blue-500 dark:text-blue-400"
        >
          + 새 강의
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {lectures.map((lecture) => (
          <div
            key={lecture._id}
            onClick={() => {
              handleLectureClick(lecture._id);
            }}
            className="p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
          >
            <h3 className="font-medium dark:text-white">
              {lecture.course_title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lecture.instructor} • {lecture.credit}학점
            </p>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {lecture.class_time_json.map((time, index) => (
                <div key={index}>
                  {time.day}요일 {time.start_time}-{time.end_time} ({time.place}
                  )
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


interface NewLectureForm {
  course_title: string;
  instructor: string;
  credit: number;
  remark: string;
}

const API_BASE_URL = 'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const NewLecture = () => {
  const navigate = useNavigate();
  const { timetableId } = useParams();
  const [form, setForm] = useState<NewLectureForm>({
    course_title: '',
    instructor: '',
    credit: 3,
    remark: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    
      if (timetableId == null) {
        throw new Error('Timetable ID is required');
      }
      const response = await fetch(
        `${API_BASE_URL}/tables/${timetableId}/lecture?isForced=true`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token') ?? '',
          },
          body: JSON.stringify({
            ...form,
            class_time_json: [
              {
                day: "3", // Wednesday
                place: "강의실",
                startMinute: 1140, // 19:00
                endMinute: 1230, // 20:30
                start_time: "19:00",
                end_time: "20:30",
                len: 90,
                start: 1140
              }
            ],
            colorIndex: 0
          }),
        },
      );

      if (!response.ok) throw new Error('Failed to create lecture');
      navigate(`/timetables/${timetableId}/lectures`);
    } catch (error) {
      console.error('Error creating lecture:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <button
          onClick={() => { navigate(-1); }}
          className="mr-4 text-gray-600 dark:text-gray-300"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold dark:text-white">새 강의 추가</h1>
      </div>

      <form onSubmit={(e) =>{ void handleSubmit(e); }} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            강의명
          </label>
          <input
            type="text"
            value={form.course_title}
            onChange={(e) => { setForm({ ...form, course_title: e.target.value }); }}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            교수명
          </label>
          <input
            type="text"
            value={form.instructor}
            onChange={(e) => { setForm({ ...form, instructor: e.target.value }); }}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            학점
          </label>
          <input
            type="number"
            value={form.credit}
            onChange={(e) => { setForm({ ...form, credit: parseInt(e.target.value) }); }}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            min="1"
            max="5"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            비고
          </label>
          <textarea
            value={form.remark}
            onChange={(e) => { setForm({ ...form, remark: e.target.value }); }}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            rows={3}
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => { navigate(-1); }}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
};
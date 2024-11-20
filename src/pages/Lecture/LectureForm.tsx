import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LectureFormProps {
  initialValues?: {
    course_title: string;
    instructor: string;
    credit: number;
    remark: string;
  };
  onSubmit: (values: {
    course_title: string;
    instructor: string;
    credit: number;
    remark: string;
  }) => Promise<void>;
  isLoading: boolean;
  mode: 'create' | 'edit';
}

export const LectureForm = ({
  initialValues = {
    course_title: '',
    instructor: '',
    credit: 3,
    remark: '',
  },
  onSubmit,
  isLoading,
  mode,
}: LectureFormProps) => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState(initialValues);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(values);
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
        <h1 className="text-lg font-semibold dark:text-white">
          {mode === 'create' ? '새 강의 추가' : '강의 수정'}
        </h1>
      </div>

      <form onSubmit={(e) => { void handleSubmit(e); }} className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            강의명
          </label>
          <input
            type="text"
            value={values.course_title}
            onChange={(e) => {
              setValues({ ...values, course_title: e.target.value });
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            교수명
          </label>
          <input
            type="text"
            value={values.instructor}
            onChange={(e) => {
              setValues({ ...values, instructor: e.target.value });
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            학점
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={values.credit}
            onChange={(e) => {
              setValues({ ...values, credit: Number(e.target.value) });
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            비고
          </label>
          <textarea
            value={values.remark}
            onChange={(e) => {
              setValues({ ...values, remark: e.target.value });
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            rows={3}
          />
        </div>

        <div className="pt-4 flex gap-2">
          <button
            type="button"
            onClick={() => { navigate(-1); }}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-transparent text-white bg-gray-600 rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            {isLoading ? '처리중...' : mode === 'create' ? '추가' : '수정'}
          </button>
        </div>
      </form>
    </div>
  );
};
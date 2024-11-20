import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TimeSlot {
  day: number;
  start: string;
  end: string;
  place: string;
}

interface LectureFormValues {
  course_title: string;
  instructor: string;
  credit: number;
  remark: string;
  times: TimeSlot[];
}

interface LectureFormProps {
  initialValues?: LectureFormValues;
  onSubmit: (values: LectureFormValues) => Promise<void>;
  isLoading: boolean;
  mode: 'create' | 'edit';
}

export const LectureForm = ({
  initialValues = {
    course_title: '',
    instructor: '',
    credit: 0,
    remark: '',
    times: [{ day: 0, start: '09:00', end: '10:00', place: '' }],
  },
  onSubmit,
  isLoading,
}: LectureFormProps) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LectureFormValues>(initialValues);

  const handleSubmit = async () => {
    if (isLoading) return;
    await onSubmit(form);
  };

  const handleAddTime = () => {
    setForm((prev) => ({
      ...prev,
      times: [
        ...prev.times,
        { day: 0, start: '09:00', end: '10:00', place: '' },
      ],
    }));
  };

  const handleRemoveTime = (index: number) => {
    setForm((prev) => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="flex justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="text-lg text-gray-600 dark:text-gray-300"
        >
          취소
        </button>
        <button
          onClick={() => {
            void handleSubmit();
          }}
          className="text-lg text-gray-900 dark:text-white disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? '저장 중...' : '저장'}
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <label className="block text-gray-500 dark:text-gray-400">
            강의명
          </label>
          <input
            type="text"
            value={form.course_title}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, course_title: e.target.value }));
            }}
            className="w-full p-2 border-b border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none text-gray-900 dark:text-white"
            placeholder="새로운 강의"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-500 dark:text-gray-400">교수</label>
          <input
            type="text"
            value={form.instructor}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, instructor: e.target.value }));
            }}
            className="w-full p-2 border-b border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none text-gray-900 dark:text-white"
            placeholder="(없음)"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-500 dark:text-gray-400">학점</label>
          <input
            type="number"
            value={form.credit}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, credit: Number(e.target.value) }));
            }}
            className="w-full p-2 border-b border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none text-gray-900 dark:text-white"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-500 dark:text-gray-400">색</label>
          <div className="flex items-center space-x-2 p-2 border-b">
            <div className="w-6 h-6 bg-red-500 rounded" />
            <span className="text-gray-400">▶</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-500 dark:text-gray-400">
            시간 및 장소
          </label>
          {form.times.map((time, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700 p-2"
            >
              <select
                value={time.day}
                onChange={(e) => {
                  const newTimes = [...form.times];
                  if (newTimes[index] != null) {
                    newTimes[index].day = Number(e.target.value);
                  }
                  setForm((prev) => ({ ...prev, times: newTimes }));
                }}
                className="border-none focus:outline-none bg-transparent text-gray-900 dark:text-white"
              >
                {['월', '화', '수', '목', '금'].map((day, i) => (
                  <option
                    key={i}
                    value={i}
                    className="bg-white dark:bg-gray-800"
                  >
                    {day}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={time.start}
                onChange={(e) => {
                  const newTimes = [...form.times];
                  if (newTimes[index] != null) {
                    newTimes[index].start = e.target.value;
                  }
                  setForm((prev) => ({ ...prev, times: newTimes }));
                }}
                className="border-none focus:outline-none bg-transparent text-gray-900 dark:text-white"
              />
              ~
              <input
                type="time"
                value={time.end}
                onChange={(e) => {
                  const newTimes = [...form.times];
                  if (newTimes[index] != null) {
                    newTimes[index].end = e.target.value;
                  }
                  setForm((prev) => ({ ...prev, times: newTimes }));
                }}
                className="border-none focus:outline-none bg-transparent text-gray-900 dark:text-white"
              />
              <input
                type="text"
                value={time.place}
                onChange={(e) => {
                  const newTimes = [...form.times];
                  if (newTimes[index] != null) {
                    newTimes[index].place = e.target.value;
                  }
                  setForm((prev) => ({ ...prev, times: newTimes }));
                }}
                placeholder="(없음)"
                className="flex-1 border-none focus:outline-none bg-transparent text-gray-900 dark:text-white"
              />
              <button
                onClick={() => {
                  handleRemoveTime(index);
                }}
                className="text-gray-500"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={handleAddTime}
            className="w-full p-2 text-center border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
          >
            + 시간 추가
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-500 dark:text-gray-400">비고</label>
          <input
            type="text"
            value={form.remark}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, remark: e.target.value }));
            }}
            className="w-full p-2 border-b focus:outline-none bg-transparent text-gray-900 dark:text-white"
            placeholder="(없음)"
          />
        </div>
      </div>
    </div>
  );
};

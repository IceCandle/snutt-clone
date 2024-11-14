import { useNavigate, useParams } from 'react-router-dom';
import type {
  LectureBuilding,
  ClassTime,
  Lecture,
} from '../../components/types';

interface LectureDetailProps {
  lecture?: Lecture;
  onDelete?: () => Promise<void>;
  isEditing?: boolean;
}

const getDayString = (day: number): string | undefined => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const index = day;
  if (!isNaN(index) && index >= 0 && index < days.length) {
    return days[index] ?? '';
  }
  return days[day];
};

export const LectureDetail = ({
  lecture,
  onDelete,
  isEditing = false,
}: LectureDetailProps) => {
  const navigate = useNavigate();
  const { timetableId } = useParams();

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 강의를 삭제하시겠습니까?')) return;
    if (onDelete != null) await onDelete();
    if (timetableId != null) {
      navigate(`/timetables/${timetableId}/lectures`);
    }
  };

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
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-auto">
        <div className="space-y-2">
          <h2 className="text-xl font-bold dark:text-white">
            {lecture?.course_title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {lecture?.instructor} 교수님
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 dark:text-white">수업 시간</h3>
            {lecture?.class_time_json.map((time, index) => (
              <div key={index} className="text-gray-600 dark:text-gray-300">
                {getDayString(time.day)} {time.start_time}-{time.end_time}
                <br />
                {time.place}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 dark:text-white">강의 정보</h3>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-gray-500 dark:text-gray-400">학점</dt>
              <dd className="text-gray-900 dark:text-gray-200">
                {lecture?.credit}
              </dd>

              <dt className="text-gray-500 dark:text-gray-400">분류</dt>
              <dd className="text-gray-900 dark:text-gray-200">
                {lecture?.classification}
              </dd>

              <dt className="text-gray-500 dark:text-gray-400">수강정원</dt>
              <dd className="text-gray-900 dark:text-gray-200">
                {lecture?.quota}
              </dd>

              <dt className="text-gray-500 dark:text-gray-400">신입생정원</dt>
              <dd className="text-gray-900 dark:text-gray-200">
                {lecture?.freshman_quota}
              </dd>
            </dl>
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <button className="w-full p-3 bg-blue-500 text-white rounded-lg">
                강의계획서
              </button>
              <button className="w-full p-3 bg-green-500 text-white rounded-lg">
                강의평
              </button>
              <button className="w-full p-3 bg-yellow-500 text-white rounded-lg">
                빈자리 알림
              </button>
              <button
                onClick={() => {
                  void handleDelete();
                }}
                className="w-full p-3 bg-red-500 text-white rounded-lg"
              >
                강의 삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

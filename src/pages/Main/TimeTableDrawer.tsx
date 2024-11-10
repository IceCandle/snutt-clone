import { useEffect, useState } from 'react';

interface Timetable {
  _id: string;
  year: number;
  semester: number;
  title: string;
  isPrimary: boolean;
  updated_at: string;
  total_credit: number;
}

interface Semester {
  year: number;
  semester: string;
  updated_at: string;
}

interface TimeTableDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
}

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const TimeTableDrawer = ({
  isOpen,
  onClose,
  token,
}: TimeTableDrawerProps) => {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [selectedTimetable, setSelectedTimetable] = useState<string | null>(
    null,
  );
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showRenameSheet, setShowRenameSheet] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [targetTimetable, setTargetTimetable] = useState<Timetable | null>(
    null,
  );

  useEffect(() => {
    if (isOpen) {
      fetchTimetables();
      fetchSemesters();
    }
  }, [isOpen]);

  const fetchTimetables = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tables`, {
        headers: {
          'x-access-token': token,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch timetables');
      const data = await response.json();
      setTimetables(data);
      if (data.length > 0 && selectedTimetable == null) {
        setSelectedTimetable(data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching timetables:', error);
    }
  };

  const fetchSemesters = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/course_books`, {
        headers: {
          'x-access-token': token,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch semesters');
      const data = await response.json();
      setSemesters(data);
      if (data.length > 0) {
        setSelectedSemester(`${data[0].year}-${data[0].semester}`);
      }
    } catch (error) {
      console.error('Error fetching semesters:', error);
    }
  };

  const handleAddTimetable = async () => {
    try {
      const [year, semester] = selectedSemester.split('-');
      const response = await fetch(`${API_BASE_URL}/tables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          year: parseInt(year ?? '0'),
          semester,
          title: newTitle,
        }),
      });
      if (!response.ok) throw new Error('Failed to create timetable');
      await fetchTimetables();
      setShowAddSheet(false);
      setNewTitle('');
    } catch (error) {
      console.error('Error creating timetable:', error);
    }
  };

  const handleDeleteTimetable = async () => {
    if (targetTimetable == null) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/tables/${targetTimetable._id}`,
        {
          method: 'DELETE',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (!response.ok) throw new Error('Failed to delete timetable');
      await fetchTimetables();
      setShowDeleteConfirm(false);
      setTargetTimetable(null);
    } catch (error) {
      console.error('Error deleting timetable:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-lg">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold">시간표 목록</h2>
          <button
            onClick={() => {
              setShowAddSheet(true);
            }}
            className="text-2xl"
          >
            +
          </button>
          <button onClick={onClose} className="text-gray-500">
            &times;
          </button>
        </div>

        <div className="p-4">
          {timetables.map((timetable) => (
            <div
              key={timetable._id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded"
            >
              <div
                onClick={() => {
                  setSelectedTimetable(timetable._id);
                }}
              >
                <div className="font-medium">{timetable.title}</div>
                <div className="text-sm text-gray-500">
                  {timetable.year}년 {timetable.semester}학기
                </div>
              </div>
              <button
                onClick={() => {
                  setTargetTimetable(timetable);
                  setShowRenameSheet(true);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ⋮
              </button>
            </div>
          ))}
        </div>

        {showAddSheet && (
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-lg shadow-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">새 시간표 추가</h3>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
                placeholder="시간표 이름"
                className="w-full p-2 border rounded mb-4"
              />
              <select
                value={selectedSemester}
                onChange={(e) => {
                  setSelectedSemester(e.target.value);
                }}
                className="w-full p-2 border rounded mb-4"
              >
                {semesters.map((sem) => (
                  <option
                    key={`${sem.year}-${sem.semester}`}
                    value={`${sem.year}-${sem.semester}`}
                  >
                    {sem.year}년 {sem.semester}학기
                  </option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowAddSheet(false);
                  }}
                  className="px-4 py-2 text-gray-600"
                >
                  취소
                </button>
                <button
                  onClick={handleAddTimetable}
                  className="px-4 py-2 bg-orange-500 text-white rounded"
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        )}

        {showRenameSheet && (
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-lg shadow-lg">
            <div className="p-4">
              <button
                onClick={() => {
                  setShowRenameSheet(false);
                  setShowDeleteConfirm(true);
                }}
                className="w-full p-3 text-left text-red-500 border-b"
              >
                삭제
              </button>
              <button
                onClick={() => {
                  setNewTitle(targetTimetable?.title ?? '');
                  setShowRenameSheet(false);
                }}
                className="w-full p-3 text-left"
              >
                이름 변경
              </button>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                시간표를 삭제하시겠습니까?
              </h3>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 text-gray-600"
                >
                  취소
                </button>
                <button
                  onClick={handleDeleteTimetable}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import rightArrow from '../../assets/right-arrow.png';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Timetable {
  _id: string;
  year: number;
  semester: number;
  title: string;
  isPrimary: boolean;
  updated_at: string;
  total_credit: number;
}

interface TimeTableDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
  onTimeTableSelect: (timetableId: string) => Promise<void>;
}

interface GroupedTimetables {
  [key: string]: Timetable[];
}

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const TimeTableDrawer = ({
  isOpen,
  onClose,
  token,
  onTimeTableSelect,
}: TimeTableDrawerProps) => {
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [showRenameSheet, setShowRenameSheet] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [targetTimetable, setTargetTimetable] = useState<Timetable | null>(
    null,
  );
  const [expandedSemesters, setExpandedSemesters] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const { data: timetables = [], isLoading: isLoadingTimetables } = useQuery({
    queryKey: ['timetables', token],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/tables`, {
        headers: {
          'x-access-token': token,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch timetables');
      return response.json() as Promise<Timetable[]>;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: semesters = [] } = useQuery<Semester[]>({
    queryKey: ['semesters', token],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/course_books`, {
        headers: {
          'x-access-token': token,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch semesters');
      return response.json() as Promise<Semester[]>;
    },
  });

  interface Semester {
    year: number;
    semester: number;
  }

  const groupTimetablesBySemester = (
    timetableList: Timetable[],
  ): GroupedTimetables => {
    return timetableList.reduce((groups: GroupedTimetables, timetable) => {
      const key = `${timetable.year}년 ${timetable.semester}학기`;
      if (groups[key] == null) {
        groups[key] = [];
      }
      groups[key].push(timetable);
      return groups;
    }, {});
  };

  const toggleSemester = (semester: string) => {
    setExpandedSemesters((prev) =>
      prev.includes(semester)
        ? prev.filter((s) => s !== semester)
        : [...prev, semester],
    );
  };

  const addTimetableMutation = useMutation({
    mutationFn: async () => {
      const [year, semester] = selectedSemester.split('-');
      if (year == null) throw new Error('Year is undefined');
      const response = await fetch(`${API_BASE_URL}/tables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          year: parseInt(year),
          semester,
          title: newTitle,
        }),
      });
      if (!response.ok) throw new Error('Failed to create timetable');
      return response.json() as Promise<Timetable>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['timetables'] });
      setShowAddSheet(false);
      setNewTitle('');
    },
  });

  const deleteTimetableMutation = useMutation({
    mutationFn: async (timetableId: string) => {
      const response = await fetch(`${API_BASE_URL}/tables/${timetableId}`, {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      });
      if (!response.ok) throw new Error('Failed to delete timetable');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['timetables'] });
      setShowDeleteConfirm(false);
      setTargetTimetable(null);
    },
  });

  const groupedTimetables = groupTimetablesBySemester(timetables);

  if (isLoadingTimetables) {
    return <LoadingSpinner />;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed left-0 top-0 bottom-0 w-[320px] bg-white dark:bg-gray-900 shadow-lg overflow-y-auto"
          >
            <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                내 시간표
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShowAddSheet(true);
                  }}
                  className="text-2xl text-blue-500 dark:text-blue-400"
                >
                  +
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 dark:text-gray-400"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-4">
              {Object.entries(groupedTimetables).map(
                ([semester, semesterTimetables]) => (
                  <div key={semester} className="mb-4">
                    <button
                      onClick={() => {
                        toggleSemester(semester);
                      }}
                      className="w-full flex justify-between items-center p-2 text-left"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">
                        {semester}
                      </span>
                      <img
                        src={rightArrow}
                        alt="expand"
                        className={`w-4 h-4 transform transition-transform dark:invert
                        ${expandedSemesters.includes(semester) ? 'rotate-90' : 'rotate-0'}`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedSemesters.includes(semester) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {semesterTimetables.map((timetable) => (
                            <div
                              key={timetable._id}
                              className="flex justify-between items-center p-2 ml-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            >
                              <div
                                onClick={() => {
                                  void onTimeTableSelect(timetable._id);
                                }}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                  {timetable.title}
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  setTargetTimetable(timetable);
                                  setShowRenameSheet(true);
                                }}
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-2"
                              >
                                ⋮
                              </button>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ),
              )}
            </div>
          </motion.div>

          <AnimatePresence>
            {showAddSheet && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="fixed inset-x-0 bottom-0 bg-white rounded-t-lg shadow-lg p-4 mx-auto max-w-[375px]"
              >
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
                    onClick={() => {
                      addTimetableMutation.mutate();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    추가
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showRenameSheet && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="fixed inset-x-0 bottom-0 bg-white rounded-t-lg shadow-lg mx-auto max-w-[375px]"
              >
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
                      setShowRenameSheet(false);
                    }}
                    className="w-full p-3 text-left"
                  >
                    취소
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showDeleteConfirm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  className="bg-white p-4 rounded-lg m-4 max-w-[300px] w-full"
                >
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
                      onClick={() => {
                        if (targetTimetable != null) {
                          deleteTimetableMutation.mutate(targetTimetable._id);
                        }
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      삭제
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

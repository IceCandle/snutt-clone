import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ClassTime, TableResponse } from '../../components/types';

export const TimeTable = ({
  setTotalCredit,
  tableList,
}: {
  setTotalCredit: (credit: number) => void;
  tableList?: TableResponse;
}) => {
  const navigate = useNavigate();
  const hourlist = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const daylist = ['월', '화', '수', '목', '금'];

  const columnCount = 5;
  const rowCount = hourlist.length * 12;

  useEffect(() => {
    if (tableList != null) {
      const totalCredit = tableList.lecture_list.reduce(
        (sum: number, lecture) => sum + lecture.credit,
        0,
      );
      setTotalCredit(totalCredit);
    }
  }, [tableList, setTotalCredit]);

  const handleLectureClick = (lectureId: string) => {
    if (tableList != null) {
      navigate(`/timetables/${tableList._id}/lectures/${lectureId}`);
    }
  };

  return (
    <div className="flex relative overflow-hidden flex-col h-screen max-w-375 mx-auto w-full bg-white dark:bg-gray-900">
      <div
        className="grid h-full"
        style={{
          gridTemplateColumns: `14px repeat(${columnCount}, 1fr)`,
          gridTemplateRows: `40px repeat(${rowCount}, 1fr)`,
        }}
      >
        {daylist.slice(0, 5).map((day, i) => (
          <div
            key={day}
            className="row-start-1 row-end-2 flex justify-center items-end p-2 text-xs 
              text-gray-500 dark:text-gray-400"
            style={{
              gridColumnStart: i + 2,
              gridColumnEnd: i + 2 + 1,
            }}
          >
            {day}
          </div>
        ))}

        {hourlist.map((hour: number, i: number) => (
          <div
            key={hour}
            className="col-start-1 col-end-2 text-right text-xs text-gray-400 dark:text-gray-500 
              opacity-40 pr-1 pt-1"
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          >
            {hour}
          </div>
        ))}

        {hourlist.map((_, i) => (
          <div
            key={_}
            className="col-start-1 -col-end-1 border-t border-gray-200 dark:border-gray-700"
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          />
        ))}

        {hourlist.map((_, i) => (
          <div
            key={_}
            className="col-start-2 -col-end-1 border-b border-gray-100 dark:border-gray-800"
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          />
        ))}

        {daylist.slice(0, 5).map((_, i) => (
          <div
            key={_}
            className="row-start-1 -row-end-1 border-l border-gray-200 dark:border-gray-700"
            style={{
              gridColumnStart: i + 2,
              gridColumnEnd: i + 2 + 1,
            }}
          />
        ))}

        {tableList?.lecture_list.map((lecture, i) =>
          lecture.class_time_json.map((classTime: ClassTime, j: number) => (
            <div
              key={`${i}-${j}`}
              className="col-start-2 col-end-6 row-start-2 row-end-3 bg-primary hover:bg-primary/90 
                text-white text-xs flex justify-center items-center cursor-pointer transition-colors"
              style={{
                gridColumnStart: classTime.day + 2,
                gridColumnEnd: classTime.day + 3,
                gridRowStart: (classTime.startMinute - 540) / 5 + 2,
                gridRowEnd: (classTime.endMinute - 540) / 5 + 2,
              }}
              onClick={() => {
                handleLectureClick(lecture._id);
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-normal">
                  {lecture.course_title}
                </span>
                <span className="text-[10px] font-bold">{classTime.place}</span>
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
};

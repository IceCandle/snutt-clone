import { useEffect } from 'react';

import type { TimeRange } from '../../components/types';

export const TimeTable = ({
  //   timetableId,
  //   setTimetableId,
  setTotalCredit,
  tableList,
}: {
  //   timetableId: string | null;
  //   setTimetableId: (timetableId: string) => void;
  setTotalCredit: (credit: number) => void;
  tableList: TimeRange[];
}) => {
  const hourlist = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const daylist = ['월', '화', '수', '목', '금'];

  const columnCount = 5;
  const rowCount = hourlist.length * 12;

  useEffect(() => {
    const totalCredit = tableList.reduce(
      (sum: number, timeRange: TimeRange) => sum + timeRange.credit,
      0,
    );
    setTotalCredit(totalCredit);
  }, [tableList, setTotalCredit]);

  return (
    <div className="flex relative overflow-hidden flex-col h-screen max-w-375 mx-auto w-full">
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
            className="row-start-1 row-end-2 flex justify-center items-end p-2 text-xs text-textAlternative "
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
            className="col-start-1 col-end-2 text-right text-xs text-textALternative opacity-40 pr-1 pt-1"
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          >
            {hour}
          </div>
        ))}

        {/* 시간 경계선 */}
        {hourlist.map((_, i) => (
          <div
            key={_}
            className="col-start-1 -col-end-1 border-t-[1px] border-solid border-t-lineLight "
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          ></div>
        ))}

        {/* 시간 중간선 */}
        {hourlist.map((_, i) => (
          <div
            key={_}
            className="col-start-2 -col-end-1 border-b-[1px] border-solid border-b-lineLightest"
            style={{
              gridRowStart: i * 12 + 2,
              gridRowEnd: i * 12 + 2 + 6,
            }}
          ></div>
        ))}

        {/* 요일 경계선 */}
        {daylist.slice(0, 5).map((_, i) => (
          <div
            key={_}
            className="row-start-1 -row-end-1 border-l-[1px] border-solid border-l-lineLight"
            style={{
              gridColumnStart: i + 2,
              gridColumnEnd: i + 2 + 1,
            }}
          ></div>
        ))}

        {tableList.map((time, i) => {
          return (
            <div
              key={i}
              className="col-start-2 col-end-6 row-start-2 row-end-3 bg-[#f58d3d] text-white text-xs flex justify-center items-center"
              style={{
                gridColumnStart: time.day + 2,
                gridColumnEnd: time.day + 3,
                gridRowStart: (time.startMinute - 540) / 5 + 2,
                gridRowEnd: (time.endMinute - 540) / 5 + 2,
              }}
            >
              <span className="text-[10px] font-normal">
                {time.course_title}
              </span>
              <span className="text-[10px] font-bold">{time.place}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeTable;

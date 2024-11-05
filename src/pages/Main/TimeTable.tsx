import React from 'react';

export const TimeTable = ({
  timetableId,
  setTotalCredit,
  setTitle,
  setTimetableId,
}: {
  timetableId: string | null;
  setTotalCredit: (credit: number) => void;
  setTitle: (title: string) => void;
  setTimetableId: (timetableId: string) => void;
}) => {
  const hourlist = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  const daylist = ['월', '화', '수', '목', '금'];

  const columnCount = 5;
  const rowCount = hourlist.length * 12;
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
      </div>
    </div>
  );
};

export default TimeTable;

import { useEffect, useState } from 'react';

import { Navbar } from '../../components/Navbar';
import type { TimeRange } from '../../components/types';
import { Header } from './Header';
import { TimeTable } from './TimeTable';

interface UserInfoPageProps {
  tableList: TimeRange[];
  table_title: string | null;
}

const MainPage = ({ tableList, table_title }: UserInfoPageProps) => {
  // const [timetableId, setTimetableId] = useState<string | null>(null);
  const [totalCredit, setTotalCredit] = useState(0);
  const [title, setTitle] = useState<string | null>('');

  useEffect(() => {
    setTitle(table_title);
  }, [table_title]);

  return (
    <div className="flex relative overflow-hidden flex-col h-screen max-w-[375px] mx-auto">
      <Header totalCredit={totalCredit} title={title} />
      <TimeTable
        // timetableId={timetableId}
        setTotalCredit={setTotalCredit}
        // setTimetableId={setTimetableId}
        tableList={tableList}
      />
      <Navbar selectedMenu="timetable" />
    </div>
  );
};

export default MainPage;

import { useState } from 'react';

import { Navbar } from '../../components/Navbar';
import type { TableResponse } from '../../components/types';
import { Header } from './Header';
import { TimeTable } from './TimeTable';
import { TimeTableDrawer } from './TimeTableDrawer';

interface MainPageProps {
  tableList: TableResponse | undefined;
  table_title: string | null;
  token: string | null;
}

const MainPage = ({ tableList, table_title, token }: MainPageProps) => {
  const [totalCredit, setTotalCredit] = useState(0);
  const [title] = useState<string | null>(table_title);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex relative overflow-hidden flex-col h-screen max-w-[375px] mx-auto">
      <Header
        totalCredit={totalCredit}
        title={title}
        onMenuClick={handleDrawerToggle}
      />
      <TimeTable setTotalCredit={setTotalCredit} tableList={tableList} />
      <TimeTableDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        token={token ?? ''}
        onTimeTableSelect={function (): Promise<void> {
          throw new Error('Function not implemented.');
        }}
      />
      <Navbar selectedMenu="timetable" />
    </div>
  );
};

export default MainPage;

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Navbar } from '../../components/Navbar';
import type { TableResponse } from '../../components/types';
import { Header } from './Header';
import { TimeTable } from './TimeTable';
import { TimeTableDrawer } from './TimeTableDrawer';

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

interface MainPageProps {
  tableList: TableResponse | undefined;
  table_title: string | null;
  token: string | null;
}

const MainPage = ({ tableList, table_title, token }: MainPageProps) => {
  const [totalCredit, setTotalCredit] = useState(0);
  const [title] = useState<string | null>(table_title);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const switchTimetableMutation = useMutation({
    mutationFn: async (selectedTableId: string) => {
      if (token == null) throw new Error('No token available');

      const response = await fetch(
        `${API_BASE_URL}/tables/${selectedTableId}`,
        {
          headers: {
            'x-access-token': token,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to switch timetable');
      }

      return response.json() as Promise<TableResponse>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['tableInfo'] });
      setIsDrawerOpen(false);
    },
  });

  const handleTimeTableSelect = async (timetableId: string) => {
    try {
      await switchTimetableMutation.mutateAsync(timetableId);
    } catch {
      alert('Failed to switch timetable');
    }
  };

  return (
    <div className="flex relative overflow-hidden flex-col h-screen mx-auto">
      <Header
        totalCredit={totalCredit}
        title={title}
        onMenuClick={handleDrawerToggle}
        tableId={tableList?._id as string}
      />
      <TimeTable setTotalCredit={setTotalCredit} tableList={tableList} />
      <TimeTableDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        token={token ?? ''}
        onTimeTableSelect={handleTimeTableSelect}
      />
      <Navbar selectedMenu="timetable" />
    </div>
  );
};

export default MainPage;

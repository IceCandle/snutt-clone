import { useState } from 'react';
import React from 'react';

import { Header } from './Header';
import { TimeTable } from './TimeTable';

const MainPage = () => {
  const [timetableId, setTimetableId] = useState<string | null>(null);
  const [totalCredit, setTotalCredit] = useState(0);
  const [title, setTitle] = useState('');

  return (
    <>
      <Header totalCredit={totalCredit} title={title} />
      <TimeTable
        timetableId={timetableId}
        setTotalCredit={setTotalCredit}
        setTitle={setTitle}
        setTimetableId={setTimetableId}
      />
    </>
  );
};

export default MainPage;

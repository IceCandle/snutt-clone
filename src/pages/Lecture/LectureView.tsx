import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { Lecture, TableResponse } from '../../components/types';
import { LectureDetail } from './LectureDetail';

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const LectureView = () => {
  const { timetableId, lectureId } = useParams<{
    timetableId: string;
    lectureId: string;
  }>();
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLecture = async () => {
      if (timetableId == null || lectureId == null) return;

      try {
        const token = localStorage.getItem('token');
        if (token == null) return;

        const response = await fetch(`${API_BASE_URL}/tables/${timetableId}`, {
          headers: {
            'x-access-token': token,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch lecture');
        const data = (await response.json()) as TableResponse;
        const foundLecture = data.lecture_list.find((l) => l._id === lectureId);
        if (foundLecture != null) {
          setLecture(foundLecture);
        }
      } catch (error) {
        console.error('Error fetching lecture:', error);
      }
    };

    void fetchLecture();
  }, [timetableId, lectureId]);

  const handleDelete = async () => {
    if (timetableId == null || lectureId == null) return;

    try {
      const token = localStorage.getItem('token');
      if (token == null) return;

      const response = await fetch(
        `${API_BASE_URL}/tables/${timetableId}/lecture/${lectureId}`,
        {
          method: 'DELETE',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (!response.ok) throw new Error('Failed to delete lecture');
      navigate(`/timetables/${timetableId}/lectures`);
    } catch (error) {
      console.error('Error deleting lecture:', error);
      throw error;
    }
  };

  if (lecture == null) return null;

  return <LectureDetail lecture={lecture} onDelete={handleDelete} />;
};

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LoadingSpinner from '../../components/LoadingSpinner';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLecture = async () => {
      if (timetableId == null || lectureId == null) {
        setError('Invalid timetable or lecture ID');
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (token == null) {
          setError('No authentication token found');
          setIsLoading(false);
          return;
        }

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
        } else {
          setError('Lecture not found');
        }
      } catch (fetchError) {
        console.error('Error fetching lecture:', fetchError);
        setError('Failed to load lecture details');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchLecture();
  }, [timetableId, lectureId]);

  const handleDelete = async () => {
    if (timetableId == null || lectureId == null) return;

    try {
      setIsLoading(true);
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
    } catch (deleteError) {
      console.error('Error deleting lecture:', deleteError);
      throw deleteError;
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error != null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (lecture == null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900">
        <p className="text-gray-500 dark:text-gray-400">Lecture not found</p>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <LectureDetail lecture={lecture} onDelete={handleDelete} />;
};

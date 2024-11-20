import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import type { TableResponse } from '../../components/types';
import { LectureForm } from './LectureForm';

const API_BASE_URL = 'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const NewLecture = () => {
  const navigate = useNavigate();
  const { timetableId } = useParams<{ timetableId: string }>();
  const queryClient = useQueryClient();

  const createLectureMutation = useMutation({
    mutationFn: async (values: {
      course_title: string;
      instructor: string;
      credit: number;
      remark: string;
    }) => {
      if (timetableId == null) {
        throw new Error('Timetable ID is required');
      }

      const response = await fetch(
        `${API_BASE_URL}/tables/${timetableId}/lecture?isForced=true`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token') ?? '',
          },
          body: JSON.stringify({
            ...values,
            class_time_json: [
              {
                day: 2, // Wednesday
                place: '강의실',
                startMinute: 1140, // 19:00
                endMinute: 1230, // 20:30
                start_time: '19:00',
                end_time: '20:30',
                len: 90,
                start: 1140,
              },
            ],
            colorIndex: 0,
          }),
        },
      );

      if (!response.ok) {
        const error = (await response.json()) as { message?: string };
        throw new Error(error.message ?? 'Failed to create lecture');
      }
      return response.json() as Promise<TableResponse>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['table', timetableId] });
      if (timetableId != null) {
        navigate(`/timetables/${timetableId}/lectures`);
      }
    },
  });

  const handleSubmit = async (values: {
    course_title: string;
    instructor: string;
    credit: number;
    remark: string;
  }) => {
    try {
      await createLectureMutation.mutateAsync(values);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : 'Failed to create lecture',
      );
    }
  };

  return (
    <LectureForm
      onSubmit={handleSubmit}
      isLoading={createLectureMutation.isPending}
      mode="create"
    />
  );
};
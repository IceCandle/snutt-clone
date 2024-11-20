import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import type { TableResponse } from '../../components/types';
import { LectureForm } from './LectureForm';

const API_BASE_URL =
  'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

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
      times: Array<{
        day: number;
        start: string;
        end: string;
        place: string;
      }>;
    }) => {
      if (timetableId == null) {
        throw new Error('Timetable ID is required');
      }

      const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        if (hours === undefined || minutes === undefined) {
          throw new Error('Invalid time format');
        }
        return hours * 60 + minutes;
      };

      const classTimeJson = values.times.map((time) => ({
        day: time.day,
        place: time.place.length > 0 || '강의실',
        startMinute: timeToMinutes(time.start),
        endMinute: timeToMinutes(time.end),
        start_time: time.start,
        end_time: time.end,
        len: timeToMinutes(time.end) - timeToMinutes(time.start),
        start: timeToMinutes(time.start),
      }));

      const response = await fetch(
        `${API_BASE_URL}/tables/${timetableId}/lecture?isForced=true`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token') ?? '',
          },
          body: JSON.stringify({
            course_title: values.course_title,
            instructor: values.instructor,
            credit: values.credit,
            remark: values.remark,
            class_time_json: classTimeJson,
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
      void queryClient.invalidateQueries({
        queryKey: ['tableInfo', 'currentTable'],
      });
      navigate('/');
    },
  });

  const handleSubmit = async (values: {
    course_title: string;
    instructor: string;
    credit: number;
    remark: string;
    times: Array<{
      day: number;
      start: string;
      end: string;
      place: string;
    }>;
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

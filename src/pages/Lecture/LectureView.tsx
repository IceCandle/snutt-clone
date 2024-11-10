import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LectureDetail } from './LectureDetail';

interface Building {
  id: string;
  buildingNumber: string;
  buildingNameKor: string;
  buildingNameEng: string;
  locationInDecimal: {
    latitude: number;
    longitude: number;
  };
  campus: string;
}

interface ClassTime {
  day: string;
  place: string;
  startMinute: number;
  endMinute: number;
  start_time: string;
  end_time: string;
  len: number;
  start: number;
  lectureBuildings?: Building[];
}

interface Lecture {
  _id: string;
  academic_year: string;
  category: string;
  class_time_json: ClassTime[];
  classification: string;
  credit: number;
  department: string;
  instructor: string;
  lecture_number: string;
  quota: number;
  freshman_quota: number;
  remark: string;
  course_number: string;
  course_title: string;
}

interface TableResponse {
  lecture_list: Lecture[];
}

const API_BASE_URL = 'https://wafflestudio-seminar-2024-snutt-redirect.vercel.app/v1';

export const LectureView = () => {
  const { timetableId, lectureId } = useParams<{ timetableId: string; lectureId: string }>();
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLecture = async () => {
      if ((timetableId == null) || (lectureId == null)) return;
      
      try {
        const token = localStorage.getItem('token');
        if (token == null) return;

        const response = await fetch(`${API_BASE_URL}/tables/${timetableId}`, {
          headers: {
            'x-access-token': token
          },
        });
        if (!response.ok) throw new Error('Failed to fetch lecture');
        const data = await response.json() as TableResponse;
        const foundLecture = data.lecture_list.find(
          (l) => l._id === lectureId
        );
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
    if ((timetableId == null) || (lectureId == null)) return;
    
    try {
        const token = localStorage.getItem('token');
        if (token == null) return;
  
        const response = await fetch(
          `${API_BASE_URL}/tables/${timetableId}/lecture/${lectureId}`,
          {
            method: 'DELETE',
            headers: {
              'x-access-token': token
            },
          }
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
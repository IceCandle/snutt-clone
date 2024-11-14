export interface Location {
  latitude: number;
  longitude: number;
}

export interface LectureBuilding {
  id: string;
  buildingNumber: string;
  buildingNameKor: string;
  buildingNameEng: string;
  locationInDMS: Location;
  locationInDecimal: Location;
  campus: string;
}

export interface ClassTime {
  day: number;
  place: string;
  startMinute: number;
  endMinute: number;
  start_time: string;
  end_time: string;
  len: number;
  start: number;
  lectureBuildings: LectureBuilding[];
}

export interface Color {
  bg: string;
  fg: string;
}

export interface SnuttEvLecture {
  evLectureId: number;
}

export interface Lecture {
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
  color: Color;
  colorIndex: number;
  lecture_id: string;
  snuttEvLecture: SnuttEvLecture;
  class_time_mask: number[];
}

export interface TableResponse {
  _id: string;
  user_id: string;
  year: number;
  semester: string;
  lecture_list: Lecture[];
  title: string;
}

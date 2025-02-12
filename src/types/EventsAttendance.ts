import { Event } from "../types/Events";
export interface EventAttedance {
  event: Event
  listTeacherAttendance: TeacherAttendance[];
  listStudentAttendance: StudentAttendance[];
  listGuestAttendancee: GuestAttendance[];
}
interface attendance {
  idAttendance: number;
  date: string;
  isPresent: boolean;
  isExit: boolean;
  departureDate: string;
}

export interface TeacherAttendance {
  idTeacher: string;
  firstName: string;
  lastName: string;
  mail: string;
  dni:string;
  gender:string;
  attendance: attendance;
}

export interface StudentAttendance {
  idStudent: string;
  dni: string;
  firstName: string;
  lastName: string;
  mail: string;
  phone: String;
  code:string;
  gender:string
  attendance: attendance;
}

export interface GuestAttendance {
  idGuest: string;
  firstName: string;
  lastName: string;
  mail: string;
  dni: string;
  attendance: attendance;
}

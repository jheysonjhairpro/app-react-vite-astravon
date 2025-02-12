import { Participant } from "./Participant"

export interface Attendance {
  idAttendance: number
  date: string,
  isPresent: boolean,
  eventId: number,
  studentId: number,
  teacherId: number
  participant:Participant
}
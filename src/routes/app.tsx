import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { Teachers } from "../modules/teacher/Teacher";
import { NewTeacher } from "../modules/teacher/NewTeacher";
import { ReportsTable } from "../modules/reports/ReportsTable";
import { NewEvent } from "../modules/events/NewEvent";
import DetailEvent from "../modules/events/DetailEvent";
import { NewStudent } from "../modules/student/NewStudent";
import { Students } from "../modules/student/Student";
import { EventAttendance } from "../modules/attendance/event/EventAttendance";
import TeachersAssistance from "../modules/attendance/fingerprint/TeachersAssistance";
import { Guests } from "../modules/guest/Guest";
import { NewGuest } from "../modules/guest/NewGuest";
import { EventAttendanceDetail } from "../modules/attendance/event/EventAttendanceDetail";
import { RegisterFootprint } from "../modules/attendance/fingerprint/RegisterFootprint";
import { ReportAttendanceTeacher } from "../modules/attendance/fingerprint/ReportAttendanceTeacher";
import { Users } from "../modules/user/Users";
import { NewUser } from "../modules/user/NewUser";

const appRouter = [
  {
    path: "/",
    element: (
      //<ProtectedRoute>
        <AppLayout />
      //</ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      //Events
      {
        path: "/new-event/",
        element: <NewEvent />,
      },
      {
        path: "/detail-event/:id",
        element: <DetailEvent />,
      },
      {
        path: "/attendance-event",
        element: <EventAttendance />,
      },
      {
        path: "/attendance-event/:id",
        element: <EventAttendanceDetail />,
      },
      //Footprint
      {
        path: "/register-teacher-fingerprint/",
        element: <RegisterFootprint />,
      },
      {
        path: "/teachers-assistance/",
        element: <TeachersAssistance />,
      },
      {
        path: "/teacher-attendance-report/",
        element: <ReportAttendanceTeacher />,
      },
      //Teacher
      {
        path: "/users/",
        element: <Users />,
      },
      {
        path: "/new-user/",
        element: <NewUser />,
      },
      //Teacher
      {
        path: "/teacher/",
        element: <Teachers />,
      },
      {
        path: "/new-teacher/",
        element: <NewTeacher />,
      },
      //Student
      {
        path: "/student/",
        element: <Students />,
      },
      {
        path: "/new-student/",
        element: <NewStudent />,
      },
      //Guest
      {
        path: "/guest/",
        element: <Guests />,
      },
      {
        path: "/new-guest/",
        element: <NewGuest />,
      },
      //Reports
      {
        path: "/reports-table/",
        element: <ReportsTable />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;

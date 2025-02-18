import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { Podcast } from "../modules/podcast/Podcast";
import { School } from "../modules/school/School";
import { Activities } from "../modules/Activities/Activities";
import PodcastDetail from "../modules/podcast/PodcastDetails";
import SchoolDetail from "../modules/school/SchoolDetail";
import CourseDetail from "../modules/school/CourseDetail";

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
      {
        path: "/podcast/",
        element: <Podcast />,
      },
      {
        path: "/podcast/:category",
        element: <PodcastDetail />,
      },
      {
        path: "/schools/",
        element: <School />,
      },
      {
        path: "/school/cursos/:id",
        element: <SchoolDetail />,
      },
      {
        path: "/course/:id",
        element: <CourseDetail />,
      },
      {
        path: "/activities/",
        element: <Activities />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;

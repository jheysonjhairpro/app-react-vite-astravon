import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { Podcast } from "../modules/podcast/Podcast";
import { School } from "../modules/school/School";
import { Activities } from "../modules/Activities/Activities";

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
        path: "/schools/",
        element: <School />,
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

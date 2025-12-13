import { createBrowserRouter, Navigate } from "react-router";
import { AboutPage } from "../screens/about/AboutPage";
import { ProfilePage } from "../screens/profile/ProfilePage";
import { LoginPage } from "../screens/auth/LoginPage";
import { PrivateRoute } from "./PrivateRoute";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AboutPage />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<ProfilePage />} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

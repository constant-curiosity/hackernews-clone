import { Navigate } from "react-router-dom";
import CreateLink from "../pages/CreateLink";
import LinkList from "../pages/LinkList";
import RootLayout from "../layout/RootLayout";
import RouterError from "../pages/RouterError";
import SearchFeed from "../pages/SearchFeed";
import ServerError from "../pages/ServerError";
import SignupLogin from "../pages/SignupLogin";

export const publicRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouterError />,
    children: [
      { index: true, element: <Navigate to="/new/1" replace /> },
      { path: "/top", element: <LinkList /> },
      { path: "/new/:page", element: <LinkList /> },
      { path: "/create", element: <CreateLink /> },
      { path: "/error", element: <ServerError /> },
      { path: "/login", element: <SignupLogin /> },
      { path: "/search", element: <SearchFeed /> },
    ],
  },
];

//"replace" due to how we are removing "/" from the history stack,
// so it removes "/" and it is replaced with "/new/1"
// this is a workaround to make sure that we don't have "/" in the history stack

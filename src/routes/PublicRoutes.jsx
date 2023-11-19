import CreateLink from "../pages/CreateLink";
import LinkList from "../pages/LinkList";
import RootLayout from "../layout/RootLayout";
import RouterError from "../pages/RouterError";
import SignupLogin from "../pages/SignupLogin";
import ServerError from "../pages/ServerError";

export const publicRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouterError />,
    children: [
      { index: true, element: <LinkList /> },
      { path: "/create", element: <CreateLink /> },
      { path: "/error", element: <ServerError /> },
      { path: "/login", element: <SignupLogin /> },
    ],
  },
];

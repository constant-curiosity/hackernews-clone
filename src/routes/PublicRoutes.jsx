import RootLayout from "../layout/RootLayout";
import Error from "../pages/Error";
import CreateLink from "../pages/CreateLink";
import LinkList from "../pages/LinkList";
import SignupLogin from "../pages/SignupLogin";

export const publicRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <LinkList /> },
      { path: "/login", element: <SignupLogin /> },
      { path: "/create", element: <CreateLink /> },
    ],
  },
];

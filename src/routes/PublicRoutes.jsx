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
      { index: true, element: <LinkList /> },
      { path: "/create", element: <CreateLink /> },
      { path: "/error", element: <ServerError /> },
      { path: "/login", element: <SignupLogin /> },
      { path: "/search", element: <SearchFeed /> },
    ],
  },
];

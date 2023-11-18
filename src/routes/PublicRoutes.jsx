import RootLayout from "../layout/RootLayout";
import Error from "../pages/Error";
import CreateLink from "../components/CreateLink";
import LinkList from "../components/LinkList";

export const publicRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <LinkList /> },
      { path: "/create", element: <CreateLink /> },
    ],
  },
];

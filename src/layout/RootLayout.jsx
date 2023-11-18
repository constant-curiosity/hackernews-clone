import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
  const loading = useNavigation();
  return (
    <>
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <main>
            {loading.state === "loading" ? <div>Loading...</div> : <Outlet />}
          </main>
        </div>
      </div>
    </>
  );
}

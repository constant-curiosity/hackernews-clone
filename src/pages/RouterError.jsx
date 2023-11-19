import { Link } from "react-router-dom";
import Header from "../components/Header";

const RouterError = () => {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <h1>Error</h1>
        <p>Router Error</p>
        <button>
          <Link to="/">Home</Link>
        </button>
      </div>
    </div>
  );
};

export default RouterError;

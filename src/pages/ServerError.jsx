import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const ServerError = () => {
  const location = useLocation();
  const errorMessage = location.state?.errorMessage || "An error occurred.";

  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage}</p>
      <button>
        <Link to="/login">Login</Link>
      </button>
    </div>
  );
};

export default ServerError;

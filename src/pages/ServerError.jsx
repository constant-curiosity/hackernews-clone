import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";

const ServerError = () => {
  const location = useLocation();
  const errorMessage = location.state?.errorMessage || "An error occurred.";

  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage}</p>

      <Link to="/login">
        <Button buttonText={"Login"} />
      </Link>
    </div>
  );
};

export default ServerError;

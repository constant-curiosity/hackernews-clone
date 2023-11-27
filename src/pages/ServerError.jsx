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

//Look into this error and see if going back to the log in is the best choice.
//This is used when a error is thrown in another component with the useNavigate hook
//to pass in the error message and navigate to this component, inserting the error meeage.

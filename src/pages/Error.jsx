import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div>
      <h1>Error</h1>
      <button>
        <Link to="/">Home</Link>
      </button>
    </div>
  );
};

export default Error;

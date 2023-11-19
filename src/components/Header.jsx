import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <div className="fw7 mr1">Hacker News</div>
        <Link to="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link to="/create" className="ml1 no-underline black">
          submit
        </Link>
      </div>
      <div className="flex flex-fixed">
        <div
          className="ml1 pointer black"
          onClick={() => {
            navigate("/");
          }}
        >
          logout
        </div>
      </div>
    </div>
  );
};

export default Header;

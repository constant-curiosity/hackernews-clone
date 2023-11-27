import { NavLink, useNavigate, Link } from "react-router-dom";
import { useMutation } from "urql";
import LOGOUT_MUTATION from "../graphql/mutation/authMutations/logout";
import styles from "./header.module.css";
import useisLoggedInStore from "../store/isLoggedIn";

const Header = () => {
  const { isLoggedInGlobal, setIsLoggedInGlobal } = useisLoggedInStore();
  const [, logout] = useMutation(LOGOUT_MUTATION);
  const navigate = useNavigate();

  //Maybe move into another directory
  const logOutHandler = async () => {
    try {
      await logout();
      setIsLoggedInGlobal(false);
      navigate("/");
    } catch (error) {
      navigate("/error", {
        state: {
          errorMessage:
            err.message || "An error occurred during logout. Please try again.",
        },
      });
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.flexFixed}>
        <Link className={styles.siteTitle}>
          <div>Hacker News</div>
        </Link>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          new
        </NavLink>
        <div className={styles.separator}>|</div>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          submit
        </NavLink>
      </div>
      <div className={styles.flexFixed}>
        <div
          className={styles.pointer}
          onClick={isLoggedInGlobal ? logOutHandler : () => navigate("/login")}
        >
          {isLoggedInGlobal ? "logout" : "login"}
        </div>
      </div>
    </div>
  );
};

export default Header;

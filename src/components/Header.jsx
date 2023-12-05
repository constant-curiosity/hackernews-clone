import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import { useMutation } from "urql";
import LOGOUT_MUTATION from "../graphql/mutation/authMutations/logout";
import SeparatorPipeHeader from "./SeparatorPipeHeader";
import styles from "./header.module.css";
import userIdStore from "../store/userId";
import userIsLoggedInStore from "../store/isLoggedIn";

const Header = () => {
  const [, logout] = useMutation(LOGOUT_MUTATION);
  const { isLoggedInGlobal, setIsLoggedInGlobal } = userIsLoggedInStore();
  const location = useLocation();
  const navigate = useNavigate();

  //Maybe move into another directory
  const logOutHandler = async () => {
    try {
      const response = await logout();
      if (response && response.data && response.data.logout) {
        userIdStore.getState().clearUserId();
        setIsLoggedInGlobal(false);
        navigate("/");
      } else {
        navigate("/error", {
          state: {
            errorMessage: "An error occurred during logout. Please try again.",
          },
        });
      }
    } catch (error) {
      console.log(error);
      navigate("/error", {
        state: {
          errorMessage: "An error occurred during logout. Please try again.",
        },
      });
    }
  };

  let submitLink;
  isLoggedInGlobal ? (submitLink = "/create") : (submitLink = "/login");

  return (
    <div className={styles.headerContainer}>
      <div className={styles.flexFixed}>
        <Link className={styles.siteTitle}>
          <div>Hacker News</div>
        </Link>
        {/* <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          new
        </NavLink> */}
        <SeparatorPipeHeader />
        <NavLink
          to={submitLink}
          className={
            location.pathname === "/create" ? styles.activeLink : styles.link
          }
        >
          submit
        </NavLink>
        <SeparatorPipeHeader />
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          search
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

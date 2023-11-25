// import { Link, useNavigate } from "react-router-dom";
// import styles from "./header.module.css";

// const Header = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex pa1 justify-between nowrap orange">
//       <div className="flex flex-fixed black">
//         <div className="fw7 mr1">Hacker News</div>
//         <Link to="/" className="ml1 no-underline black">
//           new
//         </Link>
//         <div className="ml1">|</div>
//         <Link to="/create" className="ml1 no-underline black">
//           submit
//         </Link>
//       </div>
//       <div className="flex flex-fixed">
//         <div
//           className="ml1 pointer black"
//           onClick={() => {
//             navigate("/");
//           }}
//         >
//           logout
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

// import { Link, useNavigate } from "react-router-dom";
import { NavLink, useNavigate, Link } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();
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
        <div className={styles.pointer} onClick={() => navigate("/login")}>
          login
        </div>
      </div>
    </div>
  );
};

export default Header;

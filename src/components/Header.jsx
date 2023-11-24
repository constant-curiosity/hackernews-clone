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

import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.headerContainer}>
      <div className={styles.flexFixed}>
        <div className={styles.siteTitle}>Hacker News</div>
        <Link to="/" className={styles.link}>
          new
        </Link>
        <div className={styles.separator}>|</div>
        <Link to="/create" className={styles.link}>
          submit
        </Link>
      </div>
      <div className={styles.flexFixed}>
        <div className={styles.pointer} onClick={() => navigate("/")}>
          logout
        </div>
      </div>
    </div>
  );
};

export default Header;

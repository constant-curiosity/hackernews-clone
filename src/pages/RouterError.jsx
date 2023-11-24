// import { Link } from "react-router-dom";
// import Header from "../components/Header";

// const RouterError = () => {
//   return (
//     <div className="center w85">
//       <Header />
//       <div className="ph3 pv1 background-gray">
//         <h1>Error</h1>
//         <p>Router Error</p>
//         <button>
//           <Link to="/">Home</Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RouterError;

import { Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./routererror.module.css"; // Import the CSS module

const RouterError = () => {
  return (
    <div className={styles.center}>
      <Header />
      <div className={`${styles.ph3} ${styles.pv1} ${styles.backgroundGray}`}>
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

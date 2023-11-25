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

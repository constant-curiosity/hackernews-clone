import { Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./routererror.module.css";
import Button from "../components/Button";

const RouterError = () => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div
        className={`${styles.paddingContainerLR} ${styles.paddingVertical} ${styles.backgroundGray}`}
      >
        <h1>Error</h1>
        <p>Router Error</p>
        <Link to="/">
          <Button buttonText={"Home"} />
        </Link>
      </div>
    </div>
  );
};

export default RouterError;

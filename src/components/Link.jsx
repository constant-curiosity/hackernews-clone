import styles from "./link.module.css"; // Import the CSS module

const Link = ({ description, url, username }) => {
  return (
    <div className={styles.linkItem}>
      <span className={styles.description}>{description}</span>
      <a href={url} className={styles.url}>
        ({url})
      </a>
      <span className={styles.username}>by {username}</span>
    </div>
  );
};

export default Link;

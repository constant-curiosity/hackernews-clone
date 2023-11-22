// const Link = ({ link }) => {
//   return (
//     <div>
//       <div>
//         {link.description} ({link.url} {link.username})
//       </div>
//     </div>
//   );
// };

// export default Link;

import styles from "./link.module.css"; // Import the CSS module

// const Link = ({ link }) => {
//   const { description, url, username } = link;
//   // console.log(description, url, username);
//   return (
//     <div className={styles.linkContainer}>
//       <div className={styles.description}>{description}</div>
//       <div className={styles.url}>{url}</div>
//       <div className={styles.username}>{username}</div>
//     </div>
//   );
// };

// export default Link;
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

import styles from "./link.module.css";
import { timeDifferenceForDate } from "../utils/postDate";

const upvote = () => {
  console.log("voted");
};

const Link = ({ description, url, username, createdAt, votes, index }) => {
  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        <div className="ml1 gray f11" onClick={upvote}>
          ▲
        </div>
      </div>
      <div className="ml1">
        <div className={styles.linkItem}>
          <span className={styles.description}>{description}</span>
          <a href={url} className={styles.url}>
            ({url})
          </a>
        </div>
        <div className={styles.votesAndDate}>
          {votes} votes | <span className={styles.username}>by {username}</span>{" "}
          {timeDifferenceForDate(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Link;

{
  // <div className="flex mt2 items-start">
  //   <div className="flex items-center">
  //     <span className="gray">{index + 1}.</span>
  //     <div className="ml1 gray f11" onClick={upvote}>
  //       ▲
  //     </div>
  //   </div>
  //   <div className="ml1">
  //   <div className={styles.linkItem}>
  //     <span className={styles.description}>{description}</span>
  //     <a href={url} className={styles.url}>
  //       ({url})
  //     </a>
  //     <span className={styles.username}>by {username}</span>
  //   </div>
  //     <div className="f6 lh-copy gray">
  //       {link.votes.length} votes | by{" "}
  //       {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
  //       {timeDifferenceForDate(link.createdAt)}
  //     </div>
  //   </div>
  // </div>;
}

// import styles from "./link.module.css"; // Import the CSS module

// const Link = ({ description, url, username }) => {
//   return (
//     <div className={styles.linkItem}>
//       <span className={styles.description}>{description}</span>
//       <a href={url} className={styles.url}>
//         ({url})
//       </a>
//       <span className={styles.username}>by {username}</span>
//     </div>
//   );
// };

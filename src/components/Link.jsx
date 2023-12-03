import { timeDifferenceForDate } from "../utils/postDate";
import styles from "./link.module.css";
import VOTE_MUTATION from "../graphql/mutation/vote/vote";
import { useMutation } from "urql";
import useisLoggedInStore from "../store/isLoggedIn";
import { useNavigate } from "react-router-dom";

const Link = ({
  createdAt,
  description,
  index,
  linkId,
  url,
  username,
  votes,
}) => {
  const [, executeVoteMutation] = useMutation(VOTE_MUTATION);
  const { isLoggedInGlobal } = useisLoggedInStore();
  const navigate = useNavigate();

  const upVote = () => {
    if (!isLoggedInGlobal) {
      navigate("/login");
      return;
    }
    executeVoteMutation({ linkId: linkId });
  };

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        <div
          className="ml1 gray f11"
          style={{ cursor: "pointer" }}
          onClick={upVote}
        >
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

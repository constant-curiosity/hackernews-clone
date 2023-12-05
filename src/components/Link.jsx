import { timeDifferenceForDate } from "../utils/postDate";
import styles from "./link.module.css";
import VOTE_MUTATION from "../graphql/mutation/vote/vote";
import { useMutation } from "urql";
import userIsLoggedInStore from "../store/isLoggedIn";
import { useNavigate } from "react-router-dom";
import userIdStore from "../store/userId";

const Link = ({
  createdAt,
  description,
  index,
  linkId,
  url,
  username,
  userVotes,
  votes,
}) => {
  const [, executeVoteMutation] = useMutation(VOTE_MUTATION);
  const { isLoggedInGlobal } = userIsLoggedInStore();
  const navigate = useNavigate();
  const userId = userIdStore((state) => state.userId);

  const upVote = () => {
    if (!isLoggedInGlobal) {
      navigate("/login");
      return;
    }
    executeVoteMutation({ linkId: linkId });
  };

  const hasVoted = userVotes.some((vote) => vote.user.id === userId);

  const isVotesIconStyle = hasVoted ? styles.votedStyle : styles.notVotedStyle;

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        <div
          className={`${isVotesIconStyle}`}
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

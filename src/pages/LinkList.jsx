import { useQuery } from "urql";
import Link from "../components/Link";
import styles from "./linklist.module.css";
import FEED_QUERY from "../graphql/query/feedList";

const LinkList = () => {
  const [result] = useQuery({ query: FEED_QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <div>Fetching</div>;
  if (error) return <div>{error.message}</div>;
  if (data.feed.errors.length > 0) return <div>{data.feed.errors[0]}</div>;
  if (data.feed.message !== "") return <div>{data.feed.message}</div>;

  const linksToRender = data.feed.links;
  return (
    <div className={styles.linksList}>
      {linksToRender.map((link, index) => (
        <Link
          key={link.id}
          linkId={link.id}
          description={link.description}
          url={link.url}
          createdAt={link.createdAt}
          votes={link.votes.length}
          userVotes={link.votes}
          index={index}
          //This is here due to a random error that needs to be looked into
          // username={link.postedBy ? link.postedBy.name : "Anonymous"}
          username={link.postedBy.name}
        />
      ))}
    </div>
  );
};

export default LinkList;

//1. Need to add server errors

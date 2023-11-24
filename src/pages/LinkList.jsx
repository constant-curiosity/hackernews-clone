import { useQuery } from "urql";
import Link from "../components/Link";
import styles from "./linklist.module.css";
import FEED_QUERY from "../graphql/query/feedList";

const LinkList = () => {
  const [result] = useQuery({ query: FEED_QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <div>Fetching</div>;
  if (error) return <div>Error</div>;

  const linksToRender = data.feed.links;
  linksToRender.forEach((link) => {});
  return (
    <div className={styles.linksList}>
      {linksToRender.map((link) => (
        <Link
          key={link.id}
          description={link.description}
          url={link.url}
          username={link.postedBy.name}
        />
      ))}
    </div>
  );
};

export default LinkList;

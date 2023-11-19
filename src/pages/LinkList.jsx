import { useQuery } from "urql";
import gql from "graphql-tag";
import Link from "../components/Link";

const FEED_QUERY = gql`
  query Feed {
    feed {
      links {
        id
        description
        url
      }
    }
  }
`;

const LinkList = () => {
  const [result] = useQuery({ query: FEED_QUERY });
  const { data, fetching, error } = result;

  if (fetching) return <div>Fetching</div>;
  if (error) return <div>Error</div>;

  const linksToRender = data.feed.links;
  return (
    <div>
      {linksToRender.map((link) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};

export default LinkList;

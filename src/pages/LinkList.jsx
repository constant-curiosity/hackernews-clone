import { useQuery } from "urql";
import gql from "graphql-tag";
import Link from "../components/Link";
import styles from "./linklist.module.css";

// const FEED_QUERY = gql`
//   query Feed {
//     feed {
//       links {
//         id
//         description
//         url
//       }
//     }
//   }
// `;

const FEED_QUERY = gql`
  query Feed {
    feed {
      links {
        description
        url
        postedBy {
          name
        }
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
  linksToRender.forEach((link) => {
    console.log(link.postedBy?.name || "Anonymous");
  });
  return (
    <div className={styles.linksList}>
      {linksToRender.map((link) => (
        <Link
          key={link.id}
          description={link.description}
          url={link.url}
          username={link.postedBy?.name || "Anonymous"}
        />
      ))}
    </div>
  );
};

export default LinkList;

// return (
//     <div>
//       {linksToRender.map((link) => (
//         <Link key={link.id} link={link} />
//       ))}
//     </div>
//   );
// };

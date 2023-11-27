import gql from "graphql-tag";

export const FEED_QUERY = gql`
  query Feed {
    feed {
      links {
        id
        description
        url
        postedBy {
          id
          name
        }
      }
      errors {
        message
      }
      message
    }
  }
`;

export default FEED_QUERY;
//Location: LinkList.jsx

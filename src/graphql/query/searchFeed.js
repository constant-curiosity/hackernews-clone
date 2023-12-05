import gql from "graphql-tag";

export const FEED_SEARCH_QUERY = gql`
  query Feed($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        createdAt
        description
        url
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      errors {
        message
      }
      message
    }
  }
`;

export default FEED_SEARCH_QUERY;
//Location SearchFeed.jsx
// FeedSearchQuery

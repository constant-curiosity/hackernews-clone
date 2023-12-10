import gql from "graphql-tag";

const FEED_QUERY = gql`
  query Feed($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
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
      count
    }
  }
`;

export default FEED_QUERY;
//Location: LinkList.jsx

// import gql from "graphql-tag";

// export const FEED_QUERY = gql`
//   query Feed {
//     feed {
//       links {
//         id
//         createdAt
//         description
//         url
//         postedBy {
//           id
//           name
//         }
//         votes {
//           id
//           user {
//             id
//           }
//         }
//       }
//       errors {
//         message
//       }
//       message
//     }
//   }
// `;

// export default FEED_QUERY;
//Location: LinkList.jsx

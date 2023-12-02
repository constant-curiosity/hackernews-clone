import gql from "graphql-tag";

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export default VOTE_MUTATION;

import gql from "graphql-tag";

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export default LOGOUT_MUTATION;
//Location: Header.jsx

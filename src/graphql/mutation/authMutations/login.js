import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      authPayload {
        token
        user {
          name
          email
        }
      }
      errors {
        message
      }
    }
  }
`;

export default LOGIN_MUTATION;
//Location: SignupLogin.jsx

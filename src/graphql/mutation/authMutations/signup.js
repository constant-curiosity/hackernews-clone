import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      authPayload {
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

export default SIGNUP_MUTATION;
//Location: SignupLogin.jsx

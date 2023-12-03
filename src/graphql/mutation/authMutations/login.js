import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      authPayload {
        user {
          id
          name
          email
        }
      }
      errors {
        message
      }
      isLoggedIn
    }
  }
`;

export default LOGIN_MUTATION;
//Location: SignupLogin.jsx

//Added id to user  if error

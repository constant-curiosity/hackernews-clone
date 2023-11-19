import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gql from "graphql-tag";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";

// GraphQL Mutations
const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      authPayload {
        token
        user {
          id
          name
          email
        }
      }
      errors {
        field
        message
      }
    }
  }

  # mutation Signup($email: String!, $password: String!, $name: String!) {
  #   signup(email: $email, password: $password, name: $name) {
  #     authPayload {
  #       token
  #     }
  #   }
  # }
`;
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

//Input Validation
const signupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

//Component
const SignupLogin = () => {
  // Used to switch between: Login and Signup Forms | Mutations | Input Validation
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [signupOrLogin, signupOrLoginMutation] = useMutation(
    isLogin ? LOGIN_MUTATION : SIGNUP_MUTATION
  );
  const currentSchema = isLogin ? loginSchema : signupSchema;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(currentSchema),
  });

  //Submit Handler Data To Server
  const onFormSubmitHandler = async (data) => {
    try {
      const response = await signupOrLoginMutation(data);
      // const signupResponse = response.data;
      if (isLogin && response.data) {
        console.log(response.data);
        reset();
        navigate("/");
      } else if (!isLogin && response.data.signup.authPayload.user) {
        reset();
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmitHandler)}>
      <h4 className="mv3">{isLogin ? "Login" : "Sign Up"}</h4>

      {/* Input Fields */}
      <div className="flex flex-column">
        {!isLogin && (
          <>
            <input {...register("name")} placeholder="Your name" />
            {errors.name && <p>{errors.name.message}</p>}
          </>
        )}
        <input {...register("email")} placeholder="Your email address" />
        {errors.email && <p>{errors.email.message}</p>}
        <input {...register("password")} placeholder="Choose a safe password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex mt3">
        <button type="submit" className="pointer mr2 button">
          {isLogin ? "login" : "create account"}
        </button>

        {/* Toggle between Login and Signup */}
        <button
          type="button"
          className="pointer button"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "need to create an account?" : "already have an account?"}
        </button>
      </div>
      {/* {signupResponse.errors && <p>{signupResponse.errors}</p>} */}
      <DevTool control={control} />
    </form>
  );
};

export default SignupLogin;

//Considerations
//1. Need better variable name for clarity : const [isLogin, setIsLogin] = useState(true);
//2. Add functionality for reset password
//3. If there are server errors or network errors redirect to error page adding the error message
//4.

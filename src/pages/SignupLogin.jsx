import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import gql from "graphql-tag";

// GraphQL Mutations
const SIGNUP_MUTATION = gql`
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
const LOGIN_MUTATION = gql`
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

  //Data Mutation Handler Sent To The Server
  //Error Helper Function - code is repetitive.
  const onFormSubmitHandler = async (data) => {
    try {
      const response = await signupOrLoginMutation(data);
      console.log("Response:", response);

      if (response.data === undefined) {
        console.log("Error: Response data is undefined");
        navigate("/error", { state: { errorMessage: "Something went wrong" } });
        return;
      }

      if (!isLogin && response.data?.signup.errors.length > 0) {
        console.log("errors:", response.data.signup.errors);
        const validationErrors = response.data.signup.errors
          .map((err) => err.message)
          .join(", ");
        navigate("/error", { state: { errorMessage: validationErrors } });
        return;
      }

      if (isLogin && response.data?.login.errors.length > 0) {
        const validationErrors = response.data.login.errors
          .map((err) => err.message)
          .join(", ");
        navigate("/error", { state: { errorMessage: validationErrors } });
        return;
      }

      if (isLogin && response.data) {
        console.log("Login successful:", response.data);
        reset();
        navigate("/");
        return;
      }

      if (!isLogin && response.data) {
        console.log("Signup successful:", response.data);
        reset();
        setIsLogin(true);
        return;
      }

      console.log("Unknown error:", response);
      navigate("/error", {
        state: { errorMessage: "An unknown error occurred." },
      });
    } catch (err) {
      navigate("/error", {
        state: {
          errorMessage:
            err.message || "An error occurred during form submission.",
        },
      });
      console.log("Catch block error:", err);
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
//4.

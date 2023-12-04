import { signupSchema, loginSchema } from "../validation/authValidation";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import InputField from "../components/InputField";
import LOGIN_MUTATION from "../graphql/mutation/authMutations/login";
import onFormSubmitHandler from "../api/authLoginSignupSubmission";
import SIGNUP_MUTATION from "../graphql/mutation/authMutations/signup";
import styles from "./signuplogin.module.css";
import userIsLoggedInStore from "../store/isLoggedIn";

const SignupLogin = () => {
  const { setIsLoggedInGlobal } = userIsLoggedInStore();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [, signupOrLoginMutation] = useMutation(
    isLogin ? LOGIN_MUTATION : SIGNUP_MUTATION
  );
  const currentValidationSchema = isLogin ? loginSchema : signupSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(currentValidationSchema),
  });

  const handleFormSubmission = (data) => {
    onFormSubmitHandler({
      isLogin,
      data,
      navigate,
      reset,
      setIsLogin,
      setIsLoggedInGlobal,
      signupOrLoginMutation,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmission)}>
      <h4 className={styles.headerMargin}>{isLogin ? "Login" : "Sign Up"}</h4>
      <div className={styles.inputContainer}>
        {!isLogin && (
          <InputField
            className={styles.marginBottom}
            register={register}
            name="name"
            placeholder="Your name"
            error={errors.name}
          />
        )}
        <InputField
          className={styles.marginBottom}
          register={register}
          name="email"
          placeholder="Your email address"
          error={errors.email}
        />
        <InputField
          className={styles.marginBottom}
          register={register}
          name="password"
          placeholder="Choose a safe password"
          error={errors.password}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button
          type={"submit"}
          buttonText={isLogin ? "login" : "create account"}
        />
        <Button
          type={"button"}
          buttonText={
            isLogin ? "need to create an account?" : "already have an account?"
          }
          onClick={() => setIsLogin(!isLogin)}
        />
      </div>
    </form>
  );
};

export default SignupLogin;

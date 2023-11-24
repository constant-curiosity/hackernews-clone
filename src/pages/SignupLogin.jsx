import { signupSchema, loginSchema } from "../validation/authValidation";
import { useForm } from "react-hook-form";
import { useMutation } from "urql";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/InputField";
import LOGIN_MUTATION from "../graphql/mutation/authMutations/login";
import onFormSubmitHandler from "../api/authLoginSignupSubmission";
import SIGNUP_MUTATION from "../graphql/mutation/authMutations/signup";
import ToggleButton from "../components/ToggleButton";

const SignupLogin = () => {
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
      signupOrLoginMutation,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmission)}>
      <h4 className="mv3">{isLogin ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!isLogin && (
          <InputField
            register={register}
            name="name"
            placeholder="Your name"
            error={errors.name}
          />
        )}
        <InputField
          register={register}
          name="email"
          placeholder="Your email address"
          error={errors.email}
        />
        <InputField
          register={register}
          name="password"
          placeholder="Choose a safe password"
          error={errors.password}
        />
      </div>
      <div className="flex mt3">
        <button type="submit" className="pointer mr2 button">
          {isLogin ? "login" : "create account"}
        </button>
        <ToggleButton isLogin={isLogin} onClick={() => setIsLogin(!isLogin)} />
      </div>
    </form>
  );
};

export default SignupLogin;

// <form onSubmit={handleSubmit(handleFormSubmission)}>
//   <h4 className="mv3">{isLogin ? "Login" : "Sign Up"}</h4>

//   {/* Input Fields */}
//   <div className="flex flex-column">
//     {!isLogin && (
//       <>
//         <input {...register("name")} placeholder="Your name" />
//         {errors.name && <p>{errors.name.message}</p>}
//       </>
//     )}
//     <input {...register("email")} placeholder="Your email address" />
//     {errors.email && <p>{errors.email.message}</p>}
//     <input {...register("password")} placeholder="Choose a safe password" />
//     {errors.password && <p>{errors.password.message}</p>}
//   </div>

//   {/* Make reusable button components */}
//   {/* Submit Button */}
//   <div className="flex mt3">
//     <button type="submit" className="pointer mr2 button">
//       {isLogin ? "login" : "create account"}
//     </button>

//     {/* Toggle between Login and Signup */}
//     <button
//       type="button"
//       className="pointer button"
//       onClick={() => setIsLogin(!isLogin)}
//     >
//       {isLogin ? "need to create an account?" : "already have an account?"}
//     </button>
//   </div>
// </form>

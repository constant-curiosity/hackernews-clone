export const onFormSubmitHandler = async ({
  isLogin,
  data,
  navigate,
  reset,
  setIsLogin,
  signupOrLoginMutation,
}) => {
  try {
    const response = await signupOrLoginMutation(data);

    if (!response.data) {
      navigate("/error", { state: { errorMessage: "Something went wrong" } });
      return;
    }

    const operation = isLogin ? "login" : "signup";
    const operationData = response.data[operation];

    if (operationData.errors && operationData.errors.length > 0) {
      const validationErrors = operationData.errors
        .map((err) => err.message)
        .join(", ");
      navigate("/error", { state: { errorMessage: validationErrors } });
      return;
    }

    if (isLogin) {
      reset();
      navigate("/");
    } else {
      reset();
      setIsLogin(true);
    }
  } catch (err) {
    navigate("/error", {
      state: {
        errorMessage:
          err.message || "An error occurred during form submission.",
      },
    });
  }
};

export default onFormSubmitHandler;

import useUserIdStore from "../store/userId";

export const onFormSubmitHandler = async ({
  isLogin,
  data,
  navigate,
  reset,
  setIsLogin,
  setIsLoggedInGlobal,
  signupOrLoginMutation,
}) => {
  try {
    const response = await signupOrLoginMutation(data);
    console.log("Response:", response);
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

    if (operation === "signup") {
      reset();
      setIsLogin(true);
    } else if (operationData.isLoggedIn) {
      const userId = operationData.authPayload.user.id; //userIdStore
      useUserIdStore.getState().setUserId(userId); //userIdStore
      reset();
      setIsLoggedInGlobal(true);
      navigate("/");
    } else {
      reset();
      const errorMessage = isLogin
        ? "Login failed. Please check your username and password."
        : "Signup failed. Please check the information you entered.";
      navigate("/error", { state: { errorMessage } });
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

export const onPostSubmitHandler = async ({
  postData,
  executeMutation,
  navigate,
}) => {
  const response = await executeMutation(postData);

  navigate("/");
};

export default onPostSubmitHandler;

// console.log(postData);
// const response = await executeMutation(postData);
// console.log(response);
// reset();
// navigate("/");

// export const onPostSubmitHandler = async ({
//   postData,
//   executeMutation,
//   navigate,
//   reset,
// }) => {
//   // const navigate = useNavigate();

//   try {
//     const response = await executeMutation(postData);

//     if (response.error) {
//       // Navigate to the ServerError page and pass the error message as state
//       navigate("/error", { state: { errorMessage: response.error.message } });
//       return;
//     }

//     navigate("/");
//     reset();
//   } catch (error) {
//     console.error(error);
//     navigate("/error", {
//       state: { errorMessage: "An error occurred. Please try again." },
//     });
//   }
// };

// export default onPostSubmitHandler;

// //Will refactor this and the server side code to use and learn UNION
// // Do not add error arr to the link type but chose if there isn't a error
// //return the Link / post else return the error to the front end to
// // display to the user
// //post.js backend

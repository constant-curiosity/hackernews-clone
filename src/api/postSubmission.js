export const onPostSubmitHandler = async ({
  postData,
  executeMutation,
  navigate,
  reset,
}) => {
  const response = await executeMutation(postData);
  console.log(response);
  navigate("/");
};

export default onPostSubmitHandler;

// console.log(postData);
// const response = await executeMutation(postData);
// console.log(response);
// reset();
// navigate("/");

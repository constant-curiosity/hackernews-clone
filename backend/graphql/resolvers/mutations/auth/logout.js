export const logout = (_, __, contextValue) => {
  contextValue.res.cookie("authToken", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "Strict",
  });
  return true;
};

export default logout;

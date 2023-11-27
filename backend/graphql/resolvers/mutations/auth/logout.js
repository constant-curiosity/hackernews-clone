export const logout = (_, __, contextValue) => {
  try {
    contextValue.res.cookie("authToken", "", {
      expires: new Date(0),
      httpOnly: true,
      sameSite: "Strict",
    });
    return true;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export default logout;

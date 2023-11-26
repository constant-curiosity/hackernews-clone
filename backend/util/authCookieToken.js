export const setAuthTokenCookie = (res, token) => {
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  });
};

export default setAuthTokenCookie;

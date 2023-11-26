import jwt from "jsonwebtoken";

const APP_SECRET_KEY = process.env.APP_SECRET_KEY;

export const getUserIdFromToken = (req) => {
  const token = req.cookies["authToken"];
  if (token) {
    try {
      const { userId } = jwt.verify(token, APP_SECRET_KEY);
      return userId;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  }
  return null;
};

export default {
  getUserIdFromToken,
};

import jwt from "jsonwebtoken";
const APP_SECRET_KEY = process.env.APP_SECRET_KEY;

const getTokenPayload = (token) => {
  return jwt.verify(token, APP_SECRET_KEY);
};

export const getUserId = (req, authToken) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error("Not authenticated");
};

export default {
  getUserId,
};

const APP_SECRET_KEY = process.env.APP_SECRET_KEY;
import { loginValidation } from "../../../../validations/validationSchema.js";
import { setAuthTokenCookie } from "../../../../util/authCookieToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateWithZod from "../../../../validations/validateWithZod.js";

export const login = async (_, args, contextValue, ____) => {
  try {
    validateWithZod(loginValidation, args);
    const user = await contextValue.prisma.user.findUnique({
      where: { email: args.email },
    });
    if (!user) {
      return {
        errors: [{ message: "User not found." }],
        isLoggedIn: false,
      };
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      return {
        errors: [{ message: "Invalid password." }],
        isLoggedIn: false,
      };
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET_KEY);

    setAuthTokenCookie(contextValue.res, token);

    return {
      authPayload: {
        token,
        user,
      },
      errors: [],
      isLoggedIn: true,
    };
  } catch (error) {
    if (error.message.includes("validationErrors")) {
      return {
        authPayload: null,
        errors: JSON.parse(error.message).validationErrors,
      };
    } else {
      throw new Error(error.message);
    }
  }
};

export default login;

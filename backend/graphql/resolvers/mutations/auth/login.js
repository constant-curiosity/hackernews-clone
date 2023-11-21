import { loginValidation } from "../../../../validations/validationSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateWithZod from "../../../../validations/validateWithZod.js";
const APP_SECRET_KEY = process.env.APP_SECRET_KEY;

export const login = async (_, args, contextValue, ____) => {
  try {
    validateWithZod(loginValidation, args);
    const user = await contextValue.prisma.user.findUnique({
      where: { email: args.email },
    });
    if (!user) {
      return {
        errors: [{ message: "Invalid email ." }],
      };
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      return {
        errors: [{ message: "Invalid password." }],
      };
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET_KEY);
    return {
      authPayload: {
        token,
        user,
      },
      errors: [],
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
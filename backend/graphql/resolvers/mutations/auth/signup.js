import { signupValidation } from "../../../../validations/validationSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validateWithZod from "../../../../validations/validateWithZod.js";
const APP_SECRET_KEY = process.env.APP_SECRET_KEY;

const signup = async (_, args, contextValue, ____) => {
  try {
    validateWithZod(signupValidation, args);
    const existingUser = await contextValue.prisma.user.findUnique({
      where: { email: args.email },
    });

    if (existingUser) {
      return {
        authPayload: null,
        errors: [{ message: "Email already in use." }],
      };
    }
    const password = await bcrypt.hash(args.password, 10);
    const user = await contextValue.prisma.user.create({
      data: { ...args, password },
    });
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
      console.error(error.message);
      throw new Error(error.message);
    }
  }
};

export default signup;

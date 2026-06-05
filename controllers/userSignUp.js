import { z } from "zod";
import { userSchema } from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import sanitize from "sanitize-html";
const validation = z.object({
  username: z
    .string()
    .min(3, { message: "name must be greater than 3 characters !" })
    .max(50, { message: "name must be less than 50 characters !" })
    .trim(),
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .min(8, { message: "password must be greater than 8 characters !" })
    .max(100, { message: "password must be less than 100 characters !" }),
});
const userSignUp = async (req, res) => {
  try {
    let { username, email, password } = req.body || {};
    const isValidated = validation.safeParse({ username, email, password });
    if (!isValidated.success) {
      const formattedErrors = isValidated.error.issues.map((err) => ({
        msg: err.message,
      }));
      return res.status(400).json({
        success: false,
        errors: formattedErrors,
      });
    }
    const checkEmailExisit = await userSchema.findOne({
      email: isValidated.data.email,
    });
    if (checkEmailExisit)
      return res
        .status(409)
        .json({ success: false, msg: "user already registred !" });
    const hashPassword = await bcrypt.hash(
      sanitize(isValidated.data.password),
      10,
    );
    const sanitizedData = {
      username: sanitize(isValidated.data.username),
      email: sanitize(isValidated.data.email),
      password: hashPassword,
    };
    const submitData = await userSchema.create(sanitizedData);
    res
      .status(201)
      .json({ success: true, msg: "user registred successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "internal server error !" });
  }
};
export default userSignUp;

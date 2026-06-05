import { userSchema } from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, msg: "all fields are required !" });
    const findEmail = await userSchema.findOne({ email });
    if (!findEmail)
      return res
        .status(401)
        .json({ success: false, msg: "invalid email or password !" });
    const checkPassword = await bcrypt.compare(password, findEmail.password);
    if (!checkPassword)
      return res
        .status(401)
        .json({ success: false, msg: "invalid email or password !" });

    const tokenGen = jwt.sign({ token: findEmail._id }, process.env.SCERET_KEY);
    res.cookie("token", tokenGen, {
      httpOnly: false,
      secure: false,
      path: "/",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })
    res.status(200).json({
      success: true,
      msg: "user login successfully",
      welcome: `welcome ${findEmail.username}`,
      token: tokenGen,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "internal server error !" });
  }
};

export default userSignIn;

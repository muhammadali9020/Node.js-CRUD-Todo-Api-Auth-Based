import mongoose from "mongoose";
import { userSchema } from "../models/UserSchema.js";
import jwt from "jsonwebtoken";
const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ success: false, msg: "token expired !" });
    const tokenDecode = jwt.verify(token, process.env.SCERET_KEY);
    if (!tokenDecode)
      return res.status(401).json({ success: false, msg: "token expired !" });
    if (!mongoose.Types.ObjectId.isValid)
      return res
        .status(406)
        .json({ success: false, msg: "UnAuthorized access !" });
    const isVerified = await userSchema.findById(tokenDecode.token);
    if (!isVerified)
      return res
        .status(406)
        .json({ success: false, msg: "UnAuthorized access !" });
    req.userid = isVerified._id;
    next();
  } catch (error) {
    // console.log(error)
    res
      .status(500)
      .json({ success: false, msg: "internal server error !" });
  }
};

export default Auth;

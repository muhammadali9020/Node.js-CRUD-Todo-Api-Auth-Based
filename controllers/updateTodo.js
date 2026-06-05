import mongoose from "mongoose";
import sanitize from "sanitize-html";
import { todoSchema } from "../models/todoSchema.js";

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body || {};
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, msg: "invalid Todo !" });
    if (text === undefined || completed === undefined)
      return res
        .status(400)
        .json({ success: false, msg: "all fields are required !" });
    if (typeof text !== "string")
      return res
        .status(400)
        .json({ success: false, msg: "please enter a valid string !" });
    if (typeof completed !== "boolean")
      return res
        .status(400)
        .json({ success: false, msg: "please enter a valid boolean !" });
    const textSanitize = sanitize(text.trim());
    const findUpdate = await todoSchema
      .findOneAndUpdate(
        {_id:id},
        { text: textSanitize, completed },
        { new: true, runValidators: true },
      )
      .select("text completed");
    if (!findUpdate)
      return res.status(404).json({ success: false, msg: "todo not found !" });
    res.status(200).json({
      success: true,
      msg: "todo updated successfully !",
      data: findUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "internal server error !" });
  }
};

export default updateTodo;

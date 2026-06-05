import { todoSchema } from "../models/todoSchema.js";
import sanitize from "sanitize-html";
const createTodo = async (req, res) => {
  const { text, completed } = req.body || {};
  if (text === undefined || completed === undefined)
    return res
      .status(400)
      .json({ success: false, msg: "all fields are required" });
  if (typeof text !== "string")
    return res
      .status(400)
      .json({ success: false, msg: "please enter a valid string " });
  if (typeof completed !== "boolean")
    return res
      .status(400)
      .json({ success: false, msg: "please enter a valid boolean " });

  const textTrim = sanitize(text.trim());

  try {
    const data = await todoSchema.create({
      text: textTrim,
      completed,
      userid: req.userid,
    });
    res.status(201).json({
      success: true,
      msg: "todo created successfully !",
      data: {
        text: data.text,
        completed: data.completed,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, msg: "error occured in creating todo !" });
  }
};

export default createTodo;

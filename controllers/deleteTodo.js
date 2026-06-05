import mongoose from "mongoose";
import { todoSchema } from "../models/todoSchema.js";
const deleteTodo = async (req, res) => {
  try {
    const id=req.params.id
    console.log("id of req.params.id ",id)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, msg: "invalid Todo !" });
    const findById = await todoSchema
      .findOneAndDelete({ _id: id, userid: req.userid })
      .select("text completed");
    if (!findById)
      return res.status(404).json({ success: false, msg: "Todo not found !" });
    res.status(200).json({
      success: true,
      msg: "Todo deleted successfully !",
      deletedTodo: findById,
    });
  } catch (error) {
    console.log("error deleting todo ", error);
    res
      .status(500)
      .json({ success: false, msg: "internal server error try again later" });
  }
};

export default deleteTodo;

import { todoSchema } from "../models/todoSchema.js";

const getTodos = async (req, res) => {
  try {
    const allTodos = await todoSchema
      .find({ userid: req.userid }).lean()
      .select("text completed");
    res.status(200).json({
      success: true,
      msg: "all todo successfully fetch !",
      todos: allTodos,
    });
  } catch (error) {
    console.log("toto fetching ", error);
    res.status(400).json({ success: false, msg: "todos fetching error " });
  }
};

export default getTodos;

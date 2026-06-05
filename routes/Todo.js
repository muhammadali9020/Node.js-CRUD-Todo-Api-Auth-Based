import express from "express";
import createTodo from "../controllers/createTodo.js";
import getTodos from "../controllers/getTodos.js";
import deleteTodo from "../controllers/deleteTodo.js";
import updateTodo from "../controllers/updateTodo.js";

// ToDo Routes CRUD Operation
const router = express.Router();
//  ToDo fetch all Route
router.get("/all", getTodos);
//  ToDo  Create Route
router.post("/create", createTodo);
//  ToDo  Delete Route
router.delete("/delete/:id", deleteTodo);
//  ToDo Update Route
router.post("/update/:id", updateTodo);

export default router;

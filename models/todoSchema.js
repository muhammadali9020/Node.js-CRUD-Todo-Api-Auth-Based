import mongoose from "mongoose";

const todoschema=new mongoose.Schema({
    text:{type:String,required:true,max:300},
    completed:{type:Boolean,default:false,required:true},
    userid:{type:mongoose.Types.ObjectId,required:true},
    createdAt:{type:Date,default:Date.now()},

})

export const todoSchema=mongoose.model("todos",todoschema)
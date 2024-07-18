const mongoose=require("mongoose")

const todoShema=mongoose.Schema({
    task: { type: String, required: true }
 
})

const TodoModel=mongoose.model("Todos",todoShema)

module.exports=TodoModel
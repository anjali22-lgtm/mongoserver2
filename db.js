
const { UserModel, TodoModel } = require("./db");

const mongoose=require("mongoose");

const Schema=mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    email:{type:string, unique:true},
    password:string,
    name:string
})

const Todo= new Schema({
    tittle:string,
    done: boolean,
    userId: ObjectId
})
const todosSchema = new mongoose.schema({
    title:string,
    description:string,
    done:string,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.export ={
    UserModel: UserModel,
    TodoModel: TodoModel
}


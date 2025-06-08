const express=require("express");
const {UserModel, TodoModel} = require("./db");
const { auth, JWT_SECRET } = require("/auth");
const jwt = require("jsonwebtoken");
const  mongoose =require("mongoose");


mongoose.connect("mongodb+srv://100xdevs:WvaTca009mb90YX@cluster0.ossjd.mongodb.net/todo-harkirat-2222");
then(() => {
  console.log("✅ Connected to MongoDB");
})
const app=express();
app.use(express.json());

app.post("/signup", async function(req,res){
    const email=req.body.email
    const password=req.body.password;
    const name=req.body.name;

    try{
   await UserModel.create({
        email:email,
        password:password,
        name:name
   })
} catch(e){
    res.json
}

    res.json({
        message:"You are logged in"
    })

});
 app.post("/signin", async function(req,res){
    const email=req.body.email;
    const password=req.body.password;

    const user= await UserModel.findOne({
        email:email,
        password:password
    })

    console.log(user);

    if(user){
        const token =jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);
        res.json({
            token:token

        });
     } else{
        res.status(403).json ({
            message: "Incorrect candentials"
        })
    }

 });
 app.post("/todo",auth,function(req,res){
    const userId =req.userId;
    const title=req.body.title;
    TodoModel.create({
        title,
        userId
    })

    res.json({
        uerId: userId
    })

 });
 app.get("/todos",auth, function(req,res){
    const userId =req.userId;
    const users = await.TodoModel.find({
        userId:userId
    })

    res.json({
        todos
    })

 });

 function auth(req,res, next){
    const token =req.headers.token;

    const decodeData=jwt.verify(token,JWT_SECRET);

    if(decodeData){
        req.userId = decodeData.userId;
        next();
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
 }

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

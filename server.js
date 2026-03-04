import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/githubdemo")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});

const User = mongoose.model("User",UserSchema);

app.post("/addUser", async(req,res)=>{
    const user = new User(req.body);
    await user.save();
    res.send("User Added");
});

app.get("/users", async(req,res)=>{
    const users = await User.find();
    res.json(users);
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});

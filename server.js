const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const User=require('./models/user');
const bcrypt=require('bcryptjs');
const { Console } = require('console');

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("<h1 align=center>Welcome</h1>")
})

app.post('/reg',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const hashedpasswords=await bcrypt.hash(password,15)
        const user=new User({username,email,password:hashedpasswords})
        await user.save()
        res.json({message:"User Registered Successfully..... "})
        console.log("User Registration Completed... ")
    }
    catch(err){
        console.log(err)
    }
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        res.json({message:"Login Successful",username:user.username});
        console.log(`${user.username} Login Successful`)
    }
    catch(err){
        console.log(err)
    }
})

mongoose.connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 5000,
}).then(() => {
    console.log("DB Connected Successfully....");
}).catch((err) => {
    console.error("MongoDB Connection Error: ", err);
});

app.listen(PORT, (err) => {
    if (err) {
        console.error("Server Error: ", err);
    } else {
        console.log(`Your server is running on: ${PORT}`);
    }
});
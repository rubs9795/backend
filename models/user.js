const mongoose=require('mongoose')

const U_Schema=mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
})

module.exports=mongoose.model('user',U_Schema)
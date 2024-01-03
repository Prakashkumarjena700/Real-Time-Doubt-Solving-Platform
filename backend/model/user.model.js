const mongoose =require('mongoose');

const userSchema=mongoose.Schema({
    role:String,
    name:String,
    email:String,
    password:String,
    phone:String,
    subjects:Array,
    standard:Array,
    classgrad:String,
    dob:String,
    language:Array
},{
    versionKey: false
})

const userModel=mongoose.model("users",userSchema);

module.exports={
    userModel
}
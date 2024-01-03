const express=require('express');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { userModel } = require('../model/user.model');

const userRoute = express.Router();

userRoute.post('/register',async(req,res)=>{
    const {role,name, email,password, phone,subjects, classgrad, dob,language, standard}=req.body;
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            res.send({ "msg": "Already have an account please login" ,"success":false})

        } else {
            bcrypt.hash(password, 9, async (err, hash) => {
                if (err) {
                    res.send("Something went wrong")
                } else {
                    const user = new userModel({ role,name, email,password:hash, phone,subjects, classgrad, dob,  language,standard })
                    await user.save()
                    res.send({ "msg": "new user has been register", "success": true })
                }
            });
        }

    } catch (err) {
        console.log(err)
        res.send({ "msg": "Can't register", "success": false })
    }
})

userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "doubtsolving")
                    res.send({ "msg": "Login sucessful", "success": true, token, user })
                } else {
                    res.send({ "msg": "Wrong crediential", "sucess": false })
                }
            });
        } else {
            res.send({ "msg": "Wrong crediential", "sucess": false })
        }
    } catch (err) {
        res.send({ "msg": "Something Wrong", "sucess": false })
    }
})

module.exports={
    userRoute
}
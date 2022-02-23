const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const newToken = (user)=>{
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}

const login= async(req, res)=>{
    try{
        const user = await User.find().lean().exec();

        return res.render("users/register.ejs",{user});
    } catch(e){
        return res.status(500).send({message:e.message});
    }
}

const register = async(req, res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.render("users/register.ejs",{errors:errors.array()});
            // res.render("users/register.ejs",{user})
            // res.render.alert("invalid");
            // alert({ errors: errors.array() })
          return res.status(400).json({ errors: errors.array() });

        }
        const user = await User.findOne({email:req.body.email}).lean().exec();
        await User.create({
            full_name:req.body.full_name,
            email:req.body.email,
            password:req.body.password,
            type:"customer"
        })
        const token = newToken(user) 
        return res.render("users/login.ejs",{user});
    } catch(e){
        return res.status(500).send({message:e.message});
    }
}

module.exports = {register, login};
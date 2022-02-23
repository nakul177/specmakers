const express = require('express');
const User = require('../models/users.model')
const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        const user = await User.find().lean().exec();
        return res.render(`users${req.baseUrl}.ejs`,{user});
    } catch(e){
        return res.status(500).send({message:e.message});
    }
});
// router.post('', async(req, res)=>{
//     try{
//         const user = await User.create({
//             full_name:req.body.full_name,
//             email:req.body.email,
//             password:req.body.password,
//             type:"customer"
//         })
//         console.log(user)
//         res.end();
//     } catch(e){
//         return res.status(500).send({message:e.message});
//     }
// });

module.exports = router;
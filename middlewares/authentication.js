require("dotenv").config();
const jwt= require("jsonwebtoken");

const verifyToken = (Token)=>{
    return new Promise ((resolve, reject)=>{
        jwt.verify(Token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err) return reject(err);

            resolve(user);
        })
    });
}

module.exports = async (req, res, next) =>{
    if(!req.headers.authorization)
    return res.status(400).send({message:"authorization token was not provided or not valid"});

    if(!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({message:"authorization token was not provided or not valid"});

    const Token = req.headers.authorization.split(" ")[1];

    let user;
    try{
        user = await verifyToken(Token);
        
    } catch(e){
        return res.status(400).send({message:"authorization token was not provided or not valid"});    
    }

    req.user = user.user;
    // console.log(user.user);

    return next();
}
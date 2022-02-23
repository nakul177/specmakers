// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))


// require("dotenv").config();
const express = require('express');
// const connect = require('./configs/db');
// const userController = require('./controllers/user.controller');
// const {register, login} = require('./controllers/auth.controller');
// const {body, validationResult} = require('express-validator');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true }))

app.get('/', (req, res) => res.render('pages/index'))
app.use('/register', userController);
// app.use('/login', userController);
// app.use('/users', userController);
// app.post('/register', 
// body('full_name').isLength({min:5, max:15}),
// body("email").isEmail()
// .custom(async(value) =>{
//     const mail = await User.findOne({email:value});
//     if(mail) {
//         throw new Error("email already exist");
//     }
//    return true;
// })
// ,
// body('password').isStrongPassword(), register);
// app.post('/login', login)

app.set("view engine", "ejs");
app.use(express.static("public"))

const port = process.env.PORT || 8222;

app.listen(port, async(req, res)=>{
    try{
        // await connect();
        console.log(`listening on port ${port} port....`)
    } catch(e){
        console.log({message:e.message});
    }
})
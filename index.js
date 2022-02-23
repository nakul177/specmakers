require("dotenv").config();
const express = require('express')
const path = require('path')
const connect = require('./configs/db');
const userController = require('./controllers/users.controller');
const {register, login} = require('./controllers/auth.controller');
const {body, validationResult} = require('express-validator');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true }))

// app.get('/', (req, res) => res.render('pages/index'))
app.use('/register', userController);
app.use('/login', userController);
app.use('/users', userController);
app.post('/register', 
body('full_name').isLength({min:5, max:15}),
body("email")
// .custom(async(value) =>{
//   const mail = await User.findOne({email:value});
//   if(mail) {
//     throw new Error("email already exist");
//   }
//   return true;
// })
,
body('password').isStrongPassword(), register);
app.post('/login', login)

// app.set("view engine", "ejs");
// app.use(express.static("public"))

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
// app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

const port = process.env.PORT || 8252

app.listen(port, async()=>{
    try{
        await connect();
        console.log(`listening on port ${port} ....`)
    } catch(e){
        console.log({message:e.message});
    }
})
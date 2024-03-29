const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
   full_name:{type:String, required:true},
   email:{type:String, required:true, unique:true},
   password:{type:String, required:true},
   type:[{type:String, required:true}],
},{
    versionKey:false,
    timestamps:true,
});

userSchema.pre("save", function(next){
    if(!this.isModified("password")) return next();
    
    const hash = bcrypt.hashSync(this.password, 8);
    this.password=hash;
    return next();
    
})

userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password)
}




module.exports= mongoose.model('users', userSchema);
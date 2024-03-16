const mongoose = require('mongoose');
const validator = require('validator');

//structure du schema
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
             type : String,
             required : true,
             unique : true,
             lowercase : true,
             validate : (value)=>{
                   return validator.isEmail(value);
             }
    }
})

//definition du modele
let User = mongoose.model('User',userSchema);





module.exports = mongoose.model('User',userSchema);
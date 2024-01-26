const mongoose = require('mongoose')

const validator = require("validator")






const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('invalid email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    profile:{
        type:String

    }
})

const users = mongoose.model('users',userSchema)


module.exports = users
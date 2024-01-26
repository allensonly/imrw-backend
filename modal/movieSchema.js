const mongoose = require("mongoose")


const movieSchema = new mongoose.Schema({
    moviename: {
        type : String,
        require:true
    },
    mainmovieimage:{
        type:String,
        require:true
    },
    sidemovieimage:{
        type:String,
        require:true
    },
    trailer:{
        type:String,
        require:true
    },
    yearofrealease:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true
    },
    director:{
        type:String,
        require:true
    },
    actor:{
        type:String,
        require:true
    },
    imrwRating:{
        type:Number
    }
})



const movies = mongoose.model('movies',movieSchema)

module.exports = movies
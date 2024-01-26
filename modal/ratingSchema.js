const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
  userId : {
    type:String,
    require:true
  },
  userName:{
    type:String,
    require:true
  },
  movieId:{
    type:String,
    require:true
  },
  movieName:{
    type:String,
    require:true
  },
  rating:{
    type:Number,
    require:true
  },
  profile:{
    type:String
  }


})

const ratings = mongoose.model('ratings',ratingSchema)

module.exports = ratings
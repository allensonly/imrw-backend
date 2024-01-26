const express = require('express')



const usercontroller = require('../Controller/usercontroller')

const movieController = require('../Controller/moviecontroller')

const ratingController = require("../Controller/ratingController")


const router = new express.Router()

// import jwt middleware
const jwtMiddleware = require('../Middleware/jwtMiddleware') 

//import multer

const multerConfig = require('../Middleware/multerMiddleware')


//path for resolving the request

  //a) register
  router.post('/user/register',usercontroller.register)

  //b) login
  router.post('/user/login',usercontroller.login)

  //c) add movie

  router.post('/movie/add-movie',movieController.addNewMovie)

  //d) get allmovie details
  router.get('/movie/all-movie',movieController.getAllMovie)

  //e) rate movie
  router.post('/rate/movie-rate',ratingController.rateAllMovie)

  //f) get each user rating
  router.get('/rate/all-rating/:movieId',jwtMiddleware,ratingController.getMovieRating)

  //g) get each rateMovieCard
  router.get('/rate/all-ratingcard/:movieId',ratingController.getRateCard)

  //h) edit profile
  router.put('/user/edit/profile',jwtMiddleware,multerConfig.single('profile'),usercontroller.editProfile)

  //i) update profile
  router.post('/user/update/profile',jwtMiddleware,multerConfig.single('profile'),ratingController.profileUpdate)

  //j) imrw rating
  router.post('/movie/movie-rating/imrw',ratingController.imrwRating)


 





module.exports = router
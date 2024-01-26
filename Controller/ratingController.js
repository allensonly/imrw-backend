const movies = require('../modal/movieSchema');
const ratings = require('../modal/ratingSchema')

// logic for rating

exports.rateAllMovie = async(req,res) => {
    console.log("inside rating contoller logic");

    const { userId,userName,movieId,movieName,rating} = req.body

    try {
        const allreadyRatedMovie = await ratings.findOne({userId:userId,movieId:movieId})

        if(allreadyRatedMovie){
            const update = await allreadyRatedMovie.updateOne({rating:rating})

            res.status(200).json(`successfully updated ${movieName}  rating`)
        
        }
        else{
            const newRating = new ratings({
                userId,
                userName,
                movieId,
                movieName,
                rating,
                profile:""
            })

            await newRating.save()

            res.status(200).json(newRating)

        }
        
    } catch (error) {
        res.status(401).json(`rate request failed due to ${error}`)
    }


}

//logic for getting movie rating

exports.getMovieRating = async(req,res) =>{
    console.log("inside rating controller logic to get movie");
   

    try {
        const {movieId} = req.params
        const userId = req.payload

        console.log({movieId});
       
        
        const updaterate = await ratings.find({userId:userId, movieId:movieId})

        if(updaterate){

        res.status(200).json(updaterate)
        
        }
        else{
            res.status(200).json(`not foud`)
        }

        

    } catch (error) {
        res.status(401).json('get rating request failed due to',error)
    }

    


    
}

//logic for getting eachrateCardMovie Details

exports.getRateCard = async (req,res) => {
    console.log("inside rating controller logic to get eachrateCardMovie Details");

    try {

        const {movieId} = req.params

        const updateRateCard = await ratings.find({movieId:movieId})
        if(updateRateCard){
            res.status(200).json(updateRateCard)
        }
        else{
            res.status(200).json('not found')
        }
        
    } catch (error) {
        res.status(401).json('get ratecard request failed due error',error)
    }
}


// profile update

exports.profileUpdate = async (req,res) => {
    console.log("inside update profile ");
      const userId = req.payload
      console.log(userId);
      const {profile} = req.body
  
      const profileImage = req.file?req.file.filename:profile
      console.log(profileImage);
  
  
      try {
        
        
            const profileToRatings = await ratings.updateMany({userId:userId},{profile:profileImage},{new:true})
            
            await profileToRatings.save()

    
        
        
      } catch (error) {
        res.status(401).json(error)
      }
   }

   //get all sum

exports.imrwRating = async (req,res) => {
    const {movieId} = req.body
    console.log(movieId);

    try {


        const total = await ratings.countDocuments({movieId:movieId})
        console.log(total);

        const sum = await ratings.aggregate([
            {
                $match: {
                  movieId: movieId // Specify your condition here
                }
              },
            {
              $group: {
                _id: null,  // Group by null to get the sum across all documents
                totalRating: { $sum: "$rating" }  // Calculate the sum of the "amount" field
              }
            }
          ])
            

         const ratetotal = (sum[0].totalRating);

          const preimrwRating =  (ratetotal/total)

          let imrwRating = parseFloat(preimrwRating.toFixed(1))
          console.log(imrwRating);

          res.status(200).json(imrwRating)
         const averageRate = await  movies.updateOne({_id:movieId},{imrwRating:imrwRating})
         console.log(averageRate);
          

        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}






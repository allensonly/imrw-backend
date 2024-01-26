
const movies = require('../modal/movieSchema')


// logic for movie


exports.addNewMovie = async (req,res) => {
    console.log('inside  movie controller -  logic');

    

    const {moviename,mainmovieimage,sidemovieimage,trailer,yearofrealease,genre,director,actor,imrwRating} = req.body

    

    try { const existingMovie = await movies.findOne({moviename})
        
    if(existingMovie){
        res.status(406).json('movie allready exists')
    }
    else {
        const newMovie = new movies({
            moviename,mainmovieimage,sidemovieimage,trailer,yearofrealease,genre,director,actor,imrwRating
        })
        await newMovie.save()
        res.status(200).json(newMovie)
    }

        
    } catch (err) {
        res.status(401).json(`addmovie request failed due to ${err}`)
    }
}

//get All moviedetails

exports.getAllMovie= async (req,res) => {

    const searchkey = req.query.search
    console.log(searchkey);
  
    const query = {
       moviename:{
          $regex:searchkey,$options:'i'
       }
    }
    try {
        const allMovie = await movies.find(query)
        res.status(200).json(allMovie)
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}




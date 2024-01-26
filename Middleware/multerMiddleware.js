
const multer = require("multer")
const users = require("../modal/userSchema")
const ratings = require("../modal/ratingSchema")


//storage creation
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,"./uploads")

    },
    filename:(req,file,callback) => {
      const filename =  `image-${Date.now()}-${file.originalname}`
      callback(null,filename)
    }
})

const fileFilter = (req,file,callback) => {
    if(file.mimetype ==='image/png' || file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error ("only jpeg ,png,jpg files will be allowed !!"))
    }
}

const multerConfig = multer({
    storage,
    fileFilter
})



module.exports = multerConfig
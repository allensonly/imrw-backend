const jwt = require("jsonwebtoken")

const jwtMiddleware = (req,res,next) => {
    console.log("inside jwt middleware");


const token = req.headers['authorization'].split(' ')[1]
console.log(token);

try {
    const jwtResponse =  jwt.verify(token,'supersecretkey123455')
    console.log(jwtResponse);
    req.payload = jwtResponse.userId

    next()


} catch (error) {
    res.status(401).json('authorisation failed please login')
}


}




module.exports = jwtMiddleware
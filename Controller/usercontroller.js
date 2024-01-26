

const users = require('../modal/userSchema')

// import jwt
 const jwt = require('jsonwebtoken') 


// logic for register
exports.register = async (req,res) => {
    console.log('inside user contoler-register logic');


    const {username,email,password} =req.body

   try{ const existinguser = await users.findOne({email:email})

    if (existinguser){

        res.status(406).json('account already exists plaese login ....')
    }
    else{
        const newUser = new users({
            username,
            email,
            password,
            profile:"",
            
        })

        await newUser.save()

        res.status(200).json(newUser)
    }}
    catch(err){
        res.status(401).json("register request failed due to",err)
      }
 }


 // logic for login

 exports.login = async (req,res) =>{
    console.log('inside  user controller - login logic');

    const {username,password} = req.body

   try{ const existingUser = await users.findOne({username:username,password:password})

    if (existingUser ){

      const token = jwt.sign({userId:existingUser._id},"supersecretkey123455") 

    res.status(200).json({

      existingUser:existingUser,
      token:token
    })

    }
    else{
        res.status(406).json('Invalid username id or password')
      }}

      catch(err){
        res.status(401).json(`login request failed due to `,err)
      }


 }

 //edit profile

 exports.editProfile = async (req,res) => {
  console.log("inside edit profile");
    const userId = req.payload
    const {username,email,password,profile} = req.body

    const profileImage = req.file?req.file.filename:profile
    console.log(profileImage);


    try {
      const updateUser = await users.findByIdAndUpdate({_id:userId},{profile:profileImage},{new:true})

      await updateUser.save()
      res.status(200).json(updateUser)

        
      
    } catch (error) {
      res.status(401).json(error)
    }
 }



 
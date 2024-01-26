


const mongoose = require('mongoose')

const connectionstring = process.env.DATABASE.toString()

mongoose.connect(connectionstring).then((res) =>{
    console.log("mongodb connnected successfully");
}).catch((err) => {
    console.log(`mongodb connect failed due to : ${err}`);
})
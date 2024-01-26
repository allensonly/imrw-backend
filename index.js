

require("dotenv").config()

const express = require('express')

const cors = require('cors')

const router = require('./Router/router')

require('./DB/connection')

const imraServer = express()

imraServer.use(cors())

imraServer.use(express.json())

imraServer.use(router)

imraServer.use('/uploads',express.static('./uploads'))

const port = 5000 || process.env.port


imraServer.listen(port, () => {
    console.log(`server running successfullt at ${port}`)
})

imraServer.get('/',(req,res) => {
    res.send('<h1>client server running successfully and waiting for client request</h1>')
})
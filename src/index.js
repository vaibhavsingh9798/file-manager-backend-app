const express = require('express')
require('dotenv').config()

const userRouter = require('./routes/user.route.js')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/users',userRouter)

// sequleize.sync()
// .then(() => console.log('db connected'))
// .catch((err) => console.log('db connection error',err))

app.listen(3002,()=>{
    console.log('server running on port 3000')
})
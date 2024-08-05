const express = require('express')
require('dotenv').config()

const userRouter = require('./routes/user.route.js')
const folderRouter = require('./routes/folder.route.js')
const subfolderRouter = require('./routes/subfolder.route.js')
const fileRouter = require('./routes/file.route.js')
const app = express()

const PORT = process.env.PORT || 3006
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/users',userRouter)
app.use('/api/v1/folders',folderRouter)
app.use('/api/v1/subfolders',subfolderRouter)
app.use('/api/v1/files',fileRouter)


app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})
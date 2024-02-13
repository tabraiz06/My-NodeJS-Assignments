const express = require("express")
const dotenv = require("dotenv").config();
const mongoose = require("mongoose")
const UserRoute = require('./Routes/User.Route')
const PostRoute = require('./Routes/Post.Route')

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())

// create a route 
app.use('/api/route', UserRoute)
app.use('/api/route', PostRoute)

// connect to mongodb 
const URL = "mongodb://localhost:27017/assignment5"
mongoose.connect(URL)
.then(()=> console.log("DB connection succesfull"))
.catch((error)=> console.log(error.message))

app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    console.log(`server is running on port${port}`)
})
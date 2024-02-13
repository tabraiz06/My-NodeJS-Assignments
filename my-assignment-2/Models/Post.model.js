const mongoose = require("mongoose")
const PostSchema = new mongoose.Schema(
  {
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    image:{
        type:String,
        require:true
    }
  }
)
const Post = mongoose.model("Post", PostSchema)
module.exports = Post
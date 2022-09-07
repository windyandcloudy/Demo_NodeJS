const postModel= require("../models/post.model")
module.exports= {
  getAllPost: async(req, res, next) =>{
    let post= await postModel.find()
    res.json(post)
  },
  creatPost: async(req, res, next)=>{
    let {...body}= req.body
    let post= await postModel.create(body)
    res.json(post)
  }
}
const express= require("express")
const router= express.Router()
const {
  getAllPost,
  creatPost
}= require("../controllers/post.controller")
router
  .route("/")
  .get(getAllPost)
  .post(creatPost)
module.exports= router

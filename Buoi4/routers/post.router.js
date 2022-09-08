const express= require("express")
const router= express.Router()
const {
  getAllPost,
  creatPost
}= require("../controllers/post.controller")

const asyncHandle= require("../middlewares/async.middleware")
const authMiddleware= require("../middlewares/auth.middleware")

const roleMiddleware= require("../middlewares/role.middleware")
const typeRole= require("../constants/typeRole")
router
  .route("/")
  .get(
    asyncHandle(authMiddleware),
    roleMiddleware([typeRole.ADMIN, typeRole.USER]),
    asyncHandle(getAllPost)
  )
  .post(creatPost)
module.exports= router
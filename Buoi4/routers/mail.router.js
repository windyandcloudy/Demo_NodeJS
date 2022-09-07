const express= require("express")
const router= express.Router()

const {
  getform,
  sendmail
}= require("../controllers/mail.controller")

const asyncHandle= require("../middlewares/async.middleware")

router
  .route("/")
  .get(
    asyncHandle(getform)
  )
  .post(
    asyncHandle(sendmail)
  )

module.exports= router
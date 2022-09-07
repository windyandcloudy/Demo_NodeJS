const express= require("express")
const router= express.Router()
const testMiddleware= require("../middlewares/test.middleware")
const asyncMiddleware= require("../middlewares/async.middleware")
const {
  getFormLogin,
  login,
  logup,
  getAll
}= require("../controllers/account.controller")

router
  .route("/")
  .get(
    asyncMiddleware(testMiddleware),
    asyncMiddleware(getAll)
  )

router
  .route("/login")
  .get(getFormLogin)
  .post(login)

router
  .route("/logup")
  .post(logup)

module.exports= router
const express= require("express")
const router= express.Router()
const testMiddleware= require("../middlewares/test.middleware")
const asyncMiddleware= require("../middlewares/async.middleware")
const {
  getFormLogin,
  login,
  logup,
  getAll,
  changePassword,
  forgotPassword,
  changePasswordByOtp
}= require("../controllers/account.controller")

const authMiddleware = require("../middlewares/auth.middleware")

router
  .route("/")
  .get(
    asyncMiddleware(testMiddleware),
    asyncMiddleware(getAll)
  )
  .patch(
    asyncMiddleware(authMiddleware),
    asyncMiddleware(changePassword)
  )
  .post(
    asyncMiddleware(forgotPassword)
  )

router
  .route("/login")
  .get(getFormLogin)
  .post(login)

router
  .route("/logup")
  .post(logup)

router
  .route("/confirmotp")
  .patch(
    asyncMiddleware(changePasswordByOtp)
  )
module.exports= router
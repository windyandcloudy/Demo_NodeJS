const express= require("express")
const router= express.Router()

const {
  getFormLogin,
  login,
  logup,
  getAll
}= require("../controllers/account.controller")

router
  .route("/")
  .get(getAll)

router
  .route("/login")
  .get(getFormLogin)
  .post(login)

router
  .route("/logup")
  .post(logup)

module.exports= router
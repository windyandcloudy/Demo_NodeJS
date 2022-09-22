const accountModel= require("../models/account.model")
const bcryptjs= require("bcryptjs")
const jwt= require("jsonwebtoken")
const ErrorResponse = require("../helpers/ErrorResponse")
const sendMail = require("../middlewares/sendMail")

module.exports= {
  getFormLogin: (req, res, next)=>{
    res.render("index")
  },
  login: async(req, res, next)=>{
    let {username, password}= req.body 
    let account= await accountModel.findOne({username: username})// {username: "fadas", password: "09r8fyfhjcsdlfjd"}
    if (!account){
      return res.json({
        statusCode: 404, 
        message: "Tài khoản không tồn tại"
      })
    }
    let checkCorrectPassword= bcryptjs.compareSync(password, account.password)
    if (checkCorrectPassword){
      let token= jwt.sign({
        _id: account._id,
        username: account.username,
        role: account.role
      }, "abcxyz", {expiresIn: "1h"})

      res.status(200).json({
        statusCode: 200,
        message: "Đăng nhập thành công",
        jwt: token
      })
    }else {
      
      res.json({
        statusCode: 400,
        message: "Sai tk hoặc mật"
      })
    }
    // if (checkCorrectPassword){
    //   res.redirect("/accounts")
    // }else {
    //   res.render("error")
    // }
  },
  logup: async(req, res, next)=>{
    let {...body}= req.body // {username: "fjadf", password: "fdjadd"}
    let account= await accountModel.create(body)
    res.json(account)
  },
  getAll: async(req, res, next)=>{
    let accounts= await accountModel.find()
    if (accounts.length>0){
      res.json(accounts)
      // res.render("trangaccount", {accounts: accounts});
    }else {
      res.render("error")
    }
    
  },
  changePassword: async(req, res, next)=>{
    let account= req.account;
    let {old_password, new_password}= req.body
    let checkPassword= bcryptjs.compareSync(old_password, account.password)
    if (!checkPassword){
      throw new ErrorResponse(400, "Mật khẩu cũ không chính xác")
    }
    let newAccount= await accountModel.findByIdAndUpdate(account._id, {password: new_password}, {new: true})
    return res.status(200).json(newAccount)
  },
  forgotPassword: async(req, res, next)=>{
    let {username}= req.body
    let account= await accountModel.findOne({username: username})
    if (!account){
      throw new ErrorResponse(400, "Tên tài khoản không đúng")
    }
    let otp= ""+ Math.floor(Math.random()*10) + Math.floor(Math.random()*10) +Math.floor(Math.random()*10) +Math.floor(Math.random()*10);
    let option={
      email: account.email,
      subject: "Bạn vừa quên mk, hãy nhập otp: "+ otp
    }
    await sendMail(option)
    await accountModel.findByIdAndUpdate(account._id, {otp: otp, time_create_otp: new Date()})
    return res.status(200).json({
      statusCode: 200,
      message: "Đã gửi otp"
    });
  },
  changePasswordByOtp: async (req, res, next)=>{
    let {username, otp, new_password}= req.body
    let account= await accountModel.findOne({
      username: username,
      otp: otp
    })
    let time_create_otp= new Date(account.time_create_otp);
    let now= new Date()

    
    if (!account){
      throw new ErrorResponse(400, "OTP không chính xác")
    }
    let newAcc= await accountModel.findByIdAndUpdate(account._id, {password: new_password}, {new: true})
    return res.status(200).json(newAcc)
  }
}
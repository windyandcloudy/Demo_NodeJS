const accountModel= require("../models/account.model")
const bcryptjs= require("bcryptjs")
const jwt= require("jsonwebtoken")

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
    
  }
}
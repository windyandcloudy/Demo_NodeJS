const accountModel= require("../models/account.model")
const bcryptjs= require("bcryptjs")


module.exports= {
  getFormLogin: (req, res, next)=>{
    res.render("index")
  },
  login: async(req, res, next)=>{
    let {username, password}= req.body 
    let account= await accountModel.findOne({username: username})// {username: "fadas", password: "09r8fyfhjcsdlfjd"}
    let checkCorrectPassword= bcryptjs.compareSync(password, account.password)
    if (checkCorrectPassword){
      res.redirect("/accounts")
    }else {
      res.render("error")
    }
  },
  logup: async(req, res, next)=>{
    let {...body}= req.body // {username: "fjadf", password: "fdjadd"}
    let hashPassword= bcryptjs.hashSync(body.password, 10)
    console.log(body)
    console.log(hashPassword)
    body.password= hashPassword
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
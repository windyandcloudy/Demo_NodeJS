const accountModel= require("../models/account.model")

module.exports= {
  getFormLogin: (req, res, next)=>{
    res.render("index")
  },
  login: async(req, res, next)=>{
    let {username, password}= req.body 
    let account= await accountModel.findOne({username: username, password: password})
    console.log(account);
    if (account){
      res.redirect("/accounts")
    }else {
      res.render("error")
    }
  },
  logup: async(req, res, next)=>{
    let {...body}= req.body
    console.log(body)
    let account= await accountModel.create(body)
    res.json(account)
  },
  getAll: async(req, res, next)=>{
    let accounts= await accountModel.find()
    if (accounts.length>0){
      res.render("trangaccount", {accounts: accounts});
    }else {
      res.render("error")
    }
  }
}
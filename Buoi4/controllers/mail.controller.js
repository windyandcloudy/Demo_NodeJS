const sendMail= require("../middlewares/sendMail")

module.exports= {
  getform: async(req, res, next)=>{
    res.render("formsendmail")
  },
  sendmail: async(req, res, next)=>{
    // res.json(req.body)
    let a= await sendMail(req.body)
    res.json(a)
  }
}
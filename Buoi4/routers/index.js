const accountRouter= require("./account.router")
const postRouter= require("./post.router")
const fileRouter= require('./file.router')
const mailRouter= require('./mail.router')
module.exports= (app)=>{
  app.use("/accounts", accountRouter)
  app.use("/posts", postRouter)
  app.use("/files", fileRouter)
  app.use("/mail", mailRouter)
  app.use("/*", async(req, res, next)=>{
    res.render("error", {error: "Trang này không tồn tại..."})
  })
}



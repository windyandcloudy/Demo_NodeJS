const accountRouter= require("./account.router")

module.exports= (app)=>{
  app.use("/accounts", accountRouter)

  app.use("/*", async(req, res, next)=>{
    res.render("error", {error: "Trang này không tồn tại..."})
  })
}



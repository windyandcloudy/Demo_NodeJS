const express= require("express")
const app= express()
const connectDB= require("./configs/database")

const router= require("./routers")

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static('./public'))

connectDB()
router(app)

//middleware

app.listen(3000, ()=>{
  console.log("Server run at port 3000")
})
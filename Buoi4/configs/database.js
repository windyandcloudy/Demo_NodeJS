const mongoose = require("mongoose")

const connectDB= async()=>{
  try {
    await mongoose.connect("mongodb://localhost:27017/demo4")
    console.log("Connect DB successful")
  } catch (error) {
    console.log("Lỗi kết nối db: "+ error.message)
  }
}

module.exports= connectDB
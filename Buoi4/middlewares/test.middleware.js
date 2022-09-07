module.exports= (req, res, next)=>{
  console.log("hello. this is a middleware")
  next()
}
const jwt= require("jsonwebtoken")
const accountModel= require("../models/account.model")

module.exports= async(req, res, next)=>{
  const {authorization}= req.headers
  if (!authorization || !authorization.startsWith("Bearer ")){
    return res.json({
      statusCode: 500,
      message: "cần truyền header chứa jwt lên"
    })
  }
  const token= authorization.split(" ")[1];
  const decode= jwt.verify(token, "abcxyz");
  const account= await accountModel.findById(decode._id);
  if (!account){
    throw new ErrorResponse(403, "Unauthorized")
  }
  req.account= account;
  next();
}
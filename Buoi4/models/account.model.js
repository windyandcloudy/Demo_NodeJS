const mongoose= require("mongoose")
const bcryptjs= require("bcryptjs")

const accountSchema= mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  role: {
    type: String,
    default: "user"
  }
})

// accountSchema.set("toJSON", {
//   transform: function(doc, ret, option){
//     delete ret.password
//     return ret
//   }
// })

accountSchema.pre("save", function(next){
  const account= this;
  if (account.password){
    account.password= bcryptjs.hashSync(account.password, 10)
  }
  next();
})

accountSchema.pre("findOneAndUpdate", function(next){
  const account= {...this.getUpdate()}
  if (account.password){
    account.password= bcryptjs.hashSync(account.password, 10)
  }
   
  this.setUpdate(account)
  next()
})

module.exports= mongoose.model("account", accountSchema)
const mongoose= require("mongoose")

const accountSchema= mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String
})

// accountSchema.set("toJSON", {
//   transform: function(doc, ret, option){
//     delete ret.password
//     return ret
//   }
// })

module.exports= mongoose.model("account", accountSchema)
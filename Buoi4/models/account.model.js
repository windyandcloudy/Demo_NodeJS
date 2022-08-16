const mongoose= require("mongoose")

const accountSchema= mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String
})

module.exports= mongoose.model("account", accountSchema)
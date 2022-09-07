const mongoose= require("mongoose")

const postSchema= mongoose.Schema({
  content: String,
  img: String,
  idAcc: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "account"
  }
})

module.exports= mongoose.model("post", postSchema)

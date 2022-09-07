

module.exports= {
  getFormUploadFile: async(req, res, next)=>{
    res.render("formupload")
  },
  uploadFile: async(req, res, next)=>{
    console.log(req.file)
    res.render("showimg", {img: "uploads/"+req.file.filename})
  }
}
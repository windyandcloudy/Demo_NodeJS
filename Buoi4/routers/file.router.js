const express= require("express")
const router= express.Router()

const {
  getFormUploadFile,
  uploadFile
}=require("../controllers/file.controller") 


const multer= require("multer")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+ "."+ file.originalname.split(".")[1])
  }
})

const upload = multer({ storage: storage })
const asyncHandle= require("../middlewares/async.middleware")
router
  .route("/")
  .get(
    asyncHandle(getFormUploadFile)
  )
  .post(
    upload.single("img"),
    asyncHandle(uploadFile)
  )
module.exports = router
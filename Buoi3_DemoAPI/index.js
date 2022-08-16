const express= require("express")
const app= express()

const products= [
  {
    name: "giầy thể thao",
    price: 2000,
    description: "Giầy VN"
  },
  {
    name: "giầy thể thao",
    price: 2000,
    description: "Giầy VN"
  },
  {
    name: "giầy thể thao",
    price: 2000,
    description: "Giầy VN"
  }
]

app.get("/api/products",  (req, res, next)=>{
  
  res.status(200).json(products)
})


app.listen(3000, ()=>{
  console.log("Server run at port 3000")
})
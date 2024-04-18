const express = require("express");
const app = express()
const productsRouter = require("./routes/products.js")
const cartsRouter = require("./routes/carts.js")

const port = 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/", productsRouter)
app.use("/", cartsRouter)

app.listen(port, () =>
    console.log(`server running on port ${port}`))

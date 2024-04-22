const express = require("express");
const app = express()
const path = require("path")
const productsRouter = require("./routes/products.js")
const cartsRouter = require("./routes/carts.js")

const port = 8080

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.use("/", (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () =>
    console.log(`server running on port ${port}`))

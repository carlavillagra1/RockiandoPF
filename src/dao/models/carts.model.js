const mongoose  = require("mongoose")

const cartsColletion = "carts"

const cartsSchema = new mongoose.Schema({
    products: {
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"products"
                }
            }
        ]
        , default: []
    },
    total: { type: Number, required: true },
    userId: {type: String }
})

const carstModel = mongoose.model(cartsColletion, cartsSchema)

module.exports = carstModel
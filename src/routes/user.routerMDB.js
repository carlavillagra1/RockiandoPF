const express = require("express");
const { default: userModel } = require("../dao/models/user.model.js");

const router = express.Router()

router.get('/', async(req,res) =>{
    try {
        let  users = await userModel.find()
        res.send({ result: "success", playload: users })
    } catch (error) {
        console.log(error)
        
    }
})

router.post('/', async(req,res)=>{
   
})
module.exports = router
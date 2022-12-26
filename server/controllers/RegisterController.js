const RegisterModel = require("../models/RegisterModel")
const UserModel = require("../models/UserModel")
const {encrypt, decrypt, compare} = require("n-krypta")
const bcrypt = require("bcryptjs")

const saveUser = async (req, res) => {
    try {
        
        const secret_key = "$2a$10$nDsFXtdZ2JL8ay/bKPqjru"

        const {name, email, username, password} = req.body

        const enc_pass = bcrypt.hashSync(password, secret_key)

        await RegisterModel.create({name:name, email:email})
        await UserModel.create({username:username, password:enc_pass})
        //const list = await RegisterModel.find({})
        res.json({msg:"Success"})   
    } catch (error) {
        res.json({msg:error})
    }
}

module.exports = {saveUser}
const UserModel = require("../models/UserModel")
const UserInfoModel = require("../models/UserInfoModel")
const bcrypt = require("bcryptjs")

const checkLoginInfo = async (req, res) => {
    let number = (Math.random())
    let str_number = number.toString()
    let token = str_number.slice(2,15)
    console.log(token)

    UserModel.find( { username: { $exists: true, $in:[req.body.username] } }, function(err, data){
        if(err) {
            return false
        }
        //if data not found
        if(data.length===0){
            res.send({token: null, username:null})
            return false
        }
        //compare password from DB
        bcrypt.compare(req.body.password, data[0].password, function(err, result){
            if(err){
                return false
            }
            const {username} = req.body
            if(result===true){
                // async (req, res) =>{
                //     const list = await UserInfoModel.find({email:username})
                //     console.log(list)   
                // }
                res.send({token: token, username:username})

            }else{
                res.send({token: null, username:null})
            }
            
        })

    })
}

module.exports = {checkLoginInfo}
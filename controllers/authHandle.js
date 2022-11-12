const cookieParser = require('cookie-parser')
const bcrypt = require("bcrypt")
const { UserModel } = require('../models/auth')


exports.signIn = async(req,res,next) => {
    try{
        console.log("we are iside sigin")
        const {email,name,password} = req.body
        const saltRounds = 10
        const options = {
            maxAge:1000 * 60 * 60 *7,
            signed : true
        }

        const userData = await UserModel.findOne({ email:email})
        console.log(userData)
        if(userData){
            return res.status(400).json({
                error: 'Email is alredy in use'
            })
        }
        const hash = bcrypt.hashSync(password,saltRounds)
        const user = new UserModel({
            email:email,
            password: hash,
            name:name
        })
        await user.save()
        res.cookie('userDetails',{
            email:email,
            name:name
        },options)
        
        res.status(200).send('Signin sucessful')
    }
    catch(err){
        console.error(err)
        res.status(400).json({
            "message": "SignIn Failed"
        })
    }
} 


exports.logIn = async(req,res,next) => {
    console.log("wez")
    console.log(req.cookies.ext_name, req.signedCookies,req.cookies)
    const cookieValue = req.signedCookies;
    const { email } = req.body

    const user = await UserModel.findOne({
        email:email
    })

    if(!user){
        return res.status(200).json({
            message: "plese Signin before Login"
        })
    }
    console.log("we are seeig te cookieVale",cookieValue)

    res.status(200).json({
        "message": "User Signin Succesfully"
    })
}
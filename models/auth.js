const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserProfile = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },

    password: {
        type: String
    }
})


exports.UserModel = mongoose.model('UserProfile', UserProfile)

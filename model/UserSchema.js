const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userLocation:{
        type:String,
        required:true
    },
    userBio:{
        type:String,
        required:true
    },
    userSkills:{
        type:Array,
        required:true
    },
    userLinks:{
        type:Array,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('test-User',UserSchema);
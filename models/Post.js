const mongoose = require('mongoose');
const postSchemea = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true 
    },
    subtitle:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        
    }
    
},{timestamps:true});


module.exports = mongoose.model("Post" , postSchemea);
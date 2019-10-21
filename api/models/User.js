const mongoose = require('mongoose');
let User = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
},{collection:'Users'})
module.exports=mongoose.model('User',User)
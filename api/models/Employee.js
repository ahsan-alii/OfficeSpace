
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Employee = new Schema({
  //  _id: { type: String },
    first_name: { type: String },
    last_name: { type: String },
    title: { type: String },
    email: { type: String },
    gender: { type: String },
    location: { type: String },
    phone: { type: String },
    branch: { type: String },
    department: { type: String },
    positionX: { type: Number },
    positionY: { type: Number }
},
    { collection: 'Employees' });
module.exports = mongoose.model('Employees', Employee)


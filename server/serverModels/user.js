const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    nombre: String,
    apellidos: String,
    email: String,
    pass: String,
    roleId: Number
}, { versionKey: false });

module.exports = mongoose.model('users', UserSchema);
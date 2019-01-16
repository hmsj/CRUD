const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GrupoSchema = new Schema({
    numero: Number,
    nombre: String,
    puntuacionTotal: Number
}, { versionKey: false });

module.exports = mongoose.model('grupos', GrupoSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PruebaSchema = new Schema({
    numero: Number,
    nombre: String,
    descripcion: String,
    zona: String,
}, { versionKey: false });

module.exports = mongoose.model('pruebas', PruebaSchema);
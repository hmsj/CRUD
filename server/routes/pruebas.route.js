const express = require('express');
const router = express.Router();
const Prueba = require('../serverModels/prueba');

router.get('/getPruebas', async (req, res) => {
    const pruebas = await Prueba.find();
    if(pruebas) {
        res.status(200).send(pruebas)
    } else {
        res.status(500).send(err);
    }
});

router.post('/addPrueba', async (req, res) => {
    const prueba = new Prueba(req.body);
    await prueba.save();
    if(prueba) {
        res.status(200).send(prueba)
    } else {
        res.status(500).send(err);
    }
});

router.post('/updatePrueba', (req, res) => {
    Prueba.findByIdAndUpdate(req.body._id, {numero: req.body.numero, nombre: req.body.nombre, zona: req.body.zona, descripcion: req.body.descripcion}, function(err, prueba) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(prueba);
        }
    })
});

router.post("/deletePrueba", (req, res) => {
    //const prueba = new Prueba();
    Prueba.deleteOne({_id: req.body.id}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data.numero);
        }
    });
});

router.get("/getPrueba/:numero", (req, res) => {
    const prueba = Prueba.findOne({'numero': req.params.numero}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });

})
module.exports = router;
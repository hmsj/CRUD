const express = require('express');
const router = express.Router();
const Grupo = require('../serverModels/grupo');

router.get('/getGrupos', async (req, res) => {
    const grupos = await Grupo.find();
    if(grupos) {
        res.status(200).send(grupos)
    } else {
        res.status(500).send(err);
    }
});

router.post('/addGrupo', async (req, res) => {
    const grupo = new Grupo(req.body);
    await grupo.save();
    if(grupo) {
        res.status(200).send(grupo)
    } else {
        res.status(500).send(err);
    }
});

router.post('/updateGrupo', (req, res) => {
    Grupo.findByIdAndUpdate(req.body._id, {numero: req.body.numero, nombre: req.body.nombre, puntuacionTotal: req.body.puntuacionTotal}, function(err, grupo) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(grupo);
        }
    })
});

router.post("/deleteGrupo", (req, res) => {
    Grupo.deleteOne({_id: req.body.id}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data.numero);
        }
    });
});

router.get("/getGrupo/:numero", (req, res) => {
    const grupo = Grupo.findOne({'numero': req.params.numero}, function(err, data) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });

})
module.exports = router;
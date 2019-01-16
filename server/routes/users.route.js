const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../serverModels/user');

const  saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

router.get('/getUsuarios', async (req, res) => {
    const usuarios = await User.find();
    if(usuarios) {
        res.status(200).send(usuarios)
    } else {
        res.status(500).send(err);
    }
});

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.pass, saltRounds, (err, encrypted) => {
        if(err){
            res.status(500).send(err);
        } else if(encrypted){
            console.log('not encrypted ', req.body.pass);
            req.body.pass = encrypted;
            console.log('encrypted ', req.body.pass);
            const user = new User(req.body);
            user.save()
                .then(data => res.status(200).send(user))
                .catch(error => res.status(500).send(error))
        }     
    })
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    User.findOne({'username': username}, (err, data) => {
        if(data) {
            return bcrypt.compare(pass, data.pass, (err1, same) => {
                if(same) {
                    console.log('Coincide pass');
                    res.status(200).send(data);
                } else {
                    console.log('Error pass');
                    res.status(404).send(err1);
                }
            })
        } else {
            res.status(404).send(err);
            console.log('findOne ', err);
        }
    });
});

router.get('/getUserByUsername/:username', (req, res) => {
    const user = User.findOne({'username': req.params.username}, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

router.get('/getUserByEmail/:email', (req, res) => {
    User.findOne({'email': req.params.email}, (err, data) => {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

module.exports = router;
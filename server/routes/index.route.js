const express = require('express');
const router = express.Router();

/* GET Home page */ 
router.get('/', (req, res) => {
    res.status(200).send();
});

module.exports = router;
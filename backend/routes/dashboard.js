const express = require('express');
const router = express.Router();
const {quizes} = require('../data')


router.get('/taken', (req, res) => {
    res.json(quizes);
})
router.get('/average', (req, res) => {
    
})

module.exports = router;
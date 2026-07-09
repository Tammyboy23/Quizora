const express = require('express');
const router = express.Router();
const {quizes} = require('../data')


router.get('/created', (req, res) => {
    res.json(quizes);
})
router.get('/average', (req, res) => {
    
})

module.exports = router;
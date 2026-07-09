const express = require('express');
const router = express.Router();
const {quizes} = require('../data');

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const note = quizes.find((item) => item.id === Number(id));
    if(!note){
        res.status(404).json({status: "Failed to Get Notes"})
    }
    res.json(note)
})

module.exports = router;
const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/', (req, res) =>{
    try{
        res.sendFile(path.resolve('static/homepage.html'));
    } catch (e){
        res.status(500).json(e);
    }
});

module.exports = router;
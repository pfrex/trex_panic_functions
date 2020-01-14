"use strict";

const express = require("express");
const router = express.Router();
const redisClient = require("./redis_index");

router.all("/", (req,res) => {
    let agent = req.get("User-Agent");
    if (agent !== "TrexGM") {
        res.end();
    } 
    
    let key = req.body.key;
    let value = req.body.value;

    redisClient.set.set(key,value);

    res.end();
});

module.exports = router;

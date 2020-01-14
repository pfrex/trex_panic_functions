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
  
    redisClient.set(key, value, "EX", 30);
  
    res.end(); // no response is needed so just end
  });
  
  module.exports = router;
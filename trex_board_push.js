"use strict";

const express = require("express");
const router = express.Router();
const redisOperation = require("./redis_index");

router.all("/", (req,res) => {
    let agent = req.get("User-Agent");
    if (agent !== "TrexGM") {
      res.end();
    }
  
    let score = req.body.wins;
    let element = req.body.player;
  
    redisOperation.zadd("winBoard", score, element);
  
    res.end(); // no response is needed so just end
  });

  module.exports = router;
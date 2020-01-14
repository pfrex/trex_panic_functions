"use strict";

const express = require("express");
const router = express.Router();
const redisClient = require("./redis_index");

router.all("/", (req,res) => {
    let agent = req.get("User-Agent");
    if (agent !== "TrexGM") {
      res.end();
    }
  
    let trex_id = req.body.trex_id;
    redisClient.srem("matchMakerSet",trex_id);
  
    res.end();
  });
  
  module.exports = router;
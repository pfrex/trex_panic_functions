"use strict";

const express = require("express");
const router = express.Router();
const redisClient = require("./redis_index");

router.all("/", (req,res) => {
    let agent = req.get("User-Agent");
    if (agent !== "TrexGM") {
      res.end();
    }
  
    async function findMatch() {
      try {
        let trex_id = req.body.trex_id;
        let result = await redisClient.spopAsync("matchMakerSet");
  
        if (result == null) {
          redisClient.sadd("matchMakerSet", trex_id);
          res.end("waiting");
        } else {
          if (trex_id !== result) {
              res.end(result);
          }
          else{
            // we matched with ourselves, so return ourselves to the set
            redisClient.sadd("matchMakerSet", trex_id);
            res.end("waiting");
          }
            
        }
      } catch (error) {
        res.end();
      }
    }
  
    findMatch();
  });
  
  module.exports = router;
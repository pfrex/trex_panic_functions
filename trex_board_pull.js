"use strict";

const express = require("express");
const router = express.Router();
const redisOperation = require("./redis_index");

router.all("/", (req,res) => {
    let agent = req.get("User-Agent");
    if (agent !== "TrexGM") {
      res.end();
    }
  
    // this is what will be returned to the client
    let gmBoard = [];
    let i = 0;
  
    async function getRange() {
      try {
        let start = req.body.start;
        let stop = req.body.stop;
        let result = await redisOperation.zrevrangeAsync("winBoard", start, stop);
        let repeat = result.length;
        if (repeat === 0) {
          res.end("empty");
        }
  
        // the get values internal function
        async function getValues(key, i) {
          try {
            let value = await redisOperation.getAsync(key[i]);
  
            // end it if there are no more valid users on the leaderboard
            if (value === null) {
              res.end(JSON.stringify(gmBoard));
            }
  
            // if the value is not null push to the gmBoard
            gmBoard.push(JSON.parse(value));
  
            if (i === repeat - 1) {
              res.end(JSON.stringify(gmBoard));
            }
            getValues(key, i + 1);
          } catch (error) {
            res.end();
          }
        }
  
        // call getValues
        getValues(result, i);
      } catch (error) {
        res.end();
      }
    }
  
    getRange();
  });
  

  module.exports = router;
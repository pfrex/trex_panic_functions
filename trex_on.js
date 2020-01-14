"use strict";

const express = require("express");
const router = express.Router();
const redisClient = require("./redis_index");

router.all("/", (req,res) => {
    let agent = req.get("User-Agent");
    if (agent !== "TrexGM") {
      res.end();
    }
  
    // check that the on key exists
    async function onExists() {
      //console.log("KeyUnique has been invoked.");
      try {
        let key = req.body.key;
        // write the data under this unique key
        let result = await redisClient.existsAsync(key);
  
        // the key does not exist so the player has left else the player is on
        if (result === 0) {
          res.end("off");
        } else {
          res.end();
        }
      } catch (error) {
        //console.log("There was an error with the try and catch block.");
        res.end();
      }
    }
  
    // invoke the above function
    onExists();
  });
  
  module.exports = router;
  
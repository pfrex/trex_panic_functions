"use strict";

const express = require("express");
const router = express.Router();
const redisOperation = require("./redis_index");
const randomString = require("crypto-random-string");

router.all("/", (req,res) => {
    async function getUnique() {
      try {
        //console.log("top function firing");
        let currentString = randomString({ length: 10 });
        let result = await redisOperation.sismemberAsync("uniqueSet", currentString);
        //console.log(result);
  
        // the element is unique
        if (result == 0) {
          //console.log("We are unique");
          redisOperation.sadd("uniqueSet", currentString);
          res.end(currentString);
        }
  
        // the element is not unique
        if (result === 1) {
          //console.log("we are not unique");
          getUnique(); // try again
        }
  
        // the operation failed
        if (result === undefined) {
          //console.log("the async operation failed");
          getUnique(); // try again
          //res.end();
        }
      } catch (error) {
        res.end();
      }
    }
  
    // invoke the above function
    getUnique();
  });
  
  module.exports = router;
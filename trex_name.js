"use strict";

const express = require("express");
const router = express.Router();
const redisOperation = require("./redis_index");

router.all("/", (req, res) => {
  let agent = req.get("User-Agent");
  if (agent !== "TrexGM") {
    res.end();
  }

  async function nameUnique() {
    try {
      let name = req.body.name;
      if (name.length > 10) {
        res.end();
      }

      // they turned down the name then decided they actually wanted it.
      let notPicked = req.body.prevName;
      if (name === notPicked) {
        res.end("good"); //the name is already in the set
      }

      let result = await redisOperation.sismemberAsync("memberNames", name);

      // the operation failed
      if (result === undefined) {
        res.end("false");
      }

      // the element is not unique
      if (result === 1) {
        res.end("taken");
      }
      // the element is unique
      else {
        redisOperation.sadd.sadd("memberNames", name);

        if (notPicked !== "noone") {
          //remove not picked from the set?
          redisOperation.srem.srem("memberNames", notPicked);
        }

        res.end("good");
      }
    } catch (error) {
      res.end();
    }
  }

  // invoke the above function
  nameUnique();
});

module.exports = router;

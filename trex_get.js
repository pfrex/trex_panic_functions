"use strict";

const express = require("express");
const router = express.Router();
const redisOperation = require("./redis_index");

router.all("/", (req, res) => {
  let agent = req.get("User-Agent");
  if (agent !== "TrexGM") {
    res.end();
  }

  async function getKey() {
    try {
      let key = req.body.key;
      let result = await redisOperation.getAsync(key);
      res.end(result);
    } catch (error) {
      res.end();
    }
  }

  getKey();
});

module.exports = router;

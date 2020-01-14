"use strict";

const express = require("express");
const router = express.Router();


router.all("/", (req,res) => {
    let agent = req.get("User-Agent");
    if (agent !== "TrexGM") {
      res.end();
    }
  
    // return a utc timestamp as a string
    const myDate = String(Date.now());
  
    res.end(myDate);
  });
  
  module.exports = router;
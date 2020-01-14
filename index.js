"use strict";

const express = require("express");
const app = express();
const port = 3005;
require("./redis_index");
app.use(express.json());

// function endpoints
let trex_get = require("./trex_get");
let trex_set = require("./trex_set");
let trex_name = require("./trex_name");
let trex_board_pull = require("./trex_board_pull");
let trex_board_push = require("./trex_board_push");
let trex_get_del = require("./trex_get_del");
let trex_getid = require("./trex_getid");
let trex_match = require("./trex_match");
let trex_news = require("./trex_news");
let trex_on = require("./trex_on");
let trex_remove = require("./trex_remove");
let trex_set30 = require("./trex_set30");
let trex_time = require("./trex_time");
let trex_verify_email = require("./trex_verify_email");
let trex_write_recovery = require("./trex_write_recovery");

app.use("/trex_get", trex_get);
app.use("/trex_set", trex_set);
app.use("/trex_name", trex_name);
app.use("/trex_board_pull", trex_board_pull);
app.use("/trex_board_push", trex_board_push);
app.use("/trex_get_del", trex_get_del);
app.use("/trex_getid", trex_getid);
app.use("/trex_match", trex_match);
app.use("/trex_news", trex_news);
app.use("/trex_on", trex_on);
app.use("/trex_remove", trex_remove);
app.use("/trex_set30", trex_set30);
app.use("/trex_time", trex_time);
app.use("/trex_verify_email", trex_verify_email);
app.use("/trex_write_recovery", trex_write_recovery);

app.listen(port, () => console.log(`listening on port ${port}`));

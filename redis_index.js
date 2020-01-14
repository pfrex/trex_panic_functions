"use strict";

const redis = require("redis");
const { promisify } = require("util");
const redisClient = redis.createClient();
redisClient.on("error", err => {
  res.end(err);
  // test that the error handler ends the request by setting the redisClient to 0!
});

console.log("The redis connection and stuff has been inited.");

module.exports.set = redisClient;
module.exports.srem = redisClient;
module.exports.sadd = redisClient;
module.exports.zadd = redisClient;
module.exports.del = redisClient;

module.exports.getAsync = promisify(redisClient.get).bind(redisClient);
module.exports.sismemberAsync = promisify(redisClient.sismember).bind(
  redisClient
);
module.exports.zrevrangeAsync = promisify(redisClient.zrevrange).bind(
  redisClient
);
module.exports.spopAsync = promisify(redisClient.spop).bind(redisClient);
module.exports.existsAsync = promisify(redisClient.EXISTS).bind(redisClient);

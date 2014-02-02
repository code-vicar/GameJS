var GameLoop = require("./server/GameLoop.coffee");
var GameServer = require("./server/GameServer.coffee");
var RenderLoop = require("./client/RenderLoop.coffee");

module.exports.server = {
  GameServer: GameServer,
  GameLoop: GameLoop
};

module.exports.client = {
  RenderLoop: RenderLoop
};
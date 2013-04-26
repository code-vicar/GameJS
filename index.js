var GameLoop = require("./server/GameLoop.coffee");
var GameServer = require("./server/GameServer.coffee");
var RenderLoop = require("./client/RenderLoop.coffee");

module.exports.server = {}
module.exports.server.GameServer = GameServer;
module.exports.server.GameLoop = GameLoop;
module.exports.client = {}
module.exports.client.RenderLoop = RenderLoop;
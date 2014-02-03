var GameLoop = require('./src/GameLoop.js');
var GameServer = require('./src/GameServer.js');
//var RenderLoop = require('./client/RenderLoop.js');

module.exports.server = {
  GameServer: GameServer,
  GameLoop: GameLoop
};
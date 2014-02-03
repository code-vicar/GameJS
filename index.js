var GameLoop = require('./server/GameLoop.js');
var GameServer = require('./server/GameServer.js');
//var RenderLoop = require('./client/RenderLoop.js');

module.exports.server = {
  GameServer: GameServer,
  GameLoop: GameLoop
};
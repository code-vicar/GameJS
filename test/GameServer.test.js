var SGS = require('../index.js');

var sv = new SGS.server.GameServer();

var TestEntity = function(name) {
  this.name = name;
};

TestEntity.prototype.update = function(GameTick) {
  console.log(this.name + ': ' + GameTick.now.toString(10));
};

sv.AddEntity(new TestEntity('Scott'));
sv.AddEntity(new TestEntity('Nicole'));
sv.Loop.Run();

setTimeout(function() {
  sv.Loop.Stop();
}, 3000);
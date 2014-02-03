var GameLoop = require('./GameLoop.js');
var EE = require('events').EventEmitter;
var util = require('util');

var GameServer = function () {
  //call event emitter constructor with 'GameServer' context
  EE.call(this);

  var self = this;
	this.Entities = [];

	this.OnTick = function(tick) {

		// loop over entities and let them know a tick occurred
    var i;
		for (i = 0; i < self.Entities.length; i++) {
      var ent = self.Entities[i];
			// if the entity has an update function, then call that with the tick data
			if (ent.update) {
        ent.update(tick);
      }
    }
  }

	this.Loop = new GameLoop();

  this.Loop.on('tick', self.OnTick);

	this.AddEntity = function(Entity) {
		self.Entities.push(Entity);
  };

	this.RemoveEntity = function(Entity) {
		var idx = self.Entities.indexOf(Entity);
		if (idx >= 0) {
			self.Entities.splice(idx, 1);
    }
  };
};

util.inherits(GameServer, EE);

module.exports = GameServer;

GameLoop = require './GameLoop.coffee'
EE = require('events').EventEmitter

class GameServer extends EE
	constructor: ->
		@Entities = []
		@OnTick = (tick) =>
			#loop over entities and let them know a tick occurred
			for ent in @Entities
				#if the entity has an update function, then call that with the tick data
				if (ent.update) then ent.update tick

		@Loop.on('tick', @OnTick)

	Loop: new GameLoop()

	AddEntity: (Entity) ->
		@Entities.push(Entity)

	RemoveEntity: (Entity) ->
		idx = @Entities.indexOf Entity
		if idx >= 0
			@Entities.splice idx,1

module.exports = GameServer
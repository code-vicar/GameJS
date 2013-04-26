SGS = require("../index.js")

sv = new SGS.server.GameServer()

class TestEntity
	constructor: (name) ->
		@name = name
	update: (GameTick) ->
		console.log @name + ": " + GameTick.now.toString(10)

sv.AddEntity new TestEntity("Scott")
sv.AddEntity new TestEntity("Nicole")
sv.Loop.Run()

setTimeout ->
	sv.Loop.Stop()
,3000
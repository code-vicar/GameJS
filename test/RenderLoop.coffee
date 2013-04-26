SGS = require("../index.js")

GL = new SGS.server.GameLoop()
RL = new SGS.client.RenderLoop(GL)

tickCount = 0
timeStart = 0

RL.on "run", () ->
	timeStart = Date.now()

RL.on "stop", () ->
	console.log "~FPS: #{(tickCount / (Date.now() - timeStart))*1000}"

RL.on "tick", (interp) ->
	tickCount++
	if tickCount % 10 is 0
		console.log interp

	if tickCount is 100
		RL.Stop()
		GL.Stop()

GL.Run()
RL.Run()
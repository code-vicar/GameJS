require("coffee-script");
Loop = require("../lib/loop");

tickCount = 0
seconds = 0

#console.log(testLoop);

GL = new Loop();

GL.on 'tick', (d) ->
	#d, time difference in milliseconds between ticks
	tickCount++
	if tickCount is 25
		console.log "#{++seconds} seconds"
		tickCount = 0

	if seconds is 5
		GL.Stop()

GL.on 'run', ->
	console.log 'run'
GL.on 'pause', ->
	console.log 'pause'
GL.on 'unpause', ->
	console.log 'unpause'
GL.on 'stop', ->
	console.log 'stop'

GL.Run()

setTimeout ->
	GL.Pause()
	setTimeout ->
		GL.Run()
	, 1000
, 2000
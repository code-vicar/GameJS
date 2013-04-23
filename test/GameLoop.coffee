SGS = require("../index.js")

tickCount = 0
seconds = 0

GL = new SGS.GameLoop();

GL.on 'tick', (d) ->
  #d, time difference in milliseconds between ticks
  tickCount++
  if tickCount is 25 #default is 25 ticks per second...
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
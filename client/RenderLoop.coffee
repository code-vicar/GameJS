normalizeOnEachFrame = ->
  #default fps will be 60
  onEachFrame = (cb) ->
    _cb = ->
      if (cb())
        setTimeout _cb, 1000 / 60
    _cb()

  if window.webkitRequestAnimationFrame
    onEachFrame = (cb) ->
      _cb = ->
        if (cb())
          webkitRequestAnimationFrame _cb
      _cb()
  else if window.mozRequestAnimationFrame
    onEachFrame = (cb) ->
      _cb = ->
        if (cb())
          mozRequestAnimationFrame _cb
      _cb()
  else if window.requestAnimationFrame
    onEachFrame = (cb) ->
      _cb = ->
        if (cb())
          requestAnimationFrame _cb
      _cb()
  else if window.msRequestAnimationFrame
    onEachFrame = (cb) ->
      _cb = ->
        if (cb())
          msRequestAnimationFrame _cb
      _cb()

  window.onEachFrame = onEachFrame

EE = require('events').EventEmitter

class RenderLoop extends EE
  constructor: (GameLoopEmitter) ->
    #create the onEachFrame function, normalizing browser inconsistency
    normalizeOnEachFrame()
    #private
    @LastGameLoopTick = null
    @IsRunning = false
    @IsPaused = false

    @OnGameLogicTick = (tick) =>
      @LastGameLoopTick = tick

    @Tick = =>
      #check if we stopped the render loop, if so return false
      unless @IsRunning then return false

      #calculate the interpolation value
      Interpolation = 0
      if @LastGameLoopTick
        tDiff = @LastGameLoopTick.next - Date.now()
        if tDiff > 0
          Interpolation = tDiff / @LastGameLoopTick.interval

      #execute on each 'tick' of loop unless the game is paused
      unless @IsPaused then @emit 'tick', Interpolation

      #return true to let the animationFrame know to keep running
      return true

    @GLE = GameLoopEmitter

  #Run the game loop
  Run: ->
    if not @IsRunning
      #start listening to the game loop again
      @GLE.on "tick", @OnGameLogicTick
      #if the loop is stopped, then start a new one
      @IsRunning = true
      window.onEachFrame @Tick
      @emit 'run'
    if @IsPaused
      #else if the loop is running, but paused, unpause it.
      @IsPaused = false
      @emit 'unpause'

  #Stop the game loop
  Stop: ->
    if @IsRunning
      #remove game loop listener
      @GLE.removeListener "tick", @OnGameLogicTick
      @LastGameLoopTick = null
      #set is running to false
      @IsRunning = false
      @emit 'stop'

  Pause: ->
    unless @IsPaused
      @IsPaused = true
      @emit 'pause'

module.exports = RenderLoop
EE = require('events').EventEmitter

#Check the settings for the number of times per second the game
#  should fire an update tick
TICKS_PER_SECOND = 25

#Divide 1 second (1000ms) by the 'ticks per second' to get the timer interval
INTERVAL = 1000 / TICKS_PER_SECOND

class GameLoop extends EE
	constructor: ->
		#private
		@Tick = =>
			#execute on each 'tick' of loop unless the game is paused
			unless @IsPaused
				dNow = Date.now()
				@emit 'tick',
					"now": dNow
					"next": (dNow+INTERVAL)
					"interval": INTERVAL

		@IntervalID = 0
		@IsRunning = false
		@IsPaused = false

	#Run the game loop
	Run: ->
		if not @IsRunning
			#if the loop is stopped, then start a new one
			@Tick()
			@IntervalID = setInterval @Tick, INTERVAL
			@IsRunning = true
			@emit 'run'
		else if @IsPaused
			#else if the loop is running, but paused, unpause it.
			@IsPaused = false
			@emit 'unpause'

	#Stop the game loop
	Stop: ->
		unless @IntervalID is 0
			clearInterval @IntervalID
			@emit 'stop'

	Pause: ->
		unless @IsPaused
			@IsPaused = true
			@emit 'pause'

module.exports = GameLoop;
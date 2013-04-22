EE = require('events').EventEmitter
#By default the game state will try to update itself 25 times per second
UPDATES_PER_SECOND = 25

#that means that each update has about 40 milliseconds of time to work with
UPDATE_TIME_WINDOW = 1000 / UPDATES_PER_SECOND

class Loop extends EE
	constructor: ->
		#private
		@Tick = =>
			#execute on each 'tick' of loop unless the game is paused
			unless @IsPaused
				@emit 'tick', UPDATE_TIME_WINDOW

		@IntervalID = 0
		@IsRunning = false
		@IsPaused = false

	#Run the game loop
	Run: ->
		if not @IsRunning
			#if the loop is stopped, then start a new one
			@IntervalID = setInterval @Tick, UPDATE_TIME_WINDOW
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
	
module.exports = Loop;
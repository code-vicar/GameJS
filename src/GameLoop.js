var EE = require('events').EventEmitter;
var util = require('util');

//  Check the settings for the number of times per second the game
//    should fire an update tick
var TICKS_PER_SECOND = 25;

//  Divide 1 second (1000ms) by the 'ticks per second' to get the timer interval
var INTERVAL = 1000 / TICKS_PER_SECOND;

var GameLoop = function() {
  EE.call(this);

	this.IntervalID = 0;
	this.IsRunning = false;
	this.IsPaused = false;
};

util.inherits(GameLoop, EE);

GameLoop.prototype.Tick = function() {
  //  execute on each 'tick' of loop unless the game is paused
  if (!this.IsPaused) {
    debugger;
    var dNow = Date.now();
    this.emit('tick', {
      now: dNow,
      next: (dNow+INTERVAL),
      interval: INTERVAL
    });
  }
};

//  Run the game loop
GameLoop.prototype.Run = function() {
	if (!this.IsRunning) {
      //  if the loop is stopped, then start a new one
      var self = this;
      this.Tick();
      this.IntervalID = setInterval(function(){ self.Tick(); }, INTERVAL);
      this.IsRunning = true;
      this.emit('run');
  } else if (this.IsPaused) {
		//  else if the loop is running, but paused, unpause it.
		this.IsPaused = false;
		this.emit('unpause');
  }
};

//  Stop the game loop
GameLoop.prototype.Stop = function() {
	if (this.IntervalID !== 0) {
		clearInterval(this.IntervalID);
		this.emit('stop');
  }
};

GameLoop.prototype.Pause = function() {
	if (!this.IsPaused) {
		this.IsPaused = true;
		this.emit('pause');
  }
};

module.exports = GameLoop;
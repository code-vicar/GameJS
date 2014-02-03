(function() {
  'use strict';

  var normalizeOnEachFrame = function() {
    //  default fps will be 60
    var onEachFrame = function(cb) {
      _cb = function() {
        if (cb()) {
          setTimeout(_cb, (1000 / 60));
        }
      };
      _cb();
    };

    if (window.webkitRequestAnimationFrame) {
      onEachFrame = function(cb) {
        _cb = function() {
          if (cb()) {
            webkitRequestAnimationFrame(_cb);
          }
        };
        _cb();
      };
    } else if (window.mozRequestAnimationFrame) {
      onEachFrame = function(cb) {
        _cb = function() {
          if (cb()) {
            mozRequestAnimationFrame(_cb);
          }
        };
        _cb();
      };
    } else if (window.requestAnimationFrame) {
      onEachFrame = function(cb) {
        _cb = function() {
          if (cb()) {
            requestAnimationFrame(_cb);
          }
        };
        _cb();
      }
    } else if (window.msRequestAnimationFrame) {
      onEachFrame = function(cb) {
        _cb = function {
          if (cb()) {
            msRequestAnimationFrame(_cb);
          }
        };
        _cb();
      }
    }

    return onEachFrame;
  };

  angular.module('RenderLoop', [])
  .provider('RenderLoop', function() {
    
    this.$get = ['$rootScope', function($rootScope) {
      //  create the onEachFrame function, normalizing browser inconsistency
      var onEachFrame = normalizeOnEachFrame();

      var RenderLoop = function(GameLoopEmitter) {
        //  private
        this.LastGameLoopTick = null;
        this.IsRunning = false;
        this.IsPaused = false;
        this.GLE = GameLoopEmitter;
      };
      
      RenderLoop.prototype.OnGameLogicTick = function(tick) {
        this.LastGameLoopTick = tick;
      };

      RenderLoop.prototype.Tick = function() {
        //  check if we stopped the render loop, if so return false
        if (!this.IsRunning) {
          return false;
        }

        //  calculate the interpolation value
        var Interpolation = 0;
        if (this.LastGameLoopTick) {
          var tDiff = (this.LastGameLoopTick.next - Date.now());
          if (tDiff > 0) {
            Interpolation = (tDiff / this.LastGameLoopTick.interval);
          }
        }
        //  execute on each 'tick' of loop unless the game is paused
        if (!this.IsPaused) {
          $rootScope.emit('tick', Interpolation);
        }

        //  return true to let the animationFrame know to keep running
        return true;
      };

      //  Run the game loop
      RenderLoop.prototype.Run = function() {
        if (!this.IsRunning) {
          var self = this;
          //  start listening to the game loop again
          this.GLE.on('tick', this.OnGameLogicTick);
          //  if the loop is stopped, then start a new one
          this.IsRunning = true;

          onEachFrame(function(){ self.Tick(); });
          $rootScope.emit('run');
        }

        if (this.IsPaused) {
          //  else if the loop is running, but paused, unpause it.
          this.IsPaused = false;
          $rootScope.emit('unpause');
        }
      };

      //  Stop the game loop
      RenderLoop.prototype.Stop = function() {
        if (this.IsRunning) {
          //  remove game loop listener
          this.GLE.removeListener('tick', this.OnGameLogicTick);
          this.LastGameLoopTick = null;
          //  set is running to false
          this.IsRunning = false;
          $rootScope.emit('stop');
        }
      };


      RenderLoop.prototype.Pause = function() {
        if (!IsPaused) {
          this.IsPaused = true;
          $rootScope.emit('pause');
        }
      };
      
      return RenderLoop;
    }];

  });

}());

var SGS = require('../index.js');

var tickCount = 0;
var seconds = 0;

var GL = new SGS.server.GameLoop();

GL.on('tick', function (delta) {
  // d, time difference in milliseconds between ticks
  tickCount++;
  if (tickCount === 25) { // default is 25 ticks per second...
    console.log((++seconds) + ' seconds');
    tickCount = 0
  }

  if (seconds === 5) {
    GL.Stop();
  }
});

GL.on('run', function() {
  console.log('run');
});

GL.on('pause', function() {
  console.log('pause');
});

GL.on('unpause', function() {
  console.log('unpause');
});
  
GL.on('stop', function() {
  console.log('stop');
});

// run the gameloop
GL.Run();
// in 2 seconds, pause the loop
setTimeout(function() {
  GL.Pause();
  // in 1 second, stop the loop
  setTimeout(function() {
    GL.Run();
  }, 1000);
}, 2000);

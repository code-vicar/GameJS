//  need to use angular to test the client side of the framework

// var SGS = require('../index.js');

// var GL = new SGS.server.GameLoop();
// var RL = new SGS.client.RenderLoop(GL);

// var tickCount = 0;
// var timeStart = 0;

// RL.on('run', function() {
//   timeStart = Date.now();
// });

// RL.on('stop', function() {
//   console.log('~FPS: ' + ((tickCount / (Date.now() - timeStart)) * 1000));
// });

// RL.on('tick', function (interp) {
//   tickCount++;
//   if (tickCount % 10 === 0) {
//     console.log(interp);
//   }

//   if (tickCount === 100) {
//     RL.Stop();
//     GL.Stop();
//   }
// });

// GL.Run();
// RL.Run();
# GameJS (A Javascript game framework)
This is a game framework built in JavaScript, designed for use in a server-client architecture, where the expected server is node.

Communication between the browser and the server components will be done through an evented system, allowing either the objects themselves to communicate with each other (client on top of server mode) or the use of socket.io (true server - client mode) to pass realtime messages over the network.

It uses CommonJS style modules.  Compatible with browserify.

Currently in alpha development.

Completed:

* Game and Render loops

Up Next:

* User input management

---
GameLoop:

* Requires

		events

* Runs on

		Server or Client
	
RenderLoop:

* Requires

		events
		requestAnimationFrame

* Runs on

		Client

---
LICENSE

GNU General Public License (see license text included in project)
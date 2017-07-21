var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({
	port: 9292
});

wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		var obj = JSON.parse(message);
		console.log('Received a message at: %s', obj.time);
		console.log('Content: ');
		console.dir(message);
		console.log('=====================================');
		ws.send(message);
	});
});

console.log('webSocket is running...');
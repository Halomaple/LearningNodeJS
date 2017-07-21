(function() {
	'use strict';
	angular.module('chatWebSocket').service('ChatService', ['$websocket', ChatService]);

	function ChatService($websocket) {
		var dataStream = $websocket('ws://localhost:9292');

		var collection = [];

		dataStream.onMessage(function(message) {
			collection.push(angular.fromJson(message.data));
		});

		return {
			collection: collection,
			send: function(messageObj) {
				dataStream.send(angular.toJson(messageObj));
			}
		};
	}
})();
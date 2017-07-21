(function() {
	'use strict';

	angular.module('chatWebSocket').controller('ChatWebSocketController', ['$scope', 'ChatService', ChatWebSocketController]);

	function ChatWebSocketController($scope, chatService) {
		var vm = this;

		vm.message = {
			message: '', 
			time: ''
		};

		$scope.$watch(function() {
			return chatService.collection.length
		}, function(newValue) {
			if (newValue) {
				vm.message = chatService.collection[newValue - 1];
			}
		})

		vm.init = function() {
			chatService.send({
				message: 'Hello!',
				time: Date.now()
			});
		};

		vm.init();
	}
})();
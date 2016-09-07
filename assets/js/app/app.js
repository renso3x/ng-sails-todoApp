'use strict';

var todo = angular
	.module('todoApp', [
		'ui.router',
		'ui.bootstrap'
	])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('/', {
				url: '/',
				templateUrl: 'templates/todo.html',
				controller: 'TodoCtrl'
			});

		$urlRouterProvider.otherwise('/');
	});

	todo.controller('TodoCtrl', 
		['$scope', '$rootScope', 'TodoService', 
			function($scope, $rootScope, TodoService) {
				$scope.formData = {};
				$scope.todos = [];

				TodoService.getTodos().then(function(resp) {
					$scope.todos = resp.data;
				});

				$scope.addTodo = function() {
					TodoService.addTodo($scope.formData).then(function(resp) {
						$scope.todos.push($scope.formData);
						$scope.formData = {};
					});
				}

				$scope.removeTodo = function(todo) {
					TodoService.removeTodoVal(todo).then(function(response) {
			      		$scope.todos.splice($scope.todos.indexOf(todo), 1);
				    });
				}
			}
		]
	);

	todo.service('TodoService', function($http, $q) {
		return {
			'getTodos': function() {
				var defer = $q.defer();

				$http.get('/todo/getTodos').then(function(resp) {
					defer.resolve(resp);
				}, function(err) {
					defer.reject(err);
				});

				return defer.promise;
			},
			'addTodo': function(todo) {
				var defer = $q.defer();

				$http.post('/todo/addTodo', todo).then(function(resp) {
					defer.resolve(resp);
				}, function(err) {
					defer.reject(err);
				});

				return defer.promise;
			},
			'removeTodoVal': function(todo) {
				var defer = $q.defer();

				$http.post('todo/removeTodo', todo).then(function(resp) {
					defer.resolve(resp);
				}, function(err) {
					defer.reject(err);
				});

				return defer.promise;
			}
		};
	});
var myApp = angular.module('myApp', ['ngRoute','firebase'])
.constant('FIREBASE_URL', 'https://myangularapp-86f5e.firebaseio.com/');

myApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/home',{
		templateUrl: 'views/home.html',
      	//controller: 'RegistrationController'
	})
	.when('/login',{
		templateUrl: 'views/login.html',
      	//controller: 'RegistrationController'
	})
	.when('/register',{
		templateUrl: 'views/register.html',
      	//controller: 'RegistrationController'
	})
	.when('/success',{
		templateUrl: 'views/success.html',
      	controller: 'SuccessController'
	})
	.when('/inbox',{
		templateUrl: 'views/inbox.html',
      	controller: 'InboxController'
	})
	.when('/signUp',{
		templateUrl: 'views/createUser.html',
      	controller: 'CreateUserController'
	})
	.otherwise({
		redirectTo: '/login'
	})
}])

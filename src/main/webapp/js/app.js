var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {

 /**to remove hash in the URL**/
//  $locationProvider.html5Mode({
//    enabled : true,
//    requireBase : false
//  });

	$routeProvider
	.when('/home',{
		templateUrl: 'views/home.html',
      	controller: 'DashboardController'
	})
	.when('/login',{
		templateUrl: 'views/login.html',
      	controller: 'LoginController'
	})
	.when('/success',{
		templateUrl: 'views/success.html',
      	controller: 'SuccessController'
	})
	.when('/inbox',{
		templateUrl: 'views/inbox.html',
      	controller: 'InboxController'
	})
	.when('/signup',{
		templateUrl: 'views/signup.html',
      	controller: 'SignupController'
	})
	.when('/friends',{
		templateUrl: 'views/friends.html',
      	controller: 'FriendsController'
	})
	.when('/profile/:name',{
		templateUrl: 'views/profile.html',
      	controller: 'ProfileController'
	})
	.when('/signout', {
		templateUrl: 'views/signout.html',
		controller: 'SignoutController'
	})
	.otherwise({
		redirectTo: '/login'
	})
}]);


myApp.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});


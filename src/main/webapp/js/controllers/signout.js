myApp.controller("SignoutController", function($rootScope, $http, $location, $scope, $window) {
	console.log("signout called");
	console.log("User "+$rootScope.loggedInUser+" logged out !!");
	
	delete $rootScope.loggedInUser;
	$window.localStorage.clear();
		
//	$window.localStorage.currentUser = "";
	$window.location.assign('./#/login');


});
myApp.controller("LoginController", function($rootScope, $http, $location, $scope, $window) {

	console.log("ooutside f");
	$scope.message;
	//$rootScope.loggedInUser;
	$scope.form = {  
			username : "",
			password: ""
	};
	
	
	//making a n/w call
	$scope.login = function() {
		delete $rootScope.loggedInUser;
		var method = "POST";
		var url = constants.baseURL+"/rest/isValidUser";
		console.log(angular.toJson($scope.form));
		$http({  
			method : method,  
			url : url,  
			data : angular.toJson($scope.form),  
			headers : {  
				'Content-Type' : 'application/json'
			}
		}).then( _success, _error);  
	}
	function _success(response) {
		console.log("success login"); 
//		$rootScope.loggedInUser = response.data.userName; // assigning the response data to be the current user
		$rootScope.loggedInUser = angular.toJson(response.data);
		$window.location.assign('./#/home');
//		$window.localStorage.currentUser = response.data.userName;
		$window.localStorage.currentUser = angular.toJson(response.data);
	}
	function _error(response){
		console.log(response.data.Message); // incorrect credentials
		$window.location.assign('./#/login');
	}

});
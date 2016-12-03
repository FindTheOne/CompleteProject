myApp.controller("SignupController", function($scope, $http, $window) {

	$scope.message;
	$scope.form = {  
			username : "",
			password: "",
			emailID : "",
			interests : "",
			skills : "",
			friends: ""
	};

	$scope.submitDetails = function() {
		var method = "POST";
		var url = constants.baseURL+"/rest/create/user";
		console.log(angular.toJson($scope.form));
		$http({  
			method : method,  
			url : url,  
			data : angular.toJson($scope.form),  
			headers : {  
				'Content-Type' : 'application/json'
			}  
		}).then( _success);  
	}
	function _success(response) {  
		console.log(response);
		$scope.message = response;
	}  
	});


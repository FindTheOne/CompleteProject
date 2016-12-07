myApp.controller("SignupController", function($scope, $http, $window) {

	var vm = this;
	vm.isReg = false;
	vm.user = {};
	vm.user.friends = "";
	vm.user.skills = "";
	vm.user.interests = "";

	vm.submitDetails = function() {
		console.log("registering user : "+angular.toJson(vm.user));

		var method = "POST";
		var url = constants.baseURL+"/rest/create/user";

		$http({  
			method : method,  
			url : url,  
			data : angular.toJson(vm.user),
//			data: vm.user,
			headers : {  
				'Content-Type' : 'application/json'
			}  
		}).then( _success);  
	}

	function _success(response) {		
		
		vm.isReg = true;
		vm.message = response.data.Message;
		console.log("response message: "+ response.data.Message);
	} 


});


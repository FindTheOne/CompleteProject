myApp.controller("SignupController", function($scope, $http, $window, $routeParams, $location, $rootScope,cloudinary, Upload) {

	var vm = this;
	vm.isReg = false;
	vm.user = {};
	vm.user.friends = "";
	vm.user.skills = "";
	vm.user.interests = "";
	vm.user.photoURL = "";

	vm.submitDetails = function() {
		console.log("registering user : "+angular.toJson(vm.user));

		var method = "POST";
		var url = constants.baseURL+"/rest/create/user";

		$http({  
			method : method,  
			url : url,  
			data : angular.toJson(vm.user),
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

	
	$scope.uploadFiles = function(files){
		var d = new Date();
		var imageSalt = d.getDate() +""+  d.getHours() +""+ d.getMinutes() + "" + d.getSeconds();
		
		angular.forEach(files, function(file){
			if (file && !file.$error) {
				file.upload = Upload.upload({
					url: "https://api.cloudinary.com/v1_1/" + constants.cloud_name + "/upload",
					data: {
						public_id: vm.user.username+imageSalt, // adding timestamp
						upload_preset: constants.upload_preset,
						file: file
					}
				}).progress(function (e) {
					file.progress = Math.round((e.loaded * 100.0) / e.total);
					file.status = "Uploading... " + file.progress + "%";
				}).success(function (data, status, headers, config) {
					$scope.message = file.name;
					vm.user.photoURL = "/v"+data.version+"/"+data.public_id+"."+data.format;
					console.log(data);
				}).error(function (data, status, headers, config) {
					$scope.message = "Error in selecting image.";
					console.log(data);
				});
			}
		});
	};


});

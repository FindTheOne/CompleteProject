    myApp.controller("CreateUserController", function($scope, $http, $window) {
    	$scope.username = "";
    	$scope.password = "";
    	$scope.message;
    	$scope.form = {  
                username : "", 
                emailID : "",
                password : "",
                interests : "",
                skills : "",
                friends: ""
        };
    	$scope.submitDetails = function() {
    		var method = "POST";
    		
            var url =  constant.baseURL+"/rest/create/user";
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
        }
    });
    
    
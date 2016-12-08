myApp.controller("FriendsController", function($scope, $http, $window, $rootScope) {

	var fc = this;
	fc.currentUser = $window.localStorage.currentUser;

	if(!fc.currentUser){
		$location.path('./#/login');
	}else{
		$rootScope.loggedInUser = fc.currentUser;
		var username = $rootScope.loggedInUser.userName;

		var method = "GET";
		var url = constants.baseURL+"/rest/user/"+username+"/friends";

		console.log(url);
		
		$scope.friends;
		$scope.friendsDetail =[];
		$http({
			method : method,  
			url : url
		}).then(function success(response){
			console.log('first '+response.data.friends);
			$scope.friends = response.data.friends;
			for(var i=0; i< $scope.friends.length ; i++ ) {
				var url = constants.baseURL+"/rest/user/"+$scope.friends[i];

				console.log(url);
				$http({  
					method : method,  
					url : url
				}).then(function success(response){
					$scope.friendsDetail.push(response.data.Result);
				});

			}


		}, function error(response){
			console.log('error');	
		});


	}

});
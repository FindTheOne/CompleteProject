myApp.controller("ProfileController", function($scope, $http, $window, $routeParams, $rootScope) {


	var pc = this;
	pc.currentUser = $window.localStorage.currentUser;

	if(!pc.currentUser){
		$location.path('./#/login');
	}else{
		$rootScope.loggedInUser=pc.currentUser;
		$scope.baseURLImages = constants.baseURLImages; 
		$scope.defaultImageURL = constants.defaultImageURL;
		console.log($rootScope.loggedInUser);
		var name = $routeParams.name;

//		$scope.userImage = "http://saumeel.com/295Project/ProfileImages/"+name+".jpg";

	}

	$scope.getProfileDetails = function(){
		var method = "GET";
		var url = constants.baseURL+"/rest/user/"+name;

		$http({  
			method : method,  
			url : url
		}).then(function success(response){
			$scope.user = response.data.Result;
			var friendsOfUser = response.data.Result.friends;
			var friendsLength = friendsOfUser.length;
			$scope.friends = [];
			if(friendsLength>0){
				for(var i=0;i<friendsLength;i++){
					$http({
						method : method,  
						url : constants.baseURL+"/rest/user/"+friendsOfUser[i]
					
					}).then(function success(innerResponse){
						$scope.friends.push(innerResponse.data.Result);
					}, function error(innerResponse){
						console.log("Error retrieving photoURL of friend");
					});
				}
			}
//			console.log($scope.user.userName);
//			$scope.emailid = response.data.Result.emailID;
//			$scope.interests = response.data.Result.interests;
//			$scope.skills = response.data.Result.skills;
//			$scope.friends = response.data.Result.friends;
		}, function error(response){
			console.log('error');	
		});
	}
});
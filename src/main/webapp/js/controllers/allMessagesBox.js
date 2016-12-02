myApp.controller("InboxController", function($rootScope, $scope, $http, $window, $location) {

	console.log("inbox js");
	var ai = this;
	ai.currentUser = $window.localStorage.currentUser;

	if(!ai.currentUser){
		console.log("if");
		$location.path('/#/login');
	}else{
		
		$rootScope.loggedInUser = ic.currentUser;
		console.log($rootScope.loggedInUser);

		$scope.username = "";
		$scope.password = "";
		$scope.message;
		console.log("in controller");
		$scope.user1 = $rootScope.loggedInUser;
		$scope.user2 = "pavan";


		var method = "GET";
//		var url = baseURL+"/findtheone/rest/getInbox/saumeel/pavan";
		var url = constants.baseURL+"/rest/getInbox/"+$scope.user1+"/"+$scope.user2;

		$http({
			method : method,  
			url : url
		}).then(function success(response){
			console.log(response.data);
			$scope.message = response.data;
		}, function error(response){
			console.log('error');	
		}); 

		
	}
	
});
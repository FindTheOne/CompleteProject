myApp.controller("InboxController", function($rootScope, $scope, $http, $window, $location) {

	console.log("inbox js");
	var ic = this;
	ic.currentUser = $window.localStorage.currentUser;



	$scope.sendMessage = function(){
		var newMessage = {};
		newMessage.to = $scope.user2;
		newMessage.text = $scope.inputText;
		newMessage.from = $scope.user1;

		$scope.message.push(newMessage);

		console.log("send message :"+$scope.inputText+"end");

		var method = "POST";
		var url = constants.baseURL+"/rest/create/conversation";

		$http({
			method : method,  
			url : url,
			data : angular.toJson(newMessage),  
			headers : {  
				'Content-Type' : 'application/json'
			}
		}).then(function success(response){
			console.log(response.data);
		}, function error(response){
			console.log('error');	
		}); 
		$scope.inputText = "";
	}


	$scope.getConversation = function(str){
		$scope.selectedTalker = str;
		$scope.user1 = $rootScope.loggedInUser;
		$scope.user2 = str;
		$scope.message = [];
		var method = "GET";
		var url = constants.baseURL+"/rest/getInbox/"+$scope.user1+"/"+str;

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

//	$scope.getConversation = function(str){
//	$scope.user1 = $rootScope.loggedInUser;
//	$scope.user2 = str;
//	$scope.message = [];
//	var method = "GET";
//	var url = constants.baseURL+"/rest/getInbox/"+$scope.user1+"/"+str;

//	$http({
//	method : method,  
//	url : url
//	}).then(function success(response){
//	console.log(response.data);
//	$scope.message = response.data;
//	}, function error(response){
//	console.log('error');	
//	}); 
//	}

	var getTalkers = function(){
		var method = "GET";
		var url = constants.baseURL+"/rest/getUsersWithWhomHadConversation/"+$rootScope.loggedInUser;

		$http({
			method : method,  
			url : url
		}).then(function success(response){
			console.log(response.data.result);
			$scope.talkers = response.data.result;
			if($scope.talkers.length > 0){
				$scope.selectedTalker = $scope.talkers[0];
				$scope.getConversation($scope.selectedTalker);
			}
		}, function error(response){
			console.log('error');	
		}); 
	}
	
	if(!ic.currentUser){
		console.log("if");
		$location.path('/#/login');
	}else{
		$rootScope.loggedInUser = ic.currentUser;
		console.log($rootScope.loggedInUser);
		$scope.baseURLImages = constants.baseURLImages;
		$scope.username = "";
		$scope.password = "";

		$scope.talkers = [];
		getTalkers();
		console.log($scope.talkers);
		
		//call to get talkers
//		$scope.talkers = ["saumeel", "pavan", "john"];
		

	}


});
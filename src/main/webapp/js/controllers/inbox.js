myApp.controller("InboxController", function($rootScope, $scope, $http, $window, $location) {

	console.log("inbox js");
	var ic = this;

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
		$scope.user1 = $rootScope.loggedInUser.userName;
		$scope.user2 = str;
		$scope.message = [];
		var method = "GET";
		var url = constants.baseURL+"/rest/getInbox/"+$scope.user1+"/"+str;
		$scope.gotMessage = false;
		console.log("in conversation")

		$http({
			method : method,  
			url : url
		}).then(function success(response){
			console.log(response.data);
			$scope.message = response.data;
			$scope.gotMessage = true;
		}, function error(response){
			console.log('error');	
		}); 
	}


	var getTalkers = function(){
		var method = "GET";
		var url = constants.baseURL+"/rest/getUsersWithWhomHadConversation/"+$rootScope.loggedInUser.userName;
		$http({
			method : method,  
			url : url
		}).then(function success(response){
			console.log(response.data.result);
			$scope.talkers = response.data.result;
			$scope.showPage = true;
			if($scope.talkers.length > 0){
				$scope.selectedTalker = $scope.talkers[0];
				$scope.getConversation($scope.selectedTalker);
			}
		}, function error(response){
			console.log('error');	
		}); 
	}

	$scope.movies = [];
	// gives another movie array on change
	$scope.updateMovies = function(typed){
		if($scope.movies.indexOf(typed) == -1){
			if($scope.yourchoice != ""){
				$http({
					method : "GET",  
					url : constants.baseURL+"/rest/getUsersForSearch/"+typed
				}).then(function success(response){
					console.log(response.data);
					$scope.movies = response.data.result;
				}, function error(response){
					console.log('error');	
				});	
			}
		}else{
			console.log('here...');
			if($scope.talkers.indexOf(typed) == -1){
				$scope.talkers.push(typed);
			}
			$scope.getConversation(typed);
			$scope.selectedTalker = typed;
			$scope.yourchoice = "";
		}
	}

	ic.currentUser = $window.localStorage.currentUser;
	if(!ic.currentUser){
		console.log("if");
		$location.path('./#/login');
	}else{

		ic.currentUser = angular.fromJson($window.localStorage.currentUser);
		console.log("else...");
		$rootScope.loggedInUser = ic.currentUser;
		console.log($rootScope.loggedInUser);
		$scope.baseURLImages = constants.baseURLImages;

		$scope.talkers = [];
		getTalkers();
		console.log($scope.talkers);
	}
});
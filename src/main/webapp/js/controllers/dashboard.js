myApp.controller("DashboardController", function($scope, $http, $window, $location, $rootScope) {

	//if (typeof $rootScope.loggedInUser === 'undefined'){

	$scope.baseURLImages = constants.baseURLImages;

	var dc = this;
	dc.currentUser = $window.localStorage.currentUser;

	if(!dc.currentUser){
		console.log("if");
		$location.path('./#/login');
	}else{

		$rootScope.loggedInUser = dc.currentUser;
		$scope.currentUser = dc.currentUser;

		var username = $rootScope.loggedInUser;

		var courseRecommendationURL = constants.baseURL+"/rest/courseRecommendation/"+username;
		var hybridRecommendationURL = constants.baseURL+"/rest/hybridRecommendation/"+username;
		var tutorRecommendationURL = constants.baseURL+"/rest/contentRecommendation/"+username;

		
		
		

		var method = "GET";

		$http({ 
			method : method,  
			url : courseRecommendationURL
		}).then(function success(response){
			$scope.courseSubjects = [];
			console.log("course recommendation: "+angular.toJson(response.data));
			var courses = response.data["result"][0];
			for(var i =0;i<courses.length;i++){
				var subject = courses[i];
				var url = constants.baseURL+"/rest/course/"+subject;

				$http({ 
					method : method,  
					url : url
				}).then(function success(response){
					$scope.courseSubjects.push(response.data.Result);
				}, function success(response){
					console.log("error while retrieving course "+subject);
				});
			}
		}, function error(response){
			console.log('error courseRecommendation');	
		});

		$http({
			method : method,  
			url : hybridRecommendationURL
		}).then(function success(response){
			$scope.feed = [];
			console.log("feed console: "+angular.toJson(response.data));
			$scope.feed = response.data;
		}, function error(response){
			console.log('error hybridRecommendation');
		});
		
		// Tutor Recommendation
		$http({ 
			method : method,  
			url : tutorRecommendationURL
		}).then(function success(response){
			$scope.tutors = [];
//			console.log("tutors console: "+response.data[0]["courseName"]); working
			console.log("tutors console: "+angular.toJson(response.data)); 
			$scope.tutors = response.data;
		}, function error(response){
			console.log('error tutorRecommendation');
		});
		
		
	}
});
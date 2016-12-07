myApp.controller("DashboardController", function($scope, $http, $window, $location, $rootScope, $timeout) {

	//if (typeof $rootScope.loggedInUser === 'undefined'){

	$scope.baseURLImages = constants.baseURLImages;
	$scope.defaultImageURL = constants.defaultImageURL;
	var dc = this;
	dc.currentUser = $window.localStorage.currentUser;

	if(!dc.currentUser){
		console.log("if");
		$location.path('./#/login');
	}else{

		$rootScope.loggedInUser = dc.currentUser;
		$scope.currentUser = dc.currentUser;
		$scope.coursesLength = 0;
		$scope.feedLength = 0;
		$scope.tutorsLength = 0;

		var username = $rootScope.loggedInUser;

		var courseRecommendationURL = constants.baseURL+"/rest/courseRecommendation/"+username;
		var hybridRecommendationURL = constants.baseURL+"/rest/hybridRecommendation/"+username;
		var tutorRecommendationURL = constants.baseURL+"/rest/contentRecommendation/"+username;

		var getCourses = function(){
			var method = "GET";

			$http({ 
				method : method,  
				url : courseRecommendationURL
			}).then(function success(response){
				$scope.courseSubjects = [];

				console.log("course recommendation: "+angular.toJson(response.data));
				var courses = response.data["result"][0];
				$scope.coursesLength = courses.length;
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

				//$scope.awesomeThings = ['HTML5', 'AngularJS', 'Karma', 'Slick', 'Bower', 'Coffee'];
			}, function error(response){
				console.log('error courseRecommendation');	
			});
		}
		getCourses();

		var getFeed = function(){

			$http({
				method : 'GET',  
				url : hybridRecommendationURL
			}).then(function success(response){
				$scope.feed = [];
				console.log("feed console: "+angular.toJson(response.data));
				$scope.feed = response.data;
				$scope.feedLength = $scope.feed.length;
			}, function error(response){
				console.log('error hybridRecommendation');
			});

		}
		getFeed();


		// Tutor Recommendation
		var getTutors = function(){
			$http({ 
				method : 'GET',  
				url : tutorRecommendationURL
			}).then(function success(response){
				$scope.tutors = [];
//				console.log("tutors console: "+response.data[0]["courseName"]); working
				console.log("tutors console: "+angular.toJson(response.data)); 
				$scope.tutors = response.data;
				$scope.tutorsLength = $scope.tutors.length;
			}, function error(response){
				console.log('error tutorRecommendation');
			});
		}
		getTutors();

	}
});
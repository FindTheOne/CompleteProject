var myApp = angular.module('myApp', ['ngRoute', 'slick','autocomplete','cloudinary','ngFileUpload', 'angular.chips','ui.bootstrap']);
myApp.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {

	//'$routeParams', '$location', 'Upload', 'cloudinary'
	/**to remove hash in the URL**/
//	$locationProvider.html5Mode({
//	enabled : true,
//	requireBase : false
//	});

	$routeProvider
	.when('/home',{
		templateUrl: 'views/home.html',
		controller: 'DashboardController'
	})
	.when('/login',{
		templateUrl: 'views/login.html',
		controller: 'LoginController'
	})
	.when('/success',{
		templateUrl: 'views/success.html',
		controller: 'SuccessController'
	})
	.when('/inbox',{
		templateUrl: 'views/inbox.html',
		controller: 'InboxController'
	})
	.when('/signup',{
		templateUrl: 'views/signup.html',
		controller: 'SignupController'
	})
	.when('/friends',{
		templateUrl: 'views/friends.html',
		controller: 'FriendsController'
	})
	.when('/profile/:name',{
		templateUrl: 'views/profile.html',
		controller: 'ProfileController'
	})
	.when('/signout', {
		templateUrl: 'views/signout.html',
		controller: 'SignoutController'
	})
	.otherwise({
		redirectTo: '/login'
	})
}]);


myApp.filter('capitalize', function() {
	return function(input) {
		return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
	}
});

myApp.directive('fallbackSrc', function () {
	var fallbackSrc = {
			link: function postLink(scope, iElement, iAttrs) {
				iElement.bind('error', function() {
					//angular.element(this).attr("src", iAttrs.fallbackSrc);
					angular.element(this).attr("src", constants.defaultImageURL);
				});
			}
	}
	return fallbackSrc;
});

//lowercase
myApp.directive('lowercased', function() {
 return {
     require: 'ngModel',        
     link: function(scope, element, attrs, modelCtrl) {
         modelCtrl.$parsers.push(function(input) {
             return input ? input.toLowerCase() : "";
         });
         element.css("text-transform","lowercase");
     }
 };
});
//lowercase

//uppercase
myApp.directive('uppercased', function() {
 return {
     require: 'ngModel',        
     link: function(scope, element, attrs, modelCtrl) {
         modelCtrl.$parsers.push(function(input) {
             return input ? input.toLowerCase() : "";
         });
         element.css("text-transform","uppercase");
     }
 };
});
//uppercase


myApp.directive('uniqueEmail', uniqueEmail);

/** @ngInject */
function uniqueEmail($http) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			element.bind('blur', function() {
				if (ngModel.$modelValue) {
					$http({
						method : 'GET',
						url : constants.baseURL+"/rest/doesAttributeExist/emailID/"+ngModel.$modelValue,
						data : []
					}).success(function(data) {
						ngModel.$setValidity('unique', !data.result);
					});
				}
			});
			element.bind('keyup', function() {
				ngModel.$setValidity('unique', true);
			});
		}
	};
}


myApp.directive('uniqueUsername', uniqueUserName);

/** @ngInject */
function uniqueUserName($http) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {
			element.bind('blur', function() {
				if (ngModel.$modelValue) {
					$http({
						method : 'GET',
						url : constants.baseURL+"/rest/doesAttributeExist/userName/"+ngModel.$modelValue,
						data : []
					}).success(function(data) {
						ngModel.$setValidity('unique', !data.result);
					});
				}
			});
			element.bind('keyup', function() {
				ngModel.$setValidity('unique', true);
			});
		}
	};
}

myApp.controller('RegistrationController', 
	['$scope', '$firebaseAuth', 'FIREBASE_URL',
	function($scope, $firebaseAuth, FIREBASE_URL){

	var config = {
    	apiKey: "AIzaSyBAVZEeB1TflLCJxr9CluVhVf7wxmPLtLI",
    	authDomain: "myangularapp-86f5e.firebaseapp.com",
    	databaseURL: "https://myangularapp-86f5e.firebaseio.com",
    	storageBucket: "myangularapp-86f5e.appspot.com",
    	messagingSenderId: "1026232754083"
	};

	firebase.initializeApp(config);

	$scope.login = function(){
		$scope.message = "Welcome " + $scope.user.email;
	};

	$scope.register = function(){
		firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
		.catch(function(error) {
		    // Handle Errors here.
		    var errorCode = error.code;
		    var errorMessage = error.message;
		    console.log(error.message);
			$scope.message = error.message;
		});
	};
}]);
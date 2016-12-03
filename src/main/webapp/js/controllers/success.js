myApp.controller('SuccessController', function($scope,$location,$anchorScroll){
	$scope.message = "Welcome to Successs";
	$scope.scrollTo = function(id) {
		var old = $location.hash();
		$location.hash(id);
		$anchorScroll();
		//reset to old to keep any additional routing logic from kicking in
		$location.hash(old);
	}
});
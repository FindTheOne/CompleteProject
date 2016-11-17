/*myApp.controller('InboxController', ['$scope', function($scope){
        console.log("inbox");
        $scope.message = '{"hello":"hgvb"}';
}])*/
    myApp.controller("InboxController", function($scope, $http, $window) {
    	$scope.username = "";
    	$scope.password = "";
    	$scope.message;
    	$scope.user1 = "pavan";
    	$scope.user2 = "saumeel"
    	var method = "GET";
        console.log("in controller");
//        var baseURL = "localhost:8080";
        	//var baseURL = http://server-env.us-west-1.elasticbeanstalk.com;
//    	var url = baseURL+"/findtheone/rest/getInbox/pavan/saumeel";
        var url = "http://localhost:8080/findtheone/rest/getInbox/pavan/saumeel";
		$http({ 
            method : method,  
            url : url
        }).then(function success(response){
        	console.log(response.data);
        	$scope.message = response.data;
            	
        }, function error(response){
        	console.log('error');	
        }); 
		
    });
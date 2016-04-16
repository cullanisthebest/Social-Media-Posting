
var Mean = angular.module('Mean', ['ngRoute']);

url = "http://localhost:1330"

// configure our routes
Mean.config(function($routeProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'homeController'
	})
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'loginController'
	})
	.when('/facebook', {
		templateUrl: 'views/facebook.html',
		controller: 'facebookCtrl'
	})

	// .when('/access_token=:accessToken', {
	// 	template: '',
	// 	controller: function ($location, $rootScope) {
	// 		var hash = $location.path().substr(1);

	// 		//var splitted = hash.split('&');
	// 		var params = {};

	// 		for (var i = 0; i < splitted.length; i++) {
	// 			var param  = splitted[i].split('=');
	// 			var key    = param[0];
	// 			var value  = param[1];
	// 			params[key] = value;
	// 			$rootScope.accesstoken=params;
	// 		}
	// 		$location.path("/");
	// 	}
	// })

	.otherwise({
		redirectTo: '/'
	});
});

Mean.controller('mainController', function($scope, $http, $rootScope) {

//SIGN IN TO GOOGLE
var isSignedIn = false;
$scope.login=function() {
	var client_id="392162559416-527autf6s8n416r884dj45lildr2e5v6.apps.googleusercontent.com";
	var scope="openid%20email%20profile";
	var redirect_uri="http://localhost:1330";
	var response_type="token";
	var include_granted_scopes = "true";
	var access_type="offline";
	var approval_prompt="force";
	var prompt="consent";
	var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
	"&response_type="+response_type+"&include_granted_scopes="+include_granted_scopes;
	window.location.replace(url);
};

//PARSE URL TO GET ACCESS TOKEN
var token = "";
var url = document.URL;
var firstsplit = url.split('&')[0];
token = firstsplit.split('=')[1];
$rootScope.googleToken = token;

//REQUEST USER PROFILE INFORMATION FROM GOOGLE
if($rootScope.googleToken != undefined){
	var profileurl = 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + token;
	$http({
		method: 'GET',
		url: profileurl
	}).then(function successCallBack(response){
		$rootScope.user = response.data.name;
		$rootScope.email = response.data.email;
		$rootScope.googleToken = token;
		//STORE GOOGLE TOKEN AND GOOGLE EMAIL
		$http({
			method: 'POST',
			url: 'http://localhost:1330/googleToken',
			data: {
				'googleToken': $rootScope.googleToken,
				'name': $rootScope.user,
				'email': $rootScope.email
			}
		}).then(function successCallBack(response){
			console.log("Google user " + $rootScope.user + " with token " + $rootScope.googleToken + " saved!")
		}, function errorCallBack(response){
			console.log("saving google token failed!!");
		});

}, function errorCallBack(response){
	console.log("getting google profile info failed!");
});

}

});

//FACEBOOK SCRIPT
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1653098794974343',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

//angular
Mean.controller('homeController', 
	function($scope, $http, $sce, $rootScope) {

//TWITTER STUFF START ############################################################################################  

$scope.addPost = function(){
   if(!$scope.postContent || $scope.postContent === ''){return;}

   var message = {
      tweet: $scope.postContent
  }

  $http({
    method: 'POST',
    url: '/twitter',
    data: {
        'tweet': $scope.postContent
    }
}).then(function successCallBack(response){
    console.log("Succesfully tweeted!")
}, function errorCallBack(response){
    console.log("Tweeting failed!");
});

};

//TWITTER STUFF END ############################################################################################


//FACEBOOK STUFF START ############################################################################################

$rootScope.facebookToken = "" //global facebook access token variable
$rootScope.facebookid = "" //global facebook user id variable
$rootScope.facebookPostid = "" //global facebook post id variable

$scope.FBLogin = function(){
    FB.login(function(response) {
        if (response.authResponse) {
           FB.api('/me', function(response) {
             console.log('Good to see you, ' + response.name + '.');

             $rootScope.facebookToken = FB.getAuthResponse().accessToken;
             $rootScope.facebookid = FB.getAuthResponse().userID;

             console.log("Access token: " + $rootScope.facebookToken + " and user id: " + $rootScope.facebookid);
             console.log($rootScope.user);
             console.log($rootScope.email);
             console.log($rootScope.googleToken);

             //load FB feeds
             getFBFeeds();

         });
       } else {
           console.log('User cancelled login or did not fully authorize.');
       }
   }, {
     scope: 'public_profile, publish_actions, user_posts', 
     return_scopes: true
 });
}

$scope.FBClicker = function(){
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        //var uid = response.authResponse.userID;
        //var accessToken = response.authResponse.accessToken;
        console.log('my facebook token is: ' + $rootScope.facebookToken)

        //SEND POST TO FACEBOOK
        FB.api(
            "/me/feed",
            "POST",
            {
                "message": $scope.postContent
            },
            function (response) {
              if (response && !response.error) {
                $scope.facebookPostid = response.id
                console.log($scope.facebookPostid);
                console.log ("success");

                //STORE USER'S NAME, GOOGLE TOKEN, GOOGLE EMAIL, FACEBOOK POST
                $http({
                    method: 'POST',
                    url: 'http://localhost:1330/facebook',
                    data: {
                        'googleToken': $rootScope.googleToken,
                        'name': $rootScope.user,
                        'email': $rootScope.email,
                        'facebookToken': $rootScope.facebookToken,
                        'facebookPost': {
                            'id': $scope.facebookPostid,
                            'content': $scope.postContent
                        }
                    }
                }).then(function successCallBack(response){
                    console.log("Google user " + $rootScope.user + " with Google token " + $rootScope.googleToken + " and "
                        + " Facebook Token " + $rootScope.facebookToken + " stored a post with id " + $scope.facebookPostid)
                    getFBFeeds();
                }, function errorCallBack(response){
                    console.log("saving facebook post failed!!");
                });

            }
            else
                console.log(response)
        }
        );
} else if (response.status === 'not_authorized') {
    console.log('facebook not authorized')
} else {
    console.log('facebook account not logged in')
}
});

}

//click to get feeds
$scope.FBFeeds = function(){
    getFBFeeds()
};

getFBFeeds = function(){
    //GET FIRST FEED FROM USER'S PROFILE
    FB.api(
        "/me/posts",
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            var allfbposts = "";
            var onefbpost = "";
            var allfbcomments = "";
            var onefbcomment = "";
            var counter = 0;
            for(i=0; i<1; i++){
                console.log(response.data[i].message)
                
                if(counter==i){
                    onefbpost = "<p><h4>" + response.data[i].message + "</h4>"
                    allfbposts = allfbposts + onefbpost;
                }
                FB.api(
                    "/" + response.data[i].id + "/comments",
                    function (response) {
                      if (response && !response.error) {
                        for(j=0; j<response.data.length; j++){
                            console.log(response.data[j].message)
                            onefbcomment = response.data[j].message
                            allfbcomments = allfbcomments + onefbcomment + "<br/>";
                        }
                        allfbposts = allfbposts + allfbcomments + "</p><br/>";
                        allfbcomments = "";
                        console.log("1" + allfbposts)
                        $scope.fbposts1 = $sce.trustAsHtml(allfbposts);
                    }
                    counter++;
                }
                );
            }
        }
    }
    );

    //GET SECOND FEED FROM USER'S PROFILE
    FB.api(
        "/me/posts",
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            var allfbposts = "";
            var onefbpost = "";
            var allfbcomments = "";
            var onefbcomment = "";
            var counter = 1;
            for(i=1; i<2; i++){
                console.log(response.data[i].message)

                if(counter==i){
                    onefbpost = "<p><h4>" + response.data[i].message + "</h4>"
                    allfbposts = allfbposts + onefbpost;
                }
                FB.api(
                    "/" + response.data[i].id + "/comments",
                    function (response) {
                      if (response && !response.error) {
                        for(j=0; j<response.data.length; j++){
                            console.log(response.data[j].message)
                            onefbcomment = response.data[j].message
                            allfbcomments = allfbcomments + onefbcomment + "<br/>";
                        }
                        allfbposts = allfbposts + allfbcomments + "</p><br/>";
                        allfbcomments = "";
                        console.log("1" + allfbposts)
                        $scope.fbposts2 = $sce.trustAsHtml(allfbposts);
                    }
                    counter++;
                }
                );
            }
        }
    }
    );

    //GET THIRD FEED FROM USER'S PROFILE
    FB.api(
        "/me/posts",
        function (response) {
          if (response && !response.error) {
            /* handle the result */
            var allfbposts = "";
            var onefbpost = "";
            var allfbcomments = "";
            var onefbcomment = "";
            var counter = 2;
            for(i=2; i<3; i++){
                console.log(response.data[i].message)

                if(counter==i){
                    onefbpost = "<p><h4>" + response.data[i].message + "</h4>"
                    allfbposts = allfbposts + onefbpost;
                }
                FB.api(
                    "/" + response.data[i].id + "/comments",
                    function (response) {
                      if (response && !response.error) {
                        for(j=0; j<response.data.length; j++){
                            console.log(response.data[j].message)
                            onefbcomment = response.data[j].message
                            allfbcomments = allfbcomments + onefbcomment + "<br/>";
                        }
                        allfbposts = allfbposts + allfbcomments + "</p><br/>";
                        allfbcomments = "";
                        console.log("1" + allfbposts)
                        $scope.fbposts3 = $sce.trustAsHtml(allfbposts);
                    }
                    counter++;
                }
                );
            }
        }
    }
    );
}

//FACEBOOK STUFF END ====================================================================================


//DISPLAY ALL POSTS START ====================================================================================

//gets the posts of the user
getposts = function(){
    //checks if user is logged in
    if($rootScope.email != null){
    $http({
        method: 'POST',
        url: '/getusers',
        data: {
            'email': $rootScope.email
        }
    }).then(function successCallBack(response){
        console.log(response)
        allposts="";
        for(i=0; i<response.data[0].facebookPost.length; i++){
            console.log(response.data[0].facebookPost[i].content)
            allposts = allposts + "<p>" + response.data[0].facebookPost[i].content + "</p>"
        }
        $scope.allposts = $sce.trustAsHtml(allposts);
    }, function errorCallBack(response){
        console.log("getting posts failed!");
    });
}
}

//update the posts shown
updateposts = function(){
    setTimeout(function(){getposts()}, 500);
}

//updates the posts shown ON PAGE LOAD
$scope.posts = function(){
    updateposts();
}

//update the posts shown ON CLICK
$scope.updateposts = function(){
    updateposts();
}

//DISPlAY ALL POSTS END ====================================================================================

});
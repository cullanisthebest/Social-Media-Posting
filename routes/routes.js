
// var obj{
// 	twitter:'tweet'
// 	googgle: ''
// 	facebook: 'tweet'
// }


var Twitter = require('twitter');

var twitterclient = new Twitter({
  consumer_key: 'b1k9Js60SO5xeZawGtKxdZm9J',
  consumer_secret: 'ugJ3UcgNBOIoWo5ZB9N7JEIc11SZ2AVEEw7qHZ1ZgYAlBW5Yxz',
  access_token_key: '273642515-qJtt0o9rrNlWjN0proWwv4hWFTal5jewtn2BQ2cF',
  access_token_secret: '8krwNAwHbTuU02B1xdWD3pKvAjHsdjw0ndTLenJm0TOty'
});

var tumblr = require('tumblr.js');

var tumblrclient = tumblr.createClient({
  consumer_key: 'EeRoRkPYw8sRPH1ZqYkhtLUg4YNdEHR6CF1shA68Ap3qA11cfd',
  consumer_secret: '1zC4n5X2RH8pzxpgmu0BZosR4oYRxuWxMomOyzXyG2DH2ysluX',
  token: 'H7CuX9ndykjsdfHkbwoeCEdlQMBiJOR9IwF0DBrAAFpgW6OGYe',
  token_secret: '4Y0RIfvzu2V4OKLPnU7qm0e0AsJmkwfpbnN2i7kq7jJxh4muW6'
});


//ROUTES ===========================================================

module.exports = function (app){


//TWITTER GET ACCESS TOKEN START =====================================================================

var Twitter = require("node-twitter-api");

var twitter = new Twitter({
  consumerKey: "b1k9Js60SO5xeZawGtKxdZm9J",
  consumerSecret: "ugJ3UcgNBOIoWo5ZB9N7JEIc11SZ2AVEEw7qHZ1ZgYAlBW5Yxz",
  callback: "http://localhost:1330"
});

var _requestSecret;

app.get("/request-token", function(req, res) {
  twitter.getRequestToken(function(err, requestToken, requestSecret) {
    if (err)
      res.status(500).send(err);
    else if (res) {
      _requestSecret = requestSecret;
      res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
    }
  });
});

app.get("/access-token", function(req, res) {
  var requestToken = req.query.oauth_token,
  verifier = req.query.oauth_verifier;

  twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
    if (err)
      res.status(500).send(err);
    else
      twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
        if (err)
          res.status(500).send(err);
        else
          res.send(user);
      });
  });
});

  //TWITTER GET ACCESS TOKEN END =====================================================================


  //POST TO TWITTER START =====================================================================

  app.post('/twitter',function(req, res){

    var tweetmsg = req.body.tweet

		//if(req,body.tweet.length >0)

		twitterclient.post('statuses/update', {status: tweetmsg},  function(error, tweet, response){
      if(error) throw error;
		  //console.log(tweet);  // Tweet body. 
		  //console.log(response);  // Raw response object.
      if(response) res.send(tweet) //If tweet successful, notify controller
    });

	})

  //POST TO TWITTER END =====================================================================


  //POST TO TUMBLR START =====================================================================

  app.post('/tumblr',function(req, res){

    var tumblr = req.body.tumblr

    client.text(blogName, options, callback);

  })

  //POST TO TUMBLR END=====================================================================


  //SAVE USER'S GOOGLE INFORMATION START =====================================================================

  app.post('/googleToken', function(req,res){

      //information from request body
      var newGoogleToken = req.body.googleToken;
      var newGoogleEmail = req.body.email;
      var newGoogleName = req.body.name;

      //information to update if user exists
      var conditions = {email: newGoogleEmail}
      var update = {$set: {googleToken: newGoogleToken}}
      var options = {upsert:true}

      //information to make new google user if doesn't exist
      var googleUser = User({
        googleToken: newGoogleToken,
        email: newGoogleEmail,
        name: newGoogleName
      })

      //Tries to READ/RETRIEVE a user with that google email in the database
      User.findOne({'email': newGoogleEmail}, function(err, success){
        if(err){
          console.log("didnt find so error")
          res.send(err)
        }
        //if user currently exists, UPDATE(SET) their google token
        if(success){
          console.log("found existing")
          User.update(conditions, update, options, function(err, data) {
              if(err){
                res.send(err)
              }
              if(data)
                res.send(data)
            }
          )
        }
        else{
          //if user doesn't currently exist, CREATE new googleUser in the database
          console.log("making new")
          googleUser.save(function(err, success){
            if(err){
              res.send(err)
            }
            if(success){
              res.send(googleUser)
            }
          })
        }
      })
    })

  //SAVE USER'S GOOGLE INFORMATION END =====================================================================


  //SAVE USER'S FACEBOOK STUFF START =====================================================================

  app.post('/facebook', function(req,res){

    var googleEmail = req.body.email;
    var facebookToken = req.body.facebookToken;
    var facebookPostid = req.body.facebookPostid;

    //UPDATE(PUSH) new facebook post into user's database record
    User.update({email: googleEmail},
      {$push: {'facebookPost': {'id': req.body.facebookPost.id,
                                'content': req.body.facebookPost.content}}}, {upsert:true}, function(err, data) {
        if(err){
          res.send(err)
        }
        if(data)
          res.send(data)
      });
  });
  //SAVE USER'S FACEBOOK STUFF END =====================================================================


  //GET ALL STORED USERS INFORMATION START =====================================================================

  app.post('/getusers', function(req, res) {
    	var email = req.body.email //get the value of the key email in the request body

      //From User model, retrieve/read all records that have (if any) the email and send it back
      User.find({'email': email}, function(err, data){
      	if(err)
      		res.send(err)
      	if(data){
      		res.send(data)
      	}
      	else
      		res.send("Bye!!")
      })
  });

   //GET ALL STORED USERS INFORMATION END =====================================================================

}

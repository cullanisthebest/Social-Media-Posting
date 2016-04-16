// This function is called during initialization and after
// the user clicks the logon button.
function checkLoginState() {	
	// Ask Facebook about the currently logged in user, and
	// call statusChangeCallback when you get the response.
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}


// This function is called by FB.getLoginStatus after it gets the
// results.
function statusChangeCallback(response) {
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	//
	// The response object can be found in the documentation
	// for FB.getLoginStatus().
	
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		loggedOn();
	} else if (response.status === 'not_authorized') {
		setFacebookStatus("Please authorize this application");
	} else {
		// Not logged into Facebook
		setFacebookStatus("Please log into Facebook");
	}
}


// Facebook API initialization function. This function is called
// after the Facebook API code is downloaded from Facebook's site.
window.fbAsyncInit = function() {
	
	// Initialize the Facebook SDK. Make sure to change appId to your
	// value.
	FB.init({
		appId      : '1653098794974343',
		cookie     : true,  // enable cookies to allow the server to access
							// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.2' // use version 2.2
	});

	// Check logged in status
	checkLoginState();
};


// This code loads the Facebook SDK asynchronously. This way, the page
// is displayed as soon as possible, and the Facebook elements are added
// later when they are available.
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];

	// If there is already a facebook-jssdk element, do nothing.
	// It means the Facebook SDK is already available.
	if (d.getElementById(id)) return;
	
	// Create an element for the Facebook SDK and call it
	// facebook-jssdk. Put the element into the variable
	// js
	js = d.createElement(s); js.id = id;
	
	// This is the script to get the source for the SDK.
	js.src = "//connect.facebook.net/en_US/sdk.js";
	
	// Insert the script before the first element in the
	// documentation
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//This function is called when we KNOW the user is logged on.
function loggedOn() {
	setFacebookStatus("You're in");
	
	FB.api('/me', function(response) {
		setScopeVar("userName", response.name);
	});
}
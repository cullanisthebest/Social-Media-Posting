userSchema = new db.Schema({
	email 				: String,
	name				: String,
	googleToken       	: String,
	facebookToken       : String,
	facebookPost        : [{
							id: String,
							content: String,
						  }],
    twitterToken        : String,
    tumblrToken 		: String
})


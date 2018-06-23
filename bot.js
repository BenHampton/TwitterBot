console.log("TESTING: retweet");
var Twit = require("twit"); //like in  JAVA Import
var config = require('./config');  // where config.js contains the twitter keys/tokens
//creating a new object T
var T = new Twit(config);

var fs = require('fs'); //'fs' = File System

//set up user stream
var stream = T.stream('user');

/***************setInterval***************/
//calling function tweet/retweet on a set time

/***************tweetReweet***************/
//tweet/retweet something from somewhere.. but what?? TBA

/***************retweet***************/
//follow anyone who retweets @BOT
// call 'friendFinder()'

/***************followBack***************/
//follow back @USER who Follows @me
// call 'friendFinder()'

/***************tweetedBot***************/
//follow @USER that tweets @BOT
// call 'friendFinder()'


/***************EMBEDDED function: friendFinder***************/
//any @USER that follows @BOT.. get list of @USERS 'followers'
//pick 2 random followers from @USER
//follow those 2 USERS





/***************functions in botTemplate***************/


/***************GET list of USERS followers by USER's json:id***************/

/***************FOLLOW***************/

/***************RETWEET***************/

/***************MEDIA***************/

/***************TWEET @user WHO FOLLOWED***************/

/***************POST**************/

/***************GET***************/

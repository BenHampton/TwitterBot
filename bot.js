console.log("TESTING!!");
var Twit = require("twit"); //like in  JAVA Import
var config = require('./config');  // where config.js contains the twitter keys/tokens
//creating a new object T
var T = new Twit(config);

var fs = require('fs'); //'fs' = File System

//set up user stream
var stream = T.stream('user');

//gloal variables
var newTweet; //is new tweet
var firstTweet; //first text from first tweet when server started

startSearch();
/***************setInterval***************/
//calling function tweet/retweet on a set time
//setInterval(search, 1000*15);

/***************startSearch***************/ //Starts first search when loaded to server
//tweet/retweet something ?TBA?
function startSearch() { // searches for last tweet/retweet from @arielengle & calls retweetAriel()
  console.log("startSearch: Initialized");
  eventParams = {
    q: "arielengle",
    count: 1
  }

  T.get("search/tweets", eventParams, startData);

  function startData(err, data, response) {
    var tweetText = data.statuses;
    var tweetId;
    var screenName;
    for(var i = 0; i < tweetText.length; i++) {
      firstTweet = tweetText[i].text;
      tweetId = tweetText[i].id_str;
      screenName = tweetText[i].retweeted_status.user.screen_name;
    }

    var params = {
      id: tweetId
    }
    retweetedBot(params, screenName);
    console.log("startSearch: Completed");
  }
}//end of search()
/***************search***************/ //setInterval recalls

function search() {
  eventParams = {
    q: "arielengle",
    count: 1
  }
  T.get('search/tweets', eventParams, gotData);

  function gotData(err, data, response) {

    var tweetText = data.statuses;
    var tweetId;
    var screenName;

    for(var i = 0; i < tweetText.length; i++){
      newTweet = tweetText[i].text;
      tweetId = tweetText[i].id_str;
      screenName = tweetText[i].retweeted_status.user.screen_name;
    }

    var params = {
      id: tweetId
    }
    if(newTweet === firstTweet){
      console.log('Nothing new to Retweet.. :(');
    }else{
      retweetedBot(params, screenName);
      firstTweet = newTweet
      console.log('firstTweet: Reset');
    }
  }//end if gotData()
}//end of search()

/***************retweet***************/
//follow anyone who retweets @BOT
function retweetedBot(tweetId, sn) {

  T.post('statuses/retweet/:id', tweetId, retweet);

  function retweet(err, data, response) {

    var screenName = sn;

    if(!err) {
      console.log('Retweeted');
      friendFinder(screenName);
    }else {
      console.log('Error: Retweeting', err);
    }
  }//end of retweet()
}//end of retweetedBot()
// call 'friendFinder()'

/***************followBack***************/
//follow back @USER who Follows @me
stream.on('follow', followBack);

function followBack(e) {
  var screenName = e.source.screen_name;
  var userId = e.source.id;
  var params = {
    id: userId
  };

  T.post('friendships/create', params, follow);

  function follow(err, data, response) {
    if(!err){
      console.log("Followed User: @",screenName);
    }else {
      //console.log(err);
    }
  }//end of follow()
}//end of followBack()
// call 'friendFinder()'

/***************POST***************/
function postTweet(params) {
  //parameter 'params' is the params object for.. T.post(..,params,..);
  T.post('statuses/update', params, retweet);
  function retweet(err, data, response) {
    if(!err){
      console.log('Tweeted');
    }else{
      console.log('Tweet Post: Error');
    }
  }
}//end of postTweet()

/***************EMBEDDED function: friendFinder***************/
//any @USER that follows @BOT.. get list of @USERS 'followers'
//pick 2 random followers from @USER
//follow those 2 USERS
function friendFinder(sc) {

  var params = {
    screen_name: sc
  }

  T.get('followers/ids', params, getUserFollowers);

  function getUserFollowers(err, data, response) {

    var followerIds = data.ids;
    var followers = new Array();
    var rand;

    if(!err){
      for(var i of followerIds){
        var str = i.toString()
        followers.push(str);
      }

        rand = followers[Math.floor(Math.random() * followers.length)];
        var params = {
          id: rand
        }
        console.log(params);
        randomFriend(params);

    }else{
      console.log('Error: getUserFollowers');
    }
 }//end of getUserFollowers()
}//end of friendFinder()

function randomFriend(params) {
  console.log("in randomFriends");

  T.post('friendships/create', params, getFriend);

  function getFriend(err, data, response) {
    if (err){
      console.log("Error: getFriend", err);
    }
    console.log('out of random friends');
  }//end of getFriend()
}



/***************functions in botTemplate***************/


/***************GET list of USERS followers by USER's json:id***************/

/***************FOLLOW***************/

/***************RETWEET***************/

/***************MEDIA***************/

/***************TWEET @user WHO FOLLOWED***************/

/***************POST**************/

/***************GET***************/

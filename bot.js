console.log("TESTING: follow")
var Twit = require("twit"); //like in  JAVA Import

var config = require('./config');  // where config.js contains the twitter keys/tokens
//creating a new object T
var T = new Twit (config);

//set up user stream
var stream = T.stream("user");

//anytime someone follows me
stream.on('follow', followed);

function followed(eventMsg) {
  console.log("FOLLOW EVENT")
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  tweetPOST('@' + screenName + ' thanks for following!!');
}

//setInterval(tweetPOST,1000*10);

function tweetPOST(txt) {
  //var r = Math.floor(Math.random()*100);
  //object tweet with element 'status' that is going to be the HashTag
   var tweet = {
     status: txt
   };

  //Post Method, parameters (update tweet,  the parameters of the tweet,   call back function-'tweeted')
  T.post('statuses/update', tweet , tweeted);

  function tweeted(err, data, response){
    if(err){
      //if there is an error print to console
      console.log("Error: ", err);
    }else {
      //NO ERRORS print to console
      console.log("Tweeting");
    }
  }
}//end of tweetPOST

function tweetGET(){
  //object 'parms' that will be searched via T with 'q'-Query being what HashTag too search for, 'count'-How many results/searches
  var parms = {
    q: 'testPost_0',
    count: 3
   }
  //Get Method, parameters (searching for tweets,  the parameters of the search,   call back function-'gotData')
  T.get('search/tweets', parms, gotData);

  //call back function
  function gotData(err, data, response) {
  // tweet = data(JSON) .  statuses(in parameter in JSON)
    var  tweets = data.statuses;
    //for-loop retreive all data from data(JSON)
     for ( var i = 0; i < tweets.length; i++ ){
         //print to console 'tweet[i].text' - the JSON parameter 'text' - HashTag being used
        console.log("HERE",tweets[i].text);
    }
    console.log(data);
  };
}//end of tweetGET

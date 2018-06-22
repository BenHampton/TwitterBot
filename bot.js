console.log("TESTING: retweet");
var Twit = require("twit"); //like in  JAVA Import
var config = require('./config');  // where config.js contains the twitter keys/tokens
//creating a new object T
var T = new Twit(config);

var fs = require('fs'); //'fs' = File System

var imgPATH = "./img/ai.png";
//set up user stream
var stream = T.stream('user');


/***************RETWEET***************/
  stream.on('tweet', tweetEvent);

  function tweetEvent(eventMsg) {
    console.log(eventMsg); //Displays user who tweeted @me - JSON
    var replyTo = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;
    console.log(replyTo);
    console.log(text);
    console.log(from);
  }

/***************MEDIA***************/
//tweetMedia();
function tweetMedia() {
  console.log("Meida: were in Media")
  var params = {
     encoding: 'base64'
   };

  var b64 = fs.readFileSync(imgPATH, params);

  T.post('media/upload', { media_data: b64 }, uploaded);

  function uploaded(err, data, response) {
    console.log("Meida: Uploaded");//this is where i will tweet

    var mediaIdStr = data.media_id_string;
    var altText = "I AM ALT_TEXT";
    var meta_params = {
      alt_text: {text: altText},
      media_id: mediaIdStr
    }

    T.post('media/metadata/create', meta_params, uploadImg);
    function uploadImg(err, data, response){
      console.log("Meida: uploadImg");
      var tweet = {
        status: '#CodeToMeida0',
        media_ids: [mediaIdStr]
      }
      T.post('statuses/update', tweet, tweetPOST(tweet));
      console.log("Meida: tweetedIMG")
      }
    }
}//end of tweetMedia

/***************TWEET @user WHO FOLLOWED***************/
//anytime someone follows me
stream.on('follow', followed);

function followed(eventMsg) {
  console.log("FOLLOW EVENT")
  var name = eventMsg.source.name;
  var screenName = eventMsg.source.screen_name;
  var tweet = {
    status: '@' + screenName + ' Thanks for following me!'
  };
  tweetPOST(tweet);
}

/***************setInterval***************/
//setInterval(tweetPOST,1000*10);

/***************POST**************/
function tweetPOST(tweet) {
  //object tweet with element 'status' that is going to be the HashTag
   // var tweet = {
   //   status: txt
   // };
  //Post Method, parameters (update tweet,  the parameters of the tweet,   call back function-'tweeted')
  T.post('statuses/update', tweet , tweeted);
  function tweeted(err, data, response){
    if(err){
      console.log("Error: ", err);
    }else {
      console.log("Tweeting POST");
    }
  }
}//end of tweetPOST


/***************GET***************/
function tweetGET(){
  //object 'parms' that will be searched via T with 'q'-Query being what HashTag too search for, 'count'-How many results/searches
  var parms = {
    q: 'arielengle',
    count: 10
   }
  //Get Method, parameters (searching for tweets,  the parameters of the search,   call back function-'gotData')
  T.get('search/tweets', parms, gotData);
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

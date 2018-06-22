console.log("TESTING: media")
var Twit = require("twit"); //like in  JAVA Import
var config = require('./config');  // where config.js contains the twitter keys/tokens
//creating a new object T
var T = new Twit (config);

var fs = require('fs');
var imgPATH = "./img/output.png";

tweetMedia();

function tweetMedia() {
  console.log("TESTING: were in")
  var params = {
     encoding: 'base64'
   };

  var b64 = fs.readFileSync(imgPATH, params);

  T.post('media/upload', { media_data: b64 }, uploaded);

  function uploaded(err, data, response) {
    console.log("TESTING: uplaoded");
    //this is where i will tweet
    var mediaIdStr = data.media_id_string;
    var altText = "I AM ALT_TEXT";
    var meta_params = {
      alt_text: {text: altText},
      media_id: mediaIdStr
    }
    console.log(meta_params);

    T.post('media/metadata/create', meta_params, uploadImg);
    
    function uploadImg(err, data, response){
      console.log("TESTING: uplaodImg");
      var tweet = {
        status: '#CodeMeida',
        media_ids: [mediaIdStr]
      }
      T.post('statuses/update', tweet, tweeted);
        console.log("TESTING: tweeted")
        function tweeted(err, data, response){
          //NO ERRORS print to console
          console.log("Tweeting Img");
      }
    }
  }
}//end of tweetMedia

//set up user stream
var stream = T.stream("user");

//anytime someone follows me
//stream.on('follow', followed);

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

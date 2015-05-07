//variable to get the elements on the main page
    var inferiorPages = document.querySelector('core-animated-pages');    
    var board = document.querySelector('my-board');
    var questionPage = document.querySelector('my-question');
    var winpage = document.querySelector('my-winpage');
    var questRes = document.querySelector('my-questionResponse');
    var mainPages =document.querySelector('core-pages');
    var profile = document.querySelector('my-profile');
    function trans(index) {
      var s=document.querySelector('core-scaffold');
      s.togglePanel();
      inferiorPages.selected=index;
      if(index==1){
          questionPage.mode="singlePlayer";
          winpage.mode="singlePlayer";
      }
    }
    //question requested event handler   
    board.addEventListener('questionRequested', function(){
        questionPage.question=board.question;
        questionPage.count=10;
        questionPage.countDown();
        
        inferiorPages.selected=5;       
    })
    questionPage.addEventListener('questionWrong',function(){
        board.$.pages.selected=0;
        console.log("Respuesta incorrecta");
         questRes.message="You're Wrong! :(";
        questRes.win="loose";
        inferiorPages.selected=7;
        this.async(function(){ 
          inferiorPages.selected=1;
        }, null, 7000);
    })
    
    questionPage.addEventListener('questionRigth',function(){
        board.$.pages.selected=0;
        console.log("Respuest correcta");
         questRes.message="You're Rigth!";
        questRes.win="win";
        inferiorPages.selected=7;
        this.async(function(){ 
          inferiorPages.selected=1;
        }, null, 7000);
    })
     questionPage.addEventListener('singlePlayerEnded',function(){
        console.log("Juego terminado");
        board.$.pages.selected=0;
        winpage.score=questionPage.score;
        questionPage.score=0;
        inferiorPages.selected=6; 
        
    })
    questionPage.addEventListener('outOfTime',function(){
        board.$.pages.selected=0;
        console.log("Time's out");
        questRes.message="Time's Out!";
        questRes.win="loose";
        inferiorPages.selected=7;
        this.async(function(){ 
          inferiorPages.selected=1;
        }, null, 7000);
    })
    winpage.addEventListener('returnTapped',function(){
        inferiorPages.selected=4;
    })

 // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      loginSuccess();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log('Please log ' +
        'into this app.');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('Please log ' +
        'into Facebook.');
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1585299641684497',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
    
  function loginSuccess(){
      FB.api('/me',function(response){
        this.mainPages.selected=0;
        console.log(response);
        this.profile.user=response;
      });

  }
  function logOut(){
      FB.getLoginStatus(function(data){
        if(data.status ==="connected"){
            FB.logout( function (response){
              console.log(response);
              this.mainPages.selected=1;
            });
        }else{
          return false;
        }

      });

  }
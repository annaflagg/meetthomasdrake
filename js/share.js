
	var basurl = "http://static.ajplus.net/drake/"

	
	function interactivesPostToFacebook(hashtag) {
      var data = shareData();
      var link = (typeof purl=="string")? encodeURIComponent(purl) : encodeURIComponent(data.url+"#"+hashtag);
      var width  = 570,
          height = 620,
          left   = (window.innerWidth  - width)  / 2,
          top    = (window.innerHeight - height) / 2,
          url    = "http://www.facebook.com/sharer/sharer.php?u=" + link,//"https://www.facebook.com/sharer/sharer.php?u=http://www.gofoiayourself.net",//"https://www.facebook.com/sharer/sharer.php?u=http://www.bloomberg.com/graphics/2015-pace-of-social-change/",//"https://www.facebook.com/sharer/sharer.php?u=www.gofoiayourself.net/",//"http://www.facebook.com/sharer/sharer.php?u=" + link,

          opts   = 'status=1' +
                   ',width='  + width  +
                   ',height=' + height +
                   ',top='    + top    +
                   ',left='   + left;

      window.open(url, 'facebook', opts);
    }
    
    function interactivesPostToTwitter(hashtag, longtitle) {

      var data = shareData();
      var tweetUrl = "https://twitter.com/share?url=" + encodeURIComponent(data.url+"#"+hashtag) + "&text=" + encodeURIComponent(longtitle);
      var opts = centerPopup(820, 440) + "scrollbars=1";
      window.open(tweetUrl, 'twitter', opts);
    }
    
    
    function postToFacebook(event) {
      event.preventDefault()
      var data = shareData();
      var link = (typeof purl=="string")? encodeURIComponent(purl) : encodeURIComponent(data.url);
      var width  = 570,
          height = 620,
          left   = (window.innerWidth  - width)  / 2,
          top    = (window.innerHeight - height) / 2,
          url    = "http://www.facebook.com/sharer/sharer.php?u=" + link,//"https://www.facebook.com/sharer/sharer.php?u=http://www.gofoiayourself.net",//"https://www.facebook.com/sharer/sharer.php?u=http://www.bloomberg.com/graphics/2015-pace-of-social-change/",//"https://www.facebook.com/sharer/sharer.php?u=www.gofoiayourself.net/",//"http://www.facebook.com/sharer/sharer.php?u=" + link,

          opts   = 'status=1' +
                   ',width='  + width  +
                   ',height=' + height +
                   ',top='    + top    +
                   ',left='   + left;

      window.open(url, 'facebook', opts);
    }
    
    
    function postToTwitter(event) {
      event.preventDefault()

      var data = shareData();
      var tweetUrl = "https://twitter.com/share?url=" + encodeURIComponent(data.url) + "&text=" + encodeURIComponent(data.longTitle);
      var opts = centerPopup(820, 440) + "scrollbars=1";
      window.open(tweetUrl, 'twitter', opts);
    }
    
    function centerPopup(width, height) {
      var wLeft = window.screenLeft ? window.screenLeft : window.screenX;
      var wTop = window.screenTop ? window.screenTop : window.screenY;
      var left = wLeft + (window.innerWidth / 2) - (width / 2);
      var top = wTop + (window.innerHeight / 2) - (height / 2);
      return 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
    }
    
    function shareData() {
    var metaTags=document.getElementsByTagName("meta");
    var data = {
      title:"Meet Thomas Drake",
      longTitle:"Meet Tom Drake, the NSA whistleblower before Snowden @ajplus @annaflagg @emily_bodenberg @moizsyed @sievefistedfind",
      url:basurl,
      image: basurl+"/img/share.png",
      description:"Description"
    };
    return data;
  }

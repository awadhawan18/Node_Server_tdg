/**
 * Created by Himanshu wolf on 17/10/15.
 *
 * @desc This is the global file for all the pages, it creates the namespace for the application and defines the global variables that will used in the application.
 *
 * JS structure
 *
 * 1. global.js - TDG is global namespace
 * 2. modules
 *      - all supportive modules extending the namespace
 * 3. fragments
 *      - contains the page specific scripts and event handling
 *
 * Naming conventions for JS
 *
 * Functions - camelCase [bindEvent()]
 * Variables - underscore separated [my_var]
 * DOM selector - .js-thisElement
 * Constants - UPPERCASE
 * Constructor - Capitalize
 * Private members - underscore prefix [ _private_var ]
 *
 */

if(typeof TDG === 'undefined') {

  TDG = {};
}

TDG.urls = {
  SUBSCRIBE_ME : '/subscribeMe',
  WEATHER : '/weather',
  GET_ITINERARY_QUOTE : '/itinerary/getquote',
  BOOK_TRIP : '/itinerary/book',
  SEARCH_PRODUCT : '/search-product',
  LOAD_TOURS : '/load-tours',
  PRODUCT_BOOKING : '/product/book',
  ADD_TO_BOOK : '/add-to-book',
  WEEKLY_DESTINATION : '/weekly-destination',
  HOME_FACT : '/home-fact',
  WISHLIST : '/add-to-wishlist',
  SET_LOCATION : '/set-source',
  INTENT_RESPONSE : '/exit-intent',
  GET_DEAL : '/get-deal'

};

TDG.regex = {
    "EMAIL": /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    "PHONE": /^[0-9]{10}$/,
    "NUMBER": /^[0-9]+$/,
    "SPECIAL_CHAR": /[<>]/i
};

TDG.domClass = {
  "OPEN" : 'open',
  "STATIC" : 'static',
  "SELECTED" : 'selected',
  "SHOW" : 'show'

}

TDG.ascii = {
  ESCAPE : 27,
  ENTER : 13
};

TDG.utils = {
  createCookie : function(name,value,days) {
    var expires ='';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = "; expires="+date.toGMTString();
  }
  else  expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
},

  readCookie : function (name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
},
  getUrlVars : function(tmUrl) {
    var vars = [], hash;
    var hashes = tmUrl.slice(tmUrl.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;

  }
};

TDG.toggleOverlay = function() {
  var $overlay=  $('.fixed-overlay'), $body = $('body');
  if($overlay.hasClass('hide')) {
    $overlay.removeClass('hide');
    $body.addClass('noscroll');
  } else {
    $overlay.addClass('hide');
    $body.removeClass('noscroll');
  }
};

TDG.storelocalStorage = function(key, blog){
 localStorage.setItem(key, JSON.stringify(blog));
};
TDG.retrievelocalStorage = function(key){
 var retrievedObject = localStorage.getItem(key);
 return JSON.parse(retrievedObject);
};

TDG.jsonToQueryString = function(json) {
  return '?' +
      Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key]);
      }).join('&');
}

TDG.subscribeSubmit = function() {
  var $btn_ref = $(this), form = $btn_ref.parents('form'),
      email_ref = $(form.find('[name="email"]')),
      userEmail='';

  if(email_ref && email_ref.val()) {
    userEmail = email_ref.val();
  }
  dataLayer.push({'subscriber': userEmail});

  if(! $btn_ref.hasClass('disabled') && userEmail) {
    $btn_ref.addClass('disabled');

    $.ajax({
      url: TDG.urls.SUBSCRIBE_ME,
      method: 'POST',
      data: {email: userEmail},
      success: function (response) {
        $('<div>' + response.message + '</div>').insertAfter(form);
      },
      error: function (err) {
        $('<div> Something is wrong </div>').insertAfter(form);
      }
    });
  }
};

TDG.lazyLoadImages = function(container) {
  var imgTags = container.find('img[data-src]');

  imgTags.each(function(index, tag) {
    var $this = $(this);
    $this.attr('src', $this.attr('data-src'));

  });

};

TDG.ExitIntent = function($el) {

  var constants = {
    dataAttr : 'happy',
    dataAttrComment : 'comment',
    cookie : 'intentResponse'
  };

  var _self = this, $close = $el.find('.js-closeIntent'), $response = $el.find('.js-response'), methods= {};

  methods.recordResponse = function() {
    var response = $(this).data(constants.dataAttr),
        comment = $('.js-comment').val();
    $.ajax({
      method: 'POST',
      data: {happy: response, comment: comment},
      url: TDG.urls.INTENT_RESPONSE,
      success : function() {
        _self.closeIntent();
      }, error : function() {
        _self.closeIntent();
      }
    });
  };
  methods.closeIntent = function(){
    _self.closeIntent();
  }

  $response.click(methods.recordResponse);
  $close.click(methods.closeIntent);

  this.showIntent = function() {
   $el.addClass(TDG.domClass.OPEN);

  };

  this.closeIntent = function() {
    $el.removeClass(TDG.domClass.OPEN);
  };

  this.init = function(e) {
    if( e.clientY < 0  && !TDG.utils.readCookie(constants.cookie)) {
      TDG.utils.createCookie(constants.cookie, 'recorded', 2);
      setTimeout( function() {
        _self.showIntent();
      }, 500);

    }
  }
};


(function() {
  var el = {
    $lazyImages : $('.img-lazy'),
    formBtn      : '.js-getSubscription',
    $autoSearch : $('.js-autoSearch'),
    $magicBox: $('.magic-box'),
    $magicBoxClose: $('.magic-box .js-close'),
    $mobileNavs: $(".mobile-navigation")
  },
      scrollIndex = {}, scrollIndices, indexLength;

  el.$lazyImages.each(function(index, tag) {
    var $this = $(this);

    if(scrollIndex[$this.attr('data-scroll')]){
      scrollIndex[$this.attr('data-scroll')].push($this);
    } else {
      scrollIndex[$this.attr('data-scroll')] = [$this]; // create new images array
    }
  });
  scrollIndices = Object.keys(scrollIndex);
  indexLength = scrollIndices.length;


  $(window).on('scroll', function () {
    var scrollY = window.scrollY,
        loadImage = function(items) {
          items.forEach(function(item) {
            var $this = $(item);
            if($this.attr('data-src')){
              $this.attr('src', $this.attr('data-src'));
              $this.attr('data-src', '');
            }
          });
        }
    if (!($(document).height() - $(window).height() > 400)) {
      return;
    }
    scrollY = (parseInt(String(scrollY)[0]))*Math.pow(10,String(scrollY).length-1) ;
    if(scrollIndex[scrollY]){
      loadImage(scrollIndex[scrollY])
    }
    while(indexLength){
      indexLength-=1;
      if(scrollY> scrollIndices[indexLength]) {
        loadImage(scrollIndex[scrollIndices[indexLength]])
      }
    }
  });

  var exitIntent = new TDG.ExitIntent($('.js-exitIntent'));

  setTimeout( function() {
    $(document).on('mouseleave', exitIntent.init);
  }, 3000);


  /**
   * Subscription form event handling
   */
  $(el.formBtn).click(TDG.subscribeSubmit);

  var hideMagicBox = function () {
    TDG.toggleOverlay();
    el.$magicBox.removeClass('show');
  };

  el.$magicBoxClose.click(hideMagicBox);

  $(document).keydown(function (event) {
    if (event.which == TDG.ascii.ESCAPE) {
      hideMagicBox();
    }
  });


  $('.js-mob-menu').on("click, touchstart",function(){

    if($(this).hasClass("open")){
      $(this).removeClass("open");
      el.$mobileNavs.removeClass("open");
    } else {
      $(this).addClass("open");
      el.$mobileNavs.addClass("open");
    }

  })


  /**
   * @summary - Autocomplete handling
   */
  el.$autoSearch.autocomplete({
    serviceUrl : '/autocomplete',
    minChars: 2,
    paramName : 'token',
    autoSelectFirst : true,
    appendTo : '.search-box',
    triggerSelectOnValidInput : false,
    onSearchComplete : function(query, results) {
      $('.search-box').removeClass('loading');
      dataLayer.push({
        event: 'autoSearch',
        autoSearchInput : $(this).val()
      });
    },
    onSelect : function(suggestion) {
      $(this).val(suggestion.data.name);
      if(suggestion.data.url){
        location.href= location.protocol + '//'+ location.host + suggestion.data.url;
      }

    },
    onSearchStart : function() {
      $('.search-box').addClass('loading');
    },
    onSearchError : function() {console.log("error")},
    beforeRender : function(container, suggestions) {
      var el = $('<div>'), val= $(this).val();
      el.html('<a href="/search?query=' + val + '">More results</a>');
      el.addClass('search-link');
      container.append(el);
    },
    formatResult: function (suggestion, currentValue) {
      var cls = suggestion.data.model + '_';
      return '<div>'+ suggestion.value +'<div class="model '+cls+'">'+suggestion.data.model +'</div></div>';

    },

    transformResult: function(response, query) {
      response = JSON.parse(response);
      var results = [];
      if(response.error) {
        results.push({value: response.message, data: {}});
      } else {
        $.each(response.result.search_result, function (index, dataItem) {
          results.push({value: dataItem.name, data: dataItem});
        })
      }

      return { suggestions: results};
    }
  });

  //Geo location code starts here
  var expireDays = 30, positionString,
      /**
       * @desc set the source in the cookie for future use
       */
      setPosition = function(location) {
        positionString=  location.latitude + '~' + location.longitude;
        //set cookie for 30 days
        TDG.utils.createCookie("position",positionString, expireDays);

        $.ajax({
          url: TDG.urls.SET_LOCATION,
          data: positionString,
          method: 'POST',
          success : function(response) {

          }, error : function() {

          }
        });


      },
      geoLocationFallback = function() {
        // fallback api if geo location is not supported
//                      geoip2.city(function(location) {
//                          setPosition(location.location)
//                      }, function() {
//                          //error callback
//                      })
      }

  function displayPosition(position) {
    setPosition(position.coords)
  }

  function displayError(error) {
//              var errorsCodes = {
//                  1: 'Permission denied',
//                  2: 'Position unavailable',
//                  3: 'Request timeout'
//              };
    geoLocationFallback();

  }
  //if(navigator.geolocation && !TDG.utils.readCookie('position')){
  //  // get the location and set cookie
  //  var timeoutVal = 10 * 1000 * 1000;
  //  navigator.geolocation.getCurrentPosition(
  //      displayPosition,
  //      displayError,
  //      { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
  //  );
  //} else {
  //  geoLocationFallback();
  //}
  //Geo location code ends
})();



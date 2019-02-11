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
  SEARCH_PRODUCT : '/search-product',
  LOAD_TOURS : '/load-tours',
  GET_ITINERARY_QUOTE : '/itinerary/getquote',
  BOOK_TRIP : '/itinerary/book',
  PRODUCT_BOOKING : '/product/book', // product query
  ADD_TO_BOOK : '/add-to-book', // add to cart
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
    //$body.addClass('noscroll');
  } else {
    $overlay.addClass('hide');
    //$body.removeClass('noscroll');
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
        TDG.utils.createCookie('subscriber', 'true', 30)
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

  var happyObject = {};

  var _self = this, $close = $el.find('.js-closeIntent'), $response = $el.find('.js-response'), $yesBlock = $el.find('.js-yes'),   $noBlock = $el.find('.js-no'), $firstBlock  = $el.find('.js-first'), $done  = $el.find('.js-done'),
      methods= {};

  methods.recordResponse = function() {
    $firstBlock.hide();
    happyObject.happy = $(this).data(constants.dataAttr);
    happyObject.comment = $('.js-comment').val() || $(this).data(constants.dataAttrComment);

    if(happyObject.happy){
      $yesBlock.removeClass('hide');
    } else {
      $noBlock.removeClass('hide');
    }
  };

  methods.closeIntent = function(){
    _self.closeIntent();
  };

  methods.sendResponse = function() {
    happyObject.url = location.href;
    happyObject.email = $el.find('input.yes-email').val() || $el.find('input.no-email').val();

    $.ajax({
      method: 'POST',
      data: happyObject,
      url: TDG.urls.INTENT_RESPONSE,
      success : function() {
        _self.closeIntent();
      }, error : function() {
        _self.closeIntent();
      }
    });
  };

  $response.click(methods.recordResponse);
  $done.click(methods.sendResponse);
  $close.click(methods.closeIntent);

  this.showIntent = function() {
   $el.addClass(TDG.domClass.OPEN);

  };

  this.closeIntent = function() {
    $el.removeClass(TDG.domClass.OPEN);
  };

  this.init = function(e) {
    if( e.clientY < 0  && !TDG.utils.readCookie(constants.cookie)) {
      TDG.utils.createCookie(constants.cookie, 'recorded', 1);
      setTimeout( function() {
        _self.showIntent();
      }, 500);

    }
  }
};


(function() {
  var el = {
    $planner : $('.planner'),
    $socialShare : $('.social-share'),
    $tripAd : $('.trip-ad'),
    $closePlanner : $('.planner .close'),
    $gear : $('.gear'),
    $lazyImages : $('.img-lazy'),
    formBtn      : '.js-getSubscription',
    $autoSearch : $('.js-autoSearch'),
    $typeAhead : $('.js-typeAhead '),
    $overlay :  $('.fixed-overlay'),
    $magicBox: $('.magic-box'),
    $getQuote: $('.js-getQuote'),
    $magicBoxClose: $('.magic-box .js-close')
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
    if(scrollY >500 ){
      el.$planner.addClass('show');
      el.$socialShare.addClass('open');
      el.$tripAd.addClass('open');
    } else {
      el.$planner.removeClass('show');
      el.$socialShare.removeClass('open');
      el.$tripAd.removeClass('open');
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
    query form submission
   **/

  el.$getQuote.click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    var user ={};
    var $btn_ref = $(this);
    debugger;
    el.$form = $btn_ref.parents('form');
    user.slug = $(el.$form.find('[name=slug]')).val();
    user.mobile = $(el.$form.find('[name=mobile]')).val();
    user.comment = $(el.$form.find('[name=comment]')).val();
    user.email = $(el.$form.find('[name=email]')).val();

    //if (!$btn_ref.hasClass('disabled') && user.email) {
    if (!$btn_ref.hasClass('disabled') && user.mobile && user.mobile.length ===10) {
      $btn_ref.addClass('disabled');

      $.ajax({
        url: TDG.urls.PRODUCT_BOOKING,
        method: 'POST',
        data: user,
        success: function (response) {
          $('<div class="text-center"> We will reach you soon </div>').insertAfter(el.$form);
        },
        error: function (err) {
          $('<div class="text-center"> Something is wrong </div>').insertAfter(el.$form);
        }
      });
    }
  });



  /**
   * Subscription form event handling
   */
  $(el.formBtn).click(TDG.subscribeSubmit);

  var hideMagicBox = function () {
    el.$overlay.addClass('hide');
    el.$magicBox.removeClass('show');
  };

  el.$magicBoxClose.click(hideMagicBox);

  $(document).keydown(function (event) {
    if (event.which == TDG.ascii.ESCAPE) {
      hideMagicBox();
    }
  });


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
    },
    onSelect : function(suggestion) {
      $(this).val(suggestion.data.name);
      if(suggestion.data.url){
        location.href= location.protocol + '//'+ location.host + suggestion.data.url;
      }

    },
    onSearchStart : function() {
      $('.search-box').addClass('loading');
      dataLayer.push({
        event: 'autoSearch',
        autoSearchInput : $(this).val()
      });

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

  el.$gear.on('click', function() {
    el.$planner.toggleClass(TDG.domClass.OPEN)
  });
  el.$closePlanner.on('click', function() {
    el.$planner.removeClass(TDG.domClass.OPEN)
  });

  el.$autoSearch.on({
    focus: function() {
      el.$typeAhead.addClass(TDG.domClass.SHOW)
    },
    blur: function(event) {
      el.$typeAhead.removeClass(TDG.domClass.SHOW)
    },
    keydown:  function() {
      if ($(this).val()) {
        el.$typeAhead.removeClass(TDG.domClass.SHOW)
      } else {
        el.$typeAhead.addClass(TDG.domClass.SHOW)
      }
    }
  })
  $('.js-typeAhead a').mousedown(function() {
    window.location.href= $(this).attr('href')
  })

})();



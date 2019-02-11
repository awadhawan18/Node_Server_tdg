/**
 * Created by Himanshu wolf on 29/12/15.
 */

(function(window, document, $) {

  var el = {
    $body : $('body'),
    $actionHeader : $('.action-block'),
    $glider: $(".js-glide"),
    $galleryOpen : $('.js-openGallery'),
    $weather : $('.js-temperature'),
    $wishlist : $('.js-wishlist'),
    $loginForm : $('.js-login'),
    $openNearBy : $('.js-openNearBy'),
    $activityList : $('.js-activityList'),
    $loadMap : $('.js-loadMap')
      }, hasImagesLoaded = false;

  $.ajax({
    url: TDG.urls.WEATHER + '?lat=' + TDG.location.lat + '&lng=' + TDG.location.lng,
    method: 'GET',
    success: function (response) {
      el.$weather.html(response);
    },
    error: function (err) {
    }
  });

  var addToWishList = function(ref) {
    $.ajax({
      url: TDG.urls.WISHLIST + '?location=' + TDG.location_id,
      method: 'POST',
      success: function (response) {
        ref.addClass('filled');
      },
      error: function (err) {
      }
    });
  };

  //if(el.$glider) {
  //
  //  el.$glider.glide({
  //    type: 'slider',
  //    paddings: "20%",
  //    autoplay: 2000,
  //    hoverpause: false,
  //    animationTimingFunc: "ease-out",
  //    animationDuration: 400
  //  });
  //
  //  el.$galleryOpen.click(function () {
  //    el.$glider.toggleClass(TDG.domClass.OPEN)
  //  })
  //};

  el.$body.on({
    mouseenter: function() {
      var info = document.createElement('div');
      $(this).addClass('show');
      info.className = 'info-window';
      info.innerHTML = $(this).data('title');
      $(this).append(info);
    },
    mouseleave: function() {
      $(this).find('.info-window').remove();
      $(this).removeClass('show');
    }
  }, '.map-marker');

  el.$wishlist.click(function() {
    var $this = $(this),
    isLoggedIn = $this.data('role');
    if(isLoggedIn != 'undefined') {
      addToWishList($this);
    } else {

      TDG.toggleOverlay();
      el.$loginForm.addClass('show');
    }

  });
  el.$openNearBy.click(function() {
    $('.near-by').addClass(TDG.domClass.OPEN);
    $(this).hide();
  });

  el.$loadMap.click(function() {
    TDG.initializeMap('map-canvas', showMarkers, {maxZoom: 16, zoom: 5}, true);
  })

  $(window).on('scroll', function() {
    if(window.scrollY >327) {
      el.$actionHeader.addClass('fixed');
      !hasImagesLoaded && TDG.lazyLoadImages(el.$body);
      hasImagesLoaded = true;
    } else {
      el.$actionHeader.removeClass('fixed');
    }
  })


})(window, document, jQuery);

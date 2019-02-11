/**
 * Created by Himanshu wolf on 19/05/16.
 */


(function (window, document, $) {
  var el = {
    formBtn: '.js-getQuote',
    $startDate    : $('.js-startDate'),
    $bookBtn : $('.js-book'),
    $bookStatus : $('.js-bookStatus'),
    $bookingCard : $('.booking-card'),
    $travellersCount : $('.js-count'),
    $quantityIcon : $('.js-qIcon'),
    $quantity : $('.js-quantity'),
    $total : $('.js-total'),
    $discount : $('.js-discount'),
    $showMore : $('.js-showMore'),
    $vendorTab : $('.js-vendorTab'),
    $offerPrice: $('.js-offer'),
    $basePrice : $('.js-base'),
    $offerText : $('.js-desc')
  }, user = {};

/*----------------------------------------------------------------------------------------------------------------------
      Price and Booking Card Change Handling
----------------------------------------------------------------------------------------------------------------------*/

  var displayPriceUpdate = function(offerPrice, basePrice, offerText) {
    el.$offerPrice.countTo({from :TDG.product.price, to: offerPrice, onComplete: function() {
      el.$offerPrice.text('₹' + offerPrice);
    }});
    el.$basePrice.text('₹' + basePrice );
    el.$discount.text('₹' + (basePrice - offerPrice)+ ' ');
    el.$offerText.text('('+offerText+')');
    el.$total.text(offerPrice*parseInt(el.$travellersCount.val()));
  };

  var priceManager = function() {

    // elements to be affected
    var els = {
      $priceMenu : $('.js-priceMenu'),
      $priceRequest : $('.js-priceRequest'),
      $priceOptions : $('.js-priceOptions'),
      $factor : $('.js-priceFactor'),
      $date : $('.js-priceFactor[name="start_date"]'),
      $vendor : $('.js-priceFactor[name="vendor"]:checked'),
      $travellers : $('.js-priceFactor[name="travellers"]')
    };


    /**
     * Create the Variant List
     * @param prices
     */
    var createPriceOptions = function(prices) {
      var html = '<ul class="price-options list">';

      for(var i=0; i < prices.length; i++){
        html += '<li data-price="'+prices[i].id+'"data-offer="'+prices[i].offer_price+'"data-advance="'+prices[i].advance+'" data-base="'+prices[i].base_price+'" data-text="'+prices[i].offer_price_text+'">₹' + prices[i].offer_price + ' for ' +prices[i].offer_price_text + '</li>';
      }
      html += '</ul>';

      els.$priceOptions.html(html);
      els.$priceMenu.addClass(TDG.domClass.SHOW)
    };

    var updateBookingCard = function(priceObj) {
      TDG.productPrice = priceObj.offer_price;
      var newStartDate = new Date(priceObj.travel_start_date);
      if(TDG.defaultDate.getTime() < newStartDate.getTime()) {
        els.$date.datepicker('setStartDate', newStartDate);
        els.$date.datepicker('setEndDate', new Date(priceObj.travel_end_date));
      }
      if (els.$date.datepicker('getDate').getTime < newStartDate.getTime() ) {
        els.$date.datepicker('setDate', new Date(priceObj.travel_start_date));
      }

      displayPriceUpdate(priceObj.offer_price, priceObj.base_price, priceObj.offer_price_text);
    };

    var exceptionHandler = function(doAnimation) {
      els.$priceMenu.addClass('hide');
      els.$priceRequest.removeClass('hide');
      el.$bookBtn.hide();
      if(doAnimation){
        $('html, body').animate({
          scrollTop: $("#queryForm").offset().top
        }, 1000);
      }
    }



    els.$factor.on('change', function() {
      if(el.$bookingCard.hasClass('loading')){
        return false;
      }
      els.$vendor = $('.js-priceFactor[name="vendor"]:checked');

      if(!els.$vendor.val()){
        return false;
      }

      el.$bookingCard.addClass('loading');
      TDG.product.updateProduct('', '', '', els.$date.val(), els.$travellers.val(), {id:els.$vendor.data('pol'), code: els.$vendor.val()});

      $.ajax({
        url: TDG.urls.GET_DEAL,
        method: 'post',
        data: TDG.product.getPricingFactors(),
        success: function (response) {
          var prices =response.result.prices, showPrice;
          if(prices.length){
            showPrice = prices[0];

            prices.length> 1 && createPriceOptions(prices);

            updateBookingCard(prices[0]);
            TDG.product.updateProduct(showPrice.offer_price, showPrice.id, showPrice.advance, '', '', '', prices);
            TDG.product.updateProductCache();
            TDG.Analytics.productDetails(TDG.product);
            els.$priceMenu.removeClass('hide');
            els.$priceRequest.addClass('hide');
            el.$bookBtn.show();
          } else {
            exceptionHandler(true);
          }
          el.$bookingCard.removeClass('loading');
        },
        error: function (err) {
          exceptionHandler(true);
          el.$bookingCard.removeClass('loading');

        }
      });
    });

    $('body').on('click', '.js-priceOptions li', function() {
      var pricePol = $(this).attr('data-price'), offerText = $(this).attr('data-text'), offerPrice = $(this).attr('data-offer'), advance = $(this).attr('data-advance'), basePrice = $(this).attr('data-base');

      var priceObj = TDG.product.getPriceObj(pricePol);
      el.$bookingCard.addClass('loading');

      var newStartDate = new Date(priceObj.travel_start_date);
      if(TDG.defaultDate.getTime() < newStartDate.getTime()) {
        els.$date.datepicker('setStartDate', newStartDate);
        els.$date.datepicker('setEndDate', new Date(priceObj.travel_end_date));
      }
      if (els.$date.datepicker('getDate').getTime < newStartDate.getTime() ) {
        els.$date.datepicker('setDate', new Date(priceObj.travel_start_date));
      }
      displayPriceUpdate(offerPrice, basePrice, offerText);
      TDG.product.updateProduct(offerPrice, pricePol,advance, '', '', '');
      TDG.product.updateProductCache();
      TDG.Analytics.productDetails(TDG.product);
      el.$bookingCard.removeClass('loading');
    });

  };

  var handleVendorChange = function() {
    el.$vendorTab.removeClass(TDG.domClass.SELECTED);
    $(this).addClass(TDG.domClass.SELECTED);
    $('.js-vendorFactor').removeClass(TDG.domClass.SHOW)
    $('.js-vendorFactor[data-vendor="'+ $(this).data('pol')+'"]').addClass(TDG.domClass.SHOW)
    $('.js-moreFilters').addClass(TDG.domClass.SHOW);
  };


  var groupSizeManager = function() {
    var $this = $(this), quantity = parseInt(el.$travellersCount.val());
    if($this.attr('data-type') === 'plus') {
      quantity +=1;
      el.$quantity.text(quantity);
      el.$travellersCount.val(quantity);
    } else {
      if(quantity ===1) {
        return false;
      }
      quantity -=1;
      el.$quantity.text(quantity);
      el.$travellersCount.val(quantity);
    }
    el.$travellersCount.trigger('change');
    el.$total.text(TDG.product.getPrice()*quantity);

  };// booking card handler ends


/*----------------------------------------------------------------------------------------------------------------------
      Query Submit Handling
----------------------------------------------------------------------------------------------------------------------*/


  var querySubmit = function (event) {
    event.preventDefault();
    event.stopPropagation();

    var $btn_ref = $(this), email_ref;

    el.$form = $btn_ref.parents('form');

    email_ref = $(el.$form.find('[name="email"]'));

    user.slug = $(el.$form.find('[name=slug]')).val();
    user.name = $(el.$form.find('[name=username]')).val();
    user.mobile = $(el.$form.find('[name=phone]')).val();
    user.start_date = $(el.$form.find('[name=start_date]')).val();
    user.comment = $(el.$form.find('[name=comment]')).val();

    if (email_ref && email_ref.val()) {
      user.email = email_ref.val();
    }
    if (!$btn_ref.hasClass('disabled')) {
      $btn_ref.addClass('disabled');

      $.ajax({
        url: TDG.urls.PRODUCT_BOOKING,
        method: 'POST',
        data: user,
        success: function (response) {
          $('<div> We will contact you shortly </div>').insertAfter(el.$form);
          $btn_ref.removeClass('disabled')
        },
        error: function (err) {
          $('<div> Something is wrong </div>').insertAfter(el.$form);
          $btn_ref.removeClass('disabled')
        }
      });
    }
  }; // Query Submit handler ends

/*----------------------------------------------------------------------------------------------------------------------
         Booking Button Handler
----------------------------------------------------------------------------------------------------------------------*/

  var handleBookingBtn = function() {
    if(!$('.js-priceFactor[name="vendor"]:checked').val()){
      el.$bookStatus.html('Please Choose Seller');
      return false;
    }
    TDG.Analytics.addToBooking(TDG.product)
    el.$bookStatus.html('Redirecting to Booking page...');
    window.location.href = location.protocol + '//'+ location.host + '/booking';
  };


/*----------------------------------------------------------------------------------------------------------------------
 Common UI
 ----------------------------------------------------------------------------------------------------------------------*/

  var loadTruncateText = function() {
    TDG.lazyLoadImages($('.js-content'));
    $(this).parents('.js-content').addClass(TDG.domClass.OPEN)
  };

  $(".glide").glide({
    type: 'carousel',
    paddings: "0",
    autoplay: 3000,
    hoverpause: false,
    animationTimingFunc: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
    animationDuration: 500
  });

  el.$startDate.datepicker({
    container: '.date-container',
    orientation: 'bottom',
    toggleActive: true,
    autoclose: true
  });

  el.$startDate.datepicker('setStartDate', TDG.defaultDate);



/*----------------------------------------------------------------------------------------------------------------------
 Page Initialisation
----------------------------------------------------------------------------------------------------------------------*/

  var init = function(){

    priceManager();

    // event Manager

    el.$quantityIcon.click(groupSizeManager);
    el.$vendorTab.click(handleVendorChange);
    el.$showMore.click(loadTruncateText);
    $(el.formBtn).click(querySubmit);
    el.$bookBtn.click(handleBookingBtn);
  };

  init();

})(window, document, jQuery);

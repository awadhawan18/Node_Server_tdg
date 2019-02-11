/**
 * Created by Himanshu wolf on 15/12/15.
 */

if(typeof(TDG) === 'undefined') {
  TDG ={};
}
(function() {
  var el = {
    $form : $('.js-hotelSearch form'),
    $locationSearch : $('.js-location'),
    $showRoomBtn : $('.js-showRooms'),
    $room : $('.js-room'),
    $bookStatus : $('.js-bookStatus')
  }

  $('.js-checkin').datepicker({
    container: '.checkin',
    orientation: 'left bottom',
    toggleActive: true,
    autoclose: true,
    setDate: new Date(),
    startDate: '+2d'
  });
  $('.js-checkout').datepicker({
    container: '.checkout',
    orientation: 'left bottom',
    toggleActive: true,
    autoclose: true,
    setDate: new Date(),
    startDate: '+3d'
  });


  el.$form.submit(function(event) {
    event.stopPropagation();
    event.preventDefault();

    var $this = $(this), baseURL, url;

    if($('.js-checkin').val() && $('.js-checkout').val()) {
      baseURL = location.protocol + '//' + location.host + '/stay?location=',
          url = baseURL + el.$locationSearch.attr('data-place') + '&checkin=' + $('.js-checkin').val() + '&checkout=' + $('.js-checkout').val();
      window.location.href = url;
    };
  });

  /**
   * @summary - Autocomplete handling
   */
  el.$locationSearch.autocomplete({
    serviceUrl : '/autocomplete?model=destination',
    minChars: 2,
    paramName : 'token',
    autoSelectFirst : true,
    appendTo : '.place',
    triggerSelectOnValidInput : false,
    onSearchComplete : function(query, results) {
      $('.place').removeClass('loading');
    },
    onSelect : function(suggestion) {
      $(this).val(suggestion.data.name);
      $(this).attr('data-place', suggestion.data.slug)
      el.$form.submit();

    },
    onSearchStart : function() {
      $('.place').addClass('loading');
    },
    onSearchError : function() {console.log("error")},

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
})();

/**
 * Created by Himanshu wolf on 03/24/16.
 */

(function(window, document, $) {

  var  el = {
    $body : $('body'),
    $filterOption : $('.js-filterOption')
  };

  el.$body.on('click', '.js-filterSubmit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    var btn_ref = $(this), form = btn_ref.parents('form'),
        result_ref = $('.js-results');

    if(! btn_ref.hasClass('disabled')){
      btn_ref.addClass('disabled');
      result_ref.toggleClass('inactive');

      var baseURL = location.protocol + '//'+ location.host + location.pathname,
          query_string =  form.serialize();

      History.pushState({}, document.title, baseURL + '?'+ query_string);

      $.ajax({
        url: baseURL + '/filter?' + query_string,
        dataType: 'html',
        success : function(response) {
          btn_ref.removeClass('disabled');
          result_ref.toggleClass('inactive');
          result_ref.html(response);
          el.$filterDrawer.trigger('click');
        }, error : function() {
          btn_ref.removeClass('disabled');
          alert('Something went wrong');
        }
      });
    }
  });

  /**
   * @desc - Handle the click on budget slot filter
   */
  el.$body.on('click', '.js-filterOption', function(event) {
    //var $this = $(this);

    $(this).toggleClass(TDG.domClass.SELECTED);
  });

  el.$body.on('click', 'input[name="filters[]"]', function(event) {
    event.stopImmediatePropagation();
  })

  $(document).ready(function() {
    //if(!TDG.utils.readCookie('instruction') && TDG.destination_count) {
    //  el.$filter.toggleClass(TDG.domClass.OPEN);
    //  setTimeout(function () {
    //    el.$instruction.removeClass('hide');
    //    el.$overlay.removeClass('hide');
    //    el.$dumpOverlay.addClass('dump-overlay');
    //
    //    TDG.utils.createCookie('instruction', 'true', 2);
    //  }, 1000);
    //}

  });


})(window, document, jQuery);

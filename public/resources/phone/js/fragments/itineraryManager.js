/**
 * Created by Himanshu wolf on 29/11/15.
 */

(function (window, document, $) {

  /**
   * @summary - Global user data for itinerary and quotes
   * @type {{}}
   */
  var user = {}, is_quote_displayed= false, selectedActivity = [];

  var sucessCallback1 = function(response) {
    user.id = response.result.quote.id;
    $('<div>' + response.message + '</div>').insertAfter(el.$form);
    fillProgressBar();
    if(!is_quote_displayed) {
      openForm();
    }
  }

  var sucessCallback2 = function (message) {
    $('<div>' + message + '</div>').insertAfter(el.$form);
    user = {};
    hideMagicBox();
  }

  var getQuoteSubmit = function () {

    var $btn_ref = $(this), email_ref;

    el.$form = $btn_ref.parents('form');
    email_ref = $(el.$form.find('[name="email"]'));
    user.source = $(el.$form.find('[name="source"]')).val();
    user.destination = $(el.$form.find('[name="destination"]')).val();
    user.route_id = $(el.$form.find('[name="routeId"]')).val();
    user.activities = selectedActivity;

    if (email_ref && email_ref.val()) {
      user.email = email_ref.val();
    }
    if (!$btn_ref.hasClass('disabled') && user.email) {
      $btn_ref.addClass('disabled');
      runAjax(user, 'POST', sucessCallback1);
    }
  };

  var userInfo = function (event) {
    event.preventDefault();
    event.stopPropagation();
    el.$form = $(this).parents('form');

    user.name = $(el.$form.find('[name=username]')).val();
    user.mobile = $(el.$form.find('[name=phone]')).val();
    user.travellers = $(el.$form.find('[name=travellers]')).val();
    user.budget = $(el.$form.find('[name=budget]')).val();
    user.start_date = $(el.$form.find('[name=startdate]')).val();
    user.comment = $(el.$form.find('textarea[name=comment]')).val();

    runAjax(user, 'PUT', sucessCallback2);
  };
  var runAjax = function (user, method, callback) {
    $.ajax({
      url: TDG.urls.GET_ITINERARY_QUOTE,
      method: method,
      data: user,
      success: function (response) {
        callback(response);
    },
    error: function (err) {
      $('<div> Something is wrong </div>').insertAfter(el.$form);
    }
    });
  }

  var openContent = function (event) {
    var $this = $(this),
        parent = $this.parent('.itinerary');
    TDG.lazyLoadImages(parent);

    parent.addClass('open');

  };
  var fillProgressBar = function () {
    el.$progressBar.find('.active').addClass('activate');
    setTimeout(function () {
      el.$progressBar.find('.markers').removeClass('active').addClass('complete');
    }, 700)

  };
  var openForm = function () {
    is_quote_displayed = true;
    TDG.toggleOverlay();
    el.$itineraryForm.addClass('show')
  };

  var openActivityControl = function () {
    TDG.toggleOverlay();
    el.$todoList = $(this).parents('.todo-list');
    var items = el.$todoList.find('.activity'),
        htmlString = '';
    items.each(function (index) {
      var isSelected = index == 0 ? 'selected' : '';
      htmlString += '<div class="col-sm-4 activity ' + isSelected + '">';
      htmlString += $(this).html();
      htmlString += '</div>';
    });

    el.$activityMagicBox.find('.js-magicContent').html(htmlString);
    el.$activityMagicBox.addClass('show')
  };

  var selectActivity = function (event) {
    event.stopPropagation();
    var $this = $(this);
    $this.parents('.activity').toggleClass(TDG.domClass.SELECTED);

  };

  var hideMagicBox = function () {
    TDG.toggleOverlay();
    el.$magicBox.removeClass('show');
  };

  var refreshActivities = function () {
    selectedActivity = [];
    el.$todoList.find('.js-activityTile').addClass('squeeze');
    $('.activity-list .activity.selected').each(function () {
      var slug = $(this).find('[name="selectedActivity"]').val();

      el.$todoList.find('.' + slug).removeClass('squeeze');
      selectedActivity.push(slug)
    });
    TDG.toggleOverlay();
    el.$activityMagicBox.removeClass('show');
  };


  var el = {
    formBtn: '.js-getQuote',
    routeBlock: '.js-routeBlock',
    $magicBox: $('.magic-box'),
    $magicBoxClose: $('.magic-box .js-close'),
    $filterDrawer: $('.js-filterDrawer'),
    $progressBar: $('.js-progress'),
    $activityTile: $('.js-activityTile'),
    $activityControl: $('.js-activityControl'),
    $activityMagicBox: $('.js-activityList'),
    $activityDone: $('.js-activityList .btn-primary'),
    $itineraryForm: $('.js-quoteForm'),
    $quoteSubmit: $('.js-quoteForm .btn-primary')
  };

  el.$filterDrawer.on('click', function () {
    $('.filter').toggleClass(TDG.domClass.OPEN);
  });

  $('.js-startDate').datepicker({
    container: '.date-container',
    orientation: 'left bottom',
    toggleActive: true,
    autoclose: true
  });


  /**
   * Subscription form event handling
   */
  $(el.formBtn).click(getQuoteSubmit);
  $(el.routeBlock).click(openContent);

  $(el.$activityControl).click(openActivityControl);
  $(el.$activityDone).on('click', refreshActivities);
  $(el.$quoteSubmit).on('click', userInfo);

  $(el.$activityMagicBox).on('click', '.activity', function () {
    $(this).find('.js-check input').trigger('click')
  });
  $(el.$activityMagicBox).on('click', '.js-check input', selectActivity);

  //$(window).on('scroll', function() {
  //  if(is_quote_ready && !is_quote_displayed) {
  //    openForm();
  //  }
  //});


})(window, document, jQuery);

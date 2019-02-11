/**
 * Created by Himanshu wolf on 20/07/15.
 */

(function(window, document, $) {
  var el = {
    $body : $('body'),
    $scrollBtn: $('.js-scroll'),
    $startDate    : $('.js-startDate'),
    $interestItem : $('.js-interestItem'),
    $fields : $('.js-field'),
    $travelTime : $('.js-field.travel-time'),
    $submitBtn : $('.js-preferenceSubmit'),
    $roadMap : $('.js-roadMap'),
    //$feelingBtn : $(".feeling-btn" ),
    //$feelings: $('.js-feelings'),
    //$weeklyData : $('.js-weeklyDestination'),
    //$instruction : $('.instruction'),
    //$instructionFirst : $('.instruction.first'),
    //$instructionSecond : $('.instruction.second'),
    //$instructionThird : $('.instruction.third'),
    $overlay : $('.fixed-overlay'),
    $dumpOverlay: $('.home-inner'),
    $result_ref : $('.js-results'),
    $loader_ref : $('.js-resultLoader')
  }, preferences = {
        traveling_with : 'friends',
        source: 'new-delhi',
        travel_time : '5'
      },
  isInterestFilled = 0, isDateFilled = 0, isDaysFilled = 0, source="new-delhi",
      formStatus=0, FORM_COMPLETE_STATUS = 3, is_Weekly_Requested = true, isHover = false;

  $('input:reset').trigger('click');


  el.$interestItem.click(function(event) {
    var $this = $(this),
        targetCheck = $this.data('target');

    el.$interestItem.removeClass('selected');
    $this.addClass('selected');

    $('[data-name="'+ targetCheck +'"]').trigger('click');
    el.$instructionSecond.trigger('float');
  });

  el.$submitBtn.on('click', function(event) {
    var currMonth, currYear, day, btn_ref = $(this);
    var form = btn_ref.parents('form');


        el.$travelTime.val('5');
        var d = el.$startDate.datepicker('getDate');
        if(d) {
          day = d.getDate();
        } else {
          d = new Date();
          day = d.getDate() + 10;
        }
        currMonth = d.getMonth();
        currYear = d.getFullYear();

        var startDate = new Date(currYear,currMonth,day);
        el.$startDate.datepicker('update', startDate);

      event.preventDefault();
      event.stopPropagation();
      el.$loader_ref.addClass('show');
      $('html, body').animate({
        scrollTop: form.offset().top
      }, 1000);

      btn_ref.addClass('disabled');
      el.$result_ref.toggleClass('inactive');

      loadResults(btn_ref, form);
  });

  el.$travelTime.on('keypress', function(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if(charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
      return false;

    return true;
  });

  el.$fields.on('change keyup', function(event) {
    var selectedInterest = $('[name="traveling_with"]:checked').val();
    var $el_btn = el.$submitBtn.find('button');

    selectedInterest && selectedInterest !== '0' ? isInterestFilled =1: isInterestFilled =0;
    el.$startDate.val() ? isDateFilled =1: isDateFilled =0;
    el.$travelTime.val().length ? isDaysFilled =1: isDaysFilled =0;

    formStatus = (isInterestFilled + isDateFilled + isDaysFilled)/FORM_COMPLETE_STATUS;

    $('.filler').css('width', formStatus*100 + '%');

    if(isDateFilled==1)
        el.$travelTime.focus();

    //if(formStatus === 1) {
    // setTimeout(function() {
    //   $el_btn.removeClass('disabled');
    //   $el_btn.addClass('btn-primary');
    // }, 500)
    //} else {
    //  $el_btn.addClass('disabled');
    //  $el_btn.removeClass('btn-primary');
    //}
  });

  el.$startDate.datepicker({
    container: '.date-container',
    orientation: 'left bottom',
    immediateUpdates: true,
    toggleActive: true,
    startDate: '+1d',
    todayHighlight: true,
    autoclose : true
  });

  var randomizeFeeling = function() {
    var length = $('.feeling-link').length,
        index = Math.floor(Math.random() * length),
        position = -index*50 +5;
    el.$feelings.css('top', position+100 + 'px');
    el.$feelings.css('top', position + 'px');
  }

  setInterval(function() {
    if(isHover) {
      randomizeFeeling();
    }
  }, 2500);

  el.$feelingBtn
      .mouseenter(function() {
        $(this).find('.default').css('visibility', 'hidden');
        randomizeFeeling();
        isHover = true;

      })
      .mouseleave(function() {
        $(this).find('.default').css('visibility', 'visible');
        el.$feelings.css('top', '35px');
        isHover = false;
      });

  window.onload = function() {

    $( ".js-img" ).each(function() {
      var _self = $(this);

      _self.attr('src', _self.data('src'));
    });
  };

  var loadResults = function(btn_ref, form) {
    form = form || btn_ref.parents('form');

    var baseURL = form[0].action,
        url = baseURL.substr(0, baseURL.indexOf('--')) + '--' + source + '?' + form.serialize();

    //History.pushState({}, document.title, url);
    el.$loader_ref.parents('.home-poster').addClass('open');

    $.ajax({
      url: url + '&filter_home=true',
      dataType: 'html',
      success: function (response) {
        btn_ref.removeClass('disabled');
        el.$result_ref.toggleClass('inactive');
        el.$result_ref.html(response);
        el.$loader_ref.removeClass('show');
      }, error: function () {
        btn_ref.removeClass('disabled');
        alert('Something went wrong');
      }
    });
  }

  var getWeeklyDestination = function() {
    is_Weekly_Requested = true;
    var url ='';
    if(TDG.utils.readCookie('cohort') == 'A') {
      url = TDG.urls.WEEKLY_DESTINATION
    } else {
      url = TDG.urls.HOME_FACT
    }

    $.ajax({
      url: url,
      success : function(response) {
        el.$weeklyData.html(response);
      }, error : function() {
        console.log('Something went wrong');
      }
    });
  };

  $(window).on('scroll', function() {

    if(window.scrollY >300) {
      el.$roadMap.addClass('display');
      TDG.lazyLoadImages(el.$body);
    }
  });

  //$(document).ready(function() {
  //  el.$instructionFirst.trigger('float');
  //});
  //
  //el.$startDate.on('change keyup', function() {
  //  el.$instructionThird.trigger('float');
  //});

  el.$result_ref('click', '.js-source', function(event) {
    event.stopPropagation();
    var $this= $(this);

    source = $this.data('source');
    el.$source.find('span').text($this.text());
    $('input[name="source"]').val(source);
  });

  //var openOverlay = function() {
  //  el.$overlay.removeClass('hide');
  //  el.$dumpOverlay.addClass('dump-overlay');
  //  el.$body.addClass('noscroll');
  //}
  //
  //el.$instructionFirst.on('float', function() {
  //  if (!TDG.utils.readCookie('instructionOne')) {
  //    setTimeout(function () {
  //      window.scrollTo(0, 0);
  //      el.$instructionFirst.removeClass('hide');
  //      openOverlay();
  //
  //      TDG.utils.createCookie('instructionOne', 'true', 2);
  //    }, 1000);
  //  } else {
  //    removeInstruction();
  //  }
  //});
  //
  //  el.$instructionSecond.on('float', function() {
  //    if(!TDG.utils.readCookie('instructionTwo') && isInterestFilled && !isDateFilled) {
  //      window.scroll(0, 0);
  //      el.$instruction.addClass('hide');
  //      el.$instructionSecond.removeClass('hide');
  //      openOverlay();
  //
  //      TDG.utils.createCookie('instructionTwo', 'true', 2);
  //    } else {
  //      removeInstruction();
  //    }
  //
  //  });
  //  el.$instructionThird.on('float', function() {
  //    if(!TDG.utils.readCookie('instructionThird') && isInterestFilled && isDateFilled && !isDaysFilled) {
  //      window.scroll(0, 0);
  //      el.$instruction.addClass('hide');
  //      el.$instructionThird.removeClass('hide');
  //      openOverlay();
  //
  //      TDG.utils.createCookie('instructionThird', 'true', 2);
  //    } else {
  //      removeInstruction();
  //    }
  //
  //});
  //var removeInstruction = function(event) {
  //    el.$instruction.addClass('hide');
  //    el.$overlay.addClass('hide');
  //    el.$dumpOverlay.removeClass('dump-overlay');
  //    el.$body.removeClass('noscroll');
  //};
  //var handleKeyDown = function(event) {
  //  if(event.keyCode === TDG.ascii.ESCAPE){
  //    removeInstruction();
  //  }
  //};

  var scrollToNext = function(event) {
    var $target = $($(this).data('target'));

    $('html, body').animate({
      scrollTop: $target.offset().top
    }, 1000);
  }


  el.$scrollBtn.on('click', scrollToNext);

  el.$body.on('keydown', handleKeyDown);
  el.$body.on('click', removeInstruction);
  el.$travelTime.on('keydown', removeInstruction);



})(window, document, jQuery);

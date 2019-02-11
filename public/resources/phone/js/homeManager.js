/**
 * Created by Himanshu wolf on 20/07/15.
 */

(function(window, document, $) {
  var el = {
    $body : $('body'),
    $searchIcon : $('.js-searchIcon'),
    $startDate    : $('.js-startDate'),
    $interestItem : $('.js-interestItem'),
    $fields : $('.js-field'),
    $travelTime : $('.js-field.travel-time'),
    $submitBtn : $('.js-preferenceSubmit'),
    $roadMap : $('.js-roadMap'),
    $feelingBtn : $(".feeling-btn" ),
    $feelings: $('.js-feelings'),
    $weeklyData : $('.js-weeklyDestination'),
    $instruction : $('.instruction'),
    $instructionFirst : $('.instruction.first'),
    $instructionSecond : $('.instruction.second'),
    $instructionThird : $('.instruction.third'),
    $overlay : $('.fixed-overlay'),
    $dumpOverlay: $('.home-inner')

  },
  isInterestFilled = 0, isDateFilled = 0, isDaysFilled = 0,
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
    var currMonth, currYear, day;
    if($(this).find('button').hasClass('disabled')) {

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

      return false;
    }
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

    if(formStatus === 1) {
     setTimeout(function() {
       $el_btn.removeClass('disabled');
       $el_btn.addClass('btn-primary');
     }, 500)
    } else {
      $el_btn.addClass('disabled');
      $el_btn.removeClass('btn-primary');
    }
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

    if(!is_Weekly_Requested) {
      getWeeklyDestination();
    }

    if(window.scrollY >300) {
      el.$roadMap.addClass('display');
    }
  });

  $(document).ready(function() {
    el.$instructionFirst.trigger('float');
  });

  el.$startDate.on('change keyup', function() {
    el.$instructionThird.trigger('float');
  });

  var openOverlay = function() {
    el.$overlay.removeClass('hide');
    el.$dumpOverlay.addClass('dump-overlay');
    el.$body.addClass('noscroll');
  }

  el.$instructionFirst.on('float', function() {
    if (!TDG.utils.readCookie('instructionOne')) {
      setTimeout(function () {
        window.scrollTo(0, 0);
        el.$instructionFirst.removeClass('hide');
        openOverlay();

        TDG.utils.createCookie('instructionOne', 'true', 2);
      }, 1000);
    } else {
      removeInstruction();
    }
  });

    el.$instructionSecond.on('float', function() {
      if(!TDG.utils.readCookie('instructionTwo') && isInterestFilled && !isDateFilled) {
        window.scroll(0, 0);
        el.$instruction.addClass('hide');
        el.$instructionSecond.removeClass('hide');
        openOverlay();

        TDG.utils.createCookie('instructionTwo', 'true', 2);
      } else {
        removeInstruction();
      }

    });
    el.$instructionThird.on('float', function() {
      if(!TDG.utils.readCookie('instructionThird') && isInterestFilled && isDateFilled && !isDaysFilled) {
        window.scroll(0, 0);
        el.$instruction.addClass('hide');
        el.$instructionThird.removeClass('hide');
        openOverlay();

        TDG.utils.createCookie('instructionThird', 'true', 2);
      } else {
        removeInstruction();
      }

  });
  var removeInstruction = function(event) {
      el.$instruction.addClass('hide');
      el.$overlay.addClass('hide');
      el.$dumpOverlay.removeClass('dump-overlay');
      el.$body.removeClass('noscroll');
  };
  var handleKeyDown = function(event) {
    if(event.keyCode === TDG.ascii.ESCAPE){
      removeInstruction();
    }

  };

  el.$searchIcon.on('click', function() {
    $('.search-col').toggleClass('show');
  });
  el.$body.on('keydown', handleKeyDown);
  el.$body.on('click', removeInstruction);
  el.$travelTime.on('keydown', removeInstruction);



})(window, document, jQuery);

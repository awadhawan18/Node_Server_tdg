/**
 * Created by Himanshu wolf on 01/11/15.
 */

(function(window, document, $) {

  var  el = {
    $body : $('body'),
    $destPoint : $('.js-destPoint'),
    $tab : $('.js-tab'),
    $pullIcon : $('.js-pull'),
    $filterDrawer: $('.js-filterDrawer'),
    $filter : $('.filter'),
    $filterClose : $('.js-filterClose'),
    $filterField : $('.js-filterField'),
    $budgetSlot : $('.js-budgetSlot'),
    $filterSubmit : $('.js-filterSubmit'),
    $overlay : $('.fixed-overlay'),
    $dumpOverlay: $('.dest-cont'),
    $source : $('.js-source'),
    $sourceList : $('.js-source li'),
    $loader : $('.js-loader'),
    $tileList : $('.js-tileList'),
    $scrollIcon : $('.js-scroll')
  };
  var listScroll = 0;
  /**
   * @callback on tab click
   * @summary - add selected class and show tab content
   */
  el.$body.on('click', '.js-tab', function() {
    var $this = $(this);
    var targetId = $this.data('target'), $target = '',
        itemName = $this.data('item');

    if(!$this.hasClass(TDG.domClass.SELECTED)) {
      el.$destPoint.text(itemName);
      el.$tab.removeClass(TDG.domClass.SELECTED);
      $this.addClass(TDG.domClass.SELECTED);

      $('.js-tabContent').removeClass(TDG.domClass.SELECTED);
      $target = $('.js-tabContent[data-target="'+ targetId +'"]');
      $target.addClass(TDG.domClass.SELECTED);
      TDG.lazyLoadImages($target);
    }


  });

  $(window).on('scroll', function() {
    el.$filter.removeClass(TDG.domClass.OPEN);
    if(! ($(document).height()-$(window).height() >400)) {
      return ;
    };
  });

  el.$filterClose.on('click', function() {
    el.$filter.removeClass(TDG.domClass.OPEN);
  })

  el.$body.on('click', '.js-scroll',  function() {
    var $this = $(this), direction = $this.data('direction'),
        tilesWidth = el.$tileList.find('li').length* 200;

    if(window.outerWidth > tilesWidth ) {
      return;
    }
    if(direction=='left' && listScroll < 0) {
      listScroll += 400;
    }
    if(direction=='right' && tilesWidth + listScroll + 600  > window.outerWidth) {
      listScroll -= 400;
    }

    el.$tileList.css('left', listScroll + 'px');
  })

  el.$filterDrawer.on('click', function() {
    el.$filter.toggleClass(TDG.domClass.OPEN);
  });

  el.$filterField.on('click', function(event) {
    event.stopPropagation();
    $(this).parents('.js-filterItem').toggleClass(TDG.domClass.SELECTED);
  });

  //var removeInstruction = function() {
  //  el.$instruction.addClass('hide');
  //  el.$overlay.addClass('hide');
  //  el.$dumpOverlay.removeClass('dump-overlay');
  //};

  $('.js-startDate').datepicker({
    container: '.date-container',
    orientation: 'left bottom',
    toggleActive: true,
    autoclose : true
  });

  el.$body.on('click', '.js-filterSubmit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    var btn_ref = $(this), form = btn_ref.parents('form'),
    result_ref = $('.js-results');

    if(! btn_ref.hasClass('disabled')){
      btn_ref.addClass('disabled');
      result_ref.toggleClass('inactive');

      var baseURL = location.protocol + '//'+ location.host + location.pathname,
          url = baseURL + '?' + form.serialize();

      History.pushState({}, document.title, url);

      $.ajax({
        url: url + '&filter=true',
        dataType: 'html',
        success : function(response) {
          btn_ref.removeClass('disabled');
          result_ref.toggleClass('inactive');
          result_ref.html(response);
          initTabs();
          el.$filterDrawer.trigger('click');
        }, error : function() {
          btn_ref.removeClass('disabled');
          alert('Something went wrong');
        }
      });
    }
  });
  var initLoader = function() {
    TDG.toggleOverlay();
    var captions = [
        'Saving your preferences',
        'Saving your preferences',
        'Mapping destinations for your preferences',
        'Mapping destinations for your preferences',
        'Finding the matching interests',
        'Finding the matching interests',
        'Filtering all activities',
        'Creating routes from New Delhi',
        'Loading results for your preferences'
    ]
    var scope = {
      $dots : $('.js-dots'),
      $fill : $('.loader-bar .filled'),
      $caption : $(el.$loader.find('.caption')),
      $progress : $(el.$loader.find('.progress-count'))
        }, is_lastDot = 0, width = 20, index =0;

    var interval_reference = setInterval(function() {
      scope.$fill.css('width', width + '%');
      width += Math.random()*10;
      if(width >=100)  {
        width= 100;
        el.$body.trigger('done');
      }
      scope.$progress.text('( '+Math.round(width) + '% )' );

      if(index< captions.length)
        scope.$caption.text(captions[index]);
      index +=1;
      if(is_lastDot !=5) {
        is_lastDot +=1;
        scope.$dots.append('.');
      } else {
        is_lastDot =0;
        scope.$dots.text('');
      }

    }, 200);

    el.$body.on('done', function() {
      clearInterval(interval_reference);
      el.$loader.remove();
      $('.js-results').removeClass('hide');
      TDG.toggleOverlay();
    })
  }



  function initTabs() {
    el.$destPoint = $('.js-destPoint');
    el.$tab = $('.js-tab');
    el.$pullIcon = $('.js-pull');
    el.$tileList = $('.js-tileList');
    listScroll = 0;

  }
  /**
   * @desc - Handle the click on budget slot filter
   */
  el.$body.on('click', '.js-budgetSlot', function() {
    el.$budgetSlot.removeClass(TDG.domClass.SELECTED);
    $(this).addClass(TDG.domClass.SELECTED);
  });

  //$(document).on('click keydown', removeInstruction);

  var sources = [
    { value: 'New Delhi', data: 'new-delhi' },
    { value: 'Mumbai', data: 'mumbai' },
    { value: 'Kolkata', data: 'kolkata' },
    { value: 'Bangalore', data: 'bangalore' }
  ];

  $('.source-fill').autocomplete({
    minChars : 0,
    lookup: sources,
    onSelect: function (suggestion) {
      $(this).siblings('input').val(suggestion.data);
      console.log('You selected: ' + suggestion.value + ', ' + suggestion.data);
    }
  });
  el.$source.click(function(event){
    event.stopPropagation();

    if(el.$filter.hasClass(TDG.domClass.OPEN)){
      return;
    }
    $(this).addClass(TDG.domClass.OPEN)
  });

  el.$sourceList.click(function(event) {
    event.stopPropagation();
    var $this= $(this), source;

    el.$source.removeClass(TDG.domClass.OPEN);
    source = $this.data('source');
    el.$source.find('span').text($this.text());
    $('input[name="source"]').val(source);
    el.$filterSubmit.trigger('click')
  });

  el.$body.on('click', '.js-pull', function(event) {
    $('.dest-cont').toggleClass(TDG.domClass.OPEN)
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

    initLoader();
  });


})(window, document, jQuery);

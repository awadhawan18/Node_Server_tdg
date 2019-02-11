/**
 * Created by Himanshu wolf on 26/12/15.
 */

function TDGPreferences() {

};
TDGPreferences.prototype = {
  constructor: TDGPreferences,
  settings: {
    updateHistory: true
  }
};


/**
 * @summary - Function to collect the values of selected options of a filter
 * @param name - filter name
 * @returns {string} - resultant query string
 */
TDGPreferences.prototype.getAppliedOptions = function(name) {
  var _self = this,
      queryString = '';

  if($("input[name='" + name + "']").length > 0){
    queryString = name + '=';
    $.each($("input[name='" + name + "']:checked"), function(){
      queryString += $(this).val() + '~';
    });
  }
  return queryString ? queryString.substring(0, queryString.length - 1): '';
};

/**
 * @summary - Function to complete query string with all filters
 * @returns {string}
 */
TDGPreferences.prototype.prepareUrl = function() {
  var _self = this,
   url='?', filterTypes = config.static.type;

  for(var i in filterTypes){
    url += _self.getAppliedOptions(filterTypes[i]) + '&';
  }
  return url;
};

TDGPreferences.prototype.loadResults = function(btn_ref) {
  var result_ref = $('.js-results');

  if(! btn_ref.hasClass('disabled')){
    btn_ref.addClass('disabled');
    result_ref.toggleClass('inactive');

    var baseURL = location.protocol + '//'+ location.host + location.pathname,
        url = baseURL + TDG.preferences.prepareUrl();

    console.log(url);
    History.pushState(null, null, url);

    $.ajax({
      url: url,
      dataType: 'html',
      success : function(response) {
        btn_ref.removeClass('disabled');
        result_ref.toggleClass('inactive');
        result_ref.html(response);
      }, error : function() {
        btn_ref.removeClass('disabled');
        alert('Something went wrong');
      }
    });
  }
};



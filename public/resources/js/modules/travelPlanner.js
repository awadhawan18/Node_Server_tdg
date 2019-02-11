/**
 * Created by Himanshu wolf on 02/07/16.
 */

(function() {
  var el = {
    $fields : $('.planner-form .js-field'),
    $planBtn : $('.js-plan'),
    tabContent : '.tab-content'
  }, methods = {};

  methods.toggleSelection = function(event) {
    event.stopPropagation();
    event.preventDefault();
    var $this = $(this);
    var fieldType = $this.attr('data-field');
    $('.js-field[data-field="'+fieldType+'"]').removeClass(TDG.domClass.SELECTED);
    $this.addClass(TDG.domClass.SELECTED)

  };
  methods.buildQuery = function(event) {
      event.stopPropagation();
      event.preventDefault();
      $(this).addClass('disabled');

      var source = $('.js-field.selected[data-field="source"]').attr('data-value'),
          budget = $('.js-field.selected[data-field="budget"]').attr('data-value'),
          traveling_with = $('.js-field.selected[data-field="traveling_with"]').attr('data-value'),
          time = $('.js-field.selected[data-field="time"]').attr('data-value');

      window.location.href = location.protocol + '//'+ location.host + '/find-places/from--' + source + '?traveling_with='+traveling_with+ '&time='+ time + '&budget='+ budget;

  };
  el.$fields.on('click', methods.toggleSelection);
  el.$planBtn.on('click', methods.buildQuery);

})();
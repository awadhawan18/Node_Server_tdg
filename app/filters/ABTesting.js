/**
 * Created by Himanshu wolf on 17/10/15.
 *
 * This module will decide the cohort based on the lifetime cookie
 */

var security = require('../utils/securityUtils');

exports.getCohort = function(req, res) {
  var cohort = 'B',
      cookie_value = security.getLifeCookie(req),
      lt_id = cookie_value && parseInt(cookie_value.slice(-1) , 16);

  if(lt_id < 7) {
    cohort = 'B';
  }
  return cohort;
}

exports.getView = function (view, req, res) {
  var cohort = 'B',
      cookie_value = security.getLifeCookie(req),
      lt_id = cookie_value && parseInt(cookie_value.slice(-1) , 16);

  if(lt_id < 7) {
    cohort = 'B';
  }

  // keep http false to read the cookie on client side for analytics
  res.cookie('cohort', cohort, { maxAge: 900000, httpOnly: false });
  req.session.cohort = cohort;

  return view + cohort;
}

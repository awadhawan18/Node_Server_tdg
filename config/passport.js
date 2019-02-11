/**
 * Created by himanshujain on 07/04/15.
 */

'use strict';


var FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../app/appConfig'),
    urlTemplate = require('../app/constants/urlTemplates'),
    linkManager = require('../app/utils/LinkManager'),
    apiUtil = require('../app/utils/APIUtils');

module.exports = function(passport) {

  /**
   * @desc - Serialize the user id to push into the session
   */
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  /**
   * @desc - Deserialize the user object based on a pre-serialized token
   */
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Use facebook strategy
  passport.use(new FacebookStrategy({
        clientID: config.oAuth.facebook.clientID,
        clientSecret: config.oAuth.facebook.clientSecret,
        callbackURL: config.oAuth.facebook.callbackURL,
        scope : ['public_profile', 'email', 'user_friends'],
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
      },
      function(accessToken, refreshToken, profile, done) {
        // handle user login
        console.log(accessToken);
        console.log(profile);
        if(!profile.emails) {
          done('email-required');
          return;
        }
          var options = {
            url : linkManager.getApiUrl(urlTemplate.LOGIN_OAUTH.url),
            method : urlTemplate.LOGIN_OAUTH.method,
            body : profile
          };
        //done(null, profile);
        apiUtil.httpRequest(options, function(err, data) {
            return done(err, data);
        });
      }
  ));


  //passport.use(new GoogleStrategy({
  //      clientID: config.oAuth.google.clientID,
  //      clientSecret:config.oAuth.google.clientSecret,
  //      callbackURL: config.oAuth.google.callbackURL,
  //      scope: [ 'https://www.googleapis.com/auth/userinfo.profile',
  //        'https://www.googleapis.com/auth/userinfo.email', ],
  //      passReqToCallback   : true
  //    },
  //    function(request, accessToken, refreshToken, profile, done) {
  //      console.log(accessToken);
  //      console.log(profile);
  //      var options = {
  //        headers : {'Authorization': "Token " + accessToken},
  //        url : linkManager.getApiUrl(urlTemplate.FACEBOOK_AUTH.url, {backend: 'google-oauth2'}),
  //        method : urlTemplate.FACEBOOK_AUTH.method,
  //        parseJSON : true
  //      };
  //      apiUtil.httpRequest(options, function(err, data) {
  //        return done(err, data);
  //      });
  //    }
  //));
};

/**
 * Created by Himanshu wolf on 28/04/17.
 * ULD - User Life Data
 */

ULD = function(name, email, mobile, isSaved) {
  this.id = TDG.utils.readCookie('tdg_uld');
  this.userName = name || '';
  this.userEmail = email || '' ;
  this.userMobile = mobile || '';
  this.isSaved = isSaved;
};

ULD.prototype.setUserName = function(userName) {
  this.userName = userName;
  this.updateULD();
  return true;
};

ULD.prototype.setUserEmail = function(userEmail) {
  this.userEmail = userEmail;
  this.updateULD();
  return true;
}
ULD.prototype.setUserMobile = function(userMobile) {
  this.userMobile = userMobile;
  this.updateULD();
  return true;
}

ULD.prototype.setFields = function(name, email, mobile) {
  this.userName = name;
  this.userEmail = email;
  this.userMobile = mobile;
  this.updateULD();
}

ULD.prototype.toJson = function() {
  return JSON.stringify({userName: this.userName, userEmail: this.userEmail, id: this.id, userMobile: this.userMobile, isSaved: this.isSaved});
};


ULD.prototype.updateULD = function() {
  this.sendToGA();
  var uldJson = this.toJson();
  TDG.utils.createCookie('uld', uldJson, 30)
};

ULD.prototype.sendToGA = function() {
  dataLayer.push({
    event: 'user_data',
    userName : this.userName,
    userEmail: this.userEmail,
    userMobile: this.userMobile,
    tdgLTD : this.id
  });
  this.isSaved = true;
}

ULD.prototype.FIELD_CONSTANTS = {
  'userName' : 'username',
  'userEmail' : 'email',
  'userMobile' : 'mobile'
};

(function() {
  var lgud_cookie = TDG.utils.readCookie('uld');
  if(lgud_cookie){
    lgud_cookie = JSON.parse(lgud_cookie);
    lgud.userName = lgud.userName || lgud_cookie.userName;
    lgud.userEmail = lgud.userEmail || lgud_cookie.userEmail;
    lgud.userMobile = lgud.userMobile || lgud_cookie.userMobile;
    lgud.isSaved =  lgud_cookie.isSaved || false;
  }

  TDG.user_life_data = new ULD(lgud.userName, lgud.userEmail, lgud.userMobile, lgud.isSaved);

    TDG.user_life_data.updateULD();

  //TODO: Refactor
  $('[name="mobile"]').val(TDG.user_life_data.userMobile);
  $('[name="phone"]').val(TDG.user_life_data.userMobile);
  $('[name="name"]').val(TDG.user_life_data.userName);
  $('[name="username"]').val(TDG.user_life_data.userName);
  $('[name="email"]').val(TDG.user_life_data.userEmail);

  $('[name="mobile"]').on('input', function() {TDG.user_life_data.setUserMobile($(this).val())});
  $('[name="phone"]').on('input', function() {TDG.user_life_data.setUserMobile($(this).val())});
  $('[name="name"]').on('input', function(){ TDG.user_life_data.setUserName($(this).val())});
  $('[name="username"]').on('input', function(){ TDG.user_life_data.setUserName($(this).val())});
  $('[name="email"]').on('input', function(){ TDG.user_life_data.setUserEmail($(this).val())});
})();


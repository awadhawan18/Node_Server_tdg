var urlConst = require('../app/constants/routesConstants'),
    securityUtils = require('../app/utils/securityUtils'),
    logger = require('../app/utils/loggingUtils'),
    //directoryController = require('../app/controllers/directoryController'),
    staticController = require('../app/controllers/staticController'),
    errorController = require('../app/controllers/errorController');

module.exports = function(app, passport){

  app.get('/health',function(req,res){
    res.render('hello')
  });

  app.get(urlConst.WEB.ABOUT,staticController.about);
  app.get(urlConst.WEB.TERMS,staticController.terms);
  app.get(urlConst.WEB.FAQ,staticController.faq);
  app.get(urlConst.WEB.POLICIES,staticController.policies);
  app.get(urlConst.WEB.TEAM,staticController.team);
  app.get(urlConst.WEB.CONTACT,staticController.contact);
  app.get(urlConst.WEB.WHY_CHOOSE_US,staticController.whyChooseUs);
  app.get(urlConst.WEB.TRAVEL_TYPE_QUIZ,staticController.travelQuiz);
  app.get(urlConst.WEB.EVENT_PAGE,staticController.event);
  app.get(urlConst.WEB.EVENT_LIST,staticController.eventList);
  app.get(urlConst.WEB.BRAND_AMBASSADOR,staticController.brandAmbassador);
  app.get(urlConst.WEB.CORPORATE_TOURS,staticController.corporateTours);
  app.get(urlConst.WEB.SELLER,staticController.seller);
  app.get(urlConst.WEB.AFFILIATE,staticController.affiliate);

  app.all('*', errorController._404);


};
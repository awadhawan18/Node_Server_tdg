/**
 * Created by Himanshu wolf on 09/11/15.
 */

var pageInfo = require('../constants/pageInfoConstants'),
    seoConstants = require('../constants/seoConstants');

exports.about = function(req, res) {
  res.tdgRender(pageInfo.ABOUT, null, {seo_data: seoConstants.ABOUT}, req,  res, true);
};

exports.terms = function(req, res) {
  res.tdgRender(pageInfo.TERMS, null, {seo_data: seoConstants.TERMS}, req,  res);
};

exports.faq = function(req, res) {
  res.tdgRender(pageInfo.FAQ, null, {seo_data: seoConstants.FAQ}, req,  res);
};

exports.policies = function(req, res) {
  res.tdgRender(pageInfo.POLICIES, null, {seo_data: seoConstants.POLICIES}, req,  res);
};

exports.travelQuiz = function(req, res) {
  res.tdgRender(pageInfo.TRAVEL_QUIZ, null, {seo_data: seoConstants.TRAVEL_QUIZ}, req,  res);
};

exports.team = function(req, res) {
  res.tdgRender(pageInfo.TEAM, null, {seo_data: seoConstants.TEAM}, req,  res);
};

exports.event = function(req, res) {
  res.tdgRender(pageInfo.EVENT_PAGE, null, {seo_data: seoConstants.EVENT_PAGE}, req, res);
};

exports.eventList = function(req, res) {
    res.tdgRender(pageInfo.EVENT_LIST, null, {seo_data: seoConstants.EVENT_LIST}, req,  res);
};
exports.contact = function(req, res) {
  res.tdgRender(pageInfo.CONTACT, null, {seo_data: seoConstants.CONTACT_US}, req,  res);
};

exports.whyChooseUs = function(req, res) {
  res.tdgRender(pageInfo.WHY_CHOOSE_US, null, {seo_data: seoConstants.WHY_CHOOSE_US}, req,  res);
};

exports.brandAmbassador = function(req, res) {
  res.tdgRender(pageInfo.BRAND_AMBASSADOR, null, {seo_data: seoConstants.DEFAULT_SEO_DATA}, req,  res);
};

exports.corporateTours = function(req, res) {
  res.tdgRender(pageInfo.CORPORATE_TOURS, null, {seo_data: seoConstants.DEFAULT_SEO_DATA}, req,  res);
};

exports.seller = function(req, res) {
  res.tdgRender(pageInfo.SELLER, null, {seo_data: seoConstants.DEFAULT_SEO_DATA}, req,  res);
};

exports.affiliate = function(req, res) {
  res.tdgRender(pageInfo.AFFILIATE, null, {seo_data: seoConstants.DEFAULT_SEO_DATA}, req,  res);
};

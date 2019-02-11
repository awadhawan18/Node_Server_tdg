/**
 * Created by Himanshu wolf on 09/04/17.
 */

var webHostingFeaturesHeading = {
  customDomainSupport: "Custom Domain Support",
  visitorAllowed: "Total Monthly Visitors Allowed",
  storageSpace: "Total Storage Space Available In GB", //GB
  imageStorage: "Total Storage Space for Image In GB", //GB
  monthlyBandwidth: "Total Monthly Bandwidth Provided in GB", //GB
  itineraryListing: "Total Number of Itinerary can be Listed",
  customizedHome: "Customized Home Page",
  onBoardingSupport: "On Board Support",
  bookingPortal: "Booking Portal",
  bookingCommission: "Booking Commision In Percentage", //percentage
  paymentGatewayCharges: "Payment Gateway Charges In Percentage", //percentage
  performanceReport: "Performance Report",
  emailBookingNotification: "Email Booking Notification",
  dashboard: "Dashboard",
  automaticBackup: "Automatic Backup",
  smsBookingNotification: "SMS Booking Notification",
  seoManager: "SEO Manager",
  allTimeSupport: "All Time Support",
  analyticsSetup: "Analytics Setup",
  marketing: "Marketing",
  engineerSupport: "Engineer Support"
}

var BASIC = {
  name:"BASIC",
  price: 0,
  customDomainSupport: false,
  visitorAllowed: '2,000',
  storageSpace: 1, //GB
  imageStorage: .1, //GB
  monthlyBandwidth: 2, //GB
  itineraryListing: 5,
  onBoardingSupport: 'Yes',
  bookingPortal: 'Yes',
  bookingCommission: '10%', //percentage
  paymentGatewayCharges: '3%', //percentage
  performanceReport: "On Request",
  emailBookingNotification: 'Yes',
  dashboard: false,
  automaticBackup: false,
  smsBookingNotification: false,
  seoManager: false,
  allTimeSupport: false,
  analyticsSetup: false,
  marketing: false,
  engineerSupport: false,
  customizedHome: false
}
var PRO = {
  name:"PRO",
  price: 499,
  customDomainSupport: 'Yes',
  visitorAllowed: '30,000',
  storageSpace: 3, //GB
  imageStorage: 1, //GB
  monthlyBandwidth: 5, //GB
  itineraryListing: 30,
  onBoardingSupport: 'Yes',
  bookingPortal: 'Yes',
  bookingCommission: '5%', //percentage
  paymentGatewayCharges: '3%', //percentage
  performanceReport: "Monthly",
  emailBookingNotification: 'Yes',
  dashboard: 'Yes',
  automaticBackup: 'Yes',
  smsBookingNotification: 'Yes',
  seoManager: "On Request",
  allTimeSupport: "Limited",
  analyticsSetup: false,
  marketing: false,
  engineerSupport: false,
  customizedHome: false
}
var PREMIUM ={
  name:"PREMIUM",
  price: 4999,
  customDomainSupport: 'Yes',
  visitorAllowed: '10,00,000',
  storageSpace: 25, //GB
  imageStorage: 10, //GB
  monthlyBandwidth: 50, //GB
  itineraryListing: 1000,
  onBoardingSupport: 'Yes',
  bookingPortal: 'Yes',
  bookingCommission: '0%', //percentage
  paymentGatewayCharges: '3%', //percentage
  performanceReport: "Weekly",
  emailBookingNotification: 'Yes',
  dashboard: 'Yes',
  automaticBackup: 'Yes',
  smsBookingNotification: 'Yes',
  seoManager: 'Yes',
  allTimeSupport: 'Yes',
  analyticsSetup: 'Yes',
  marketing: 'Yes',
  engineerSupport: 'Yes',
  customizedHome: 'Yes'
}
var ENTERPRISE ={
  name:"ENTERPRISE",
  price: "Unlimted",
  customDomainSupport: 'Yes',
  visitorAllowed: "Unlimted",
  storageSpace: "Unlimted", //GB
  imageStorage: "Unlimted", //GB
  monthlyBandwidth: "Unlimted", //GB
  itineraryListing: "Unlimted",
  onBoardingSupport: 'Yes',
  bookingPortal: 'Yes',
  bookingCommission: '0%', //percentage
  paymentGatewayCharges: '3%', //percentage
  performanceReport: "Daily",
  emailBookingNotification: 'Yes',
  dashboard: 'Yes',
  automaticBackup: 'Yes',
  smsBookingNotification: 'Yes',
  seoManager: "Dedicated",
  allTimeSupport: 'Yes',
  analyticsSetup: 'Yes',
  marketing: 'Yes',
  engineerSupport: "Dedicated",
  customizedHome: 'Yes'
};


Object.freeze(PRO);
Object.freeze(PREMIUM);
Object.freeze(BASIC);
Object.freeze(ENTERPRISE);

module.exports = {
  FEATURE_HEADING:webHostingFeaturesHeading,
      BASIC:BASIC,
    PRO:PRO,
    PREMIUM:PREMIUM,
    ENTERPRISE:ENTERPRISE,
    getVendorHostingPlans : function() {
  var arrays = [];
  arrays[0] = BASIC;
  arrays[1] = PRO;
  arrays[2] = PREMIUM;
  arrays[3] = ENTERPRISE;
  return arrays;
}
};
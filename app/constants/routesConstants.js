//Module with all the routes used by application, when user interacts with app

var routes = {
  API : {
    SUBSCRIBE : '/subscribeMe',
    GET_WEATHER : '/weather',
    GET_QUOTE : '/itinerary/getquote',
    BOOK_TRIP : '/itinerary/book',
    PRODUCT_BOOKING : '/product/book',
    ADD_TO_BOOK : '/add-to-book',
    WEEKLY_DESTINATION : '/weekly-destination',
    HOME_FACT : '/home-fact',
    ADD_TO_WISHLIST : '/add-to-wishlist',
    AUTO_SEARCH: '/autocomplete',
    EMAIL_TRACK : '/active-subscriber',
    SET_SOURCE : '/set-source',
    INTENT_RESPONSE : '/exit-intent',
    ROUTES_LIST : '/allroute/from--:source/to--:destination',
    LOAD_TOURS : '/load-tours',
    GET_GUIDE : '/get-guide',
    ITEM_SEARCH : '/search-product/:product_type',
    GET_DEAL : '/get-deal'

  },
  WEB : {
  	LANDING_URL : '/',

    ABOUT : '/about',
    TERMS : '/terms',
    FAQ:'/faq',
    PARTNERS : '/partners',
    TEAM : '/team',
    CONTRIBUTORS : '/contributors',
    CONTACT : '/contact',
    BRAND_AMBASSADOR : '/brand-ambassador',
    WHY_CHOOSE_US : '/why-choose-traveldglobe',
    POLICIES : '/policies',
    SELLER : '/seller',
    AFFILIATE : '/affiliate',

    TDG_TIMELINE : '/timeline-of-traveldglobe',
    SEARCH : '/search',
    MAP_VIEW : '/globe',
    BLOG_LIST : '/blog',
    BLOG_LIST_AMP : '/amp/blog',
    BLOG_CATEGORY_LIST : '/blog/category/:category_slug',
    BLOG_DRAFTS_LIST : '/drafts',
    BLOG_DRAFTS : '/blog/drafts/:blog_slug',
    BLOG_WRITE : '/add-blog',
    BLOG_PAGE : '/blog/:blog_slug',
    BLOG_EDIT : '/blog/:blog_slug/edit',
    EVENT_LIST : '/events',
    EVENT_PAGE : '/event/:event_slug',
    TRAVEL_TYPE_QUIZ : '/play/know-your-travel-type',
    TRIP_LIST : '/trip/',
    TRIP_PAGE : '/trip/:slug',
    TRIP_DETAIL : '/trip/:slug~2016',
    PLAN_PAGE : '/trip/backpacking-at-leisure-valley',
    PLAN_MANALI_JULY : '/trip/rafting-and-camping-at-beas-manali-july-2016',
    PLAN_BHIMTAL : '/trip/kayaking-at-jungle-camps-june-2016',
    PLAN_ROOPKUND : '/trip/trek-to-skeleton-lake-of-roopkund-july-2016',
    TRIP_MALANA_AUG : '/trip/backpacking-at-malana-rasol-august-2016',
    TRIP_CHITKUL_AUG : '/trip/trip-to-indias-last-village-august-2016',

    CALENDAR_LIST : '/calendar',
    CALENDAR_MONTHS : '/calendar/best-places-to-visit-in-:month',
    TAGS_LISTING : '/tags/:tag_slug',
    INTEREST_LISTING : '/travel-interests/:interest_slug',
    TRAVELLING_WITH : '/travel-with/:travel_with',


    TRANSPORT_DIRECTORY : '/directory/transport',

    STAY : '/stay',
    PRODUCT_LISTING : '/tour',
    PRODUCT_LISTING_1 : '/outdoor-activities',
    PRODUCT_LISTING_2 : '/outdoor',
    PRODUCT : '/tour/:product_name',
    PRODUCT_1 : '/outdoor-activities/:product_name',
    PRODUCT_2 : '/outdoor/:product_name',

    VENDOR : '/page/:vendor_slug',

    LOGOUT : '/user/logout',
    FACEBOOK_LOGIN : '/auth/facebook',
    FACEBOOK_LOGIN_REPEAT : '/auth/facebook/rerequest',
    FACEBOOK_LOGIN_CB : '/auth/facebook/cb',
    USER_PROFILE : '/traveller/:user_name',
    HOSTING:'/get-online',
    CORPORATE_TOURS:'/corporate-tours'
  },

  LICENSE : {
    HOME : '/license/:domain_name',
    BOOKING : '/license/:domain_name/booking',
    BOOKING_FAILURE : '/license/:domain_name/booking/failure',
    BOOKING_SUCCESS : '/license/:domain_name/booking/success',
    PRODUCT_QUERY : '/license/:domain_name/product/book',
    PRODUCT : '/license/:domain_name/plan/:product_slug',
    ADD_PRODUCT : '/license/:domain_name/add-to-book'
  },

  TOURBOKS_API : {
    SEARCH : '/tourboks',
    PRODUCT_ID : '/tourboks/:id',
    AVAILABLE_DATES : '/dates',
    AVAILABILITY : '/time',
    CREATE : '/create',
    BOOKING_SUCCESS : '/success'
  }
};

Object.freeze(routes);

module.exports = routes;
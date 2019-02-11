/**
 * Created by Himanshu wolf on 24/04/17.
 */

(function(){
  var Analytics = {};

  Analytics.productDetails = function(product) {
    dataLayer.push({
      'ecommerce': {
        'detail': {
          'actionField': {},    // 'detail' actions have an optional list property.
          'products': [{
            'name': product.product,         // Name or ID is required.
            'id': product.id,
            'price': product.price,
            'brand': product.vendor,
            'category': '',
            'variant': product.priceId
          }]
        }
      }
    });
  }

  Analytics.addToBooking = function(product) {
    dataLayer.push({
      'event': 'addToCart',
      'ecommerce': {
        'currencyCode': 'INR',
        'add': {                                // 'add' actionFieldObject measures.
          'products': [{                        //  adding a product to a shopping cart.
            'name': product.product,         // Name or ID is required.
            'id': product.id,
            'price': product.price,
            'brand': product.vendor,
            'category': '',
            'variant': product.priceId,
            'quantity' : product.size
          }]
        }
      }
    });
  }

  TDG.Analytics = Analytics;

})();



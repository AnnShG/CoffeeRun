(function (window) {
  'use strict'
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function (email) {
      return /.+@bignerdranch\.com$/.test(email); // regular expression that is an object
    }
    // function coffeeOrder (string) {
    //
    // }
  };

  App.Validation = Validation;
  window.App = App;
})(window);

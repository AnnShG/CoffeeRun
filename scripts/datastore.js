/* This is a DataStore module, which provides the most important part of the CoffeeRun application.
  It can store data, provide stored data in response to queries, and delete unnecessary data on command. */

(function(window) {
    'use strict'
    var App = window.App || {}; //creating a new global app object, or defining the existed one
    var Promise = window.Promise;

    function DataStore() { //this function is used as a constructor *1
      this.data = {}; //dot opeator means I created a property named 'data' on my new object and assigned an empty object to data.
    };

    function promiseResolvedWith(value) {
      var promise = new Promise(function(resolve, reject) {
        resolve(value);
      });
      return promise;
    }

    // These methods are exactly the way that other modules will interact with your application’s database.
    DataStore.prototype.add = function(key, val) { // created the add property of the prototype and assigned a function to it
      //this.data[key] = val; //it will store the order information (the val), using the customer’s email address (the key).
      return promiseResolvedWith(null);
    };

  DataStore.prototype.get = function(key) { // get method accepts a key, looks up the value for it in the instance’s data property
    return promiseResolvedWith(this.data[key]);
  };

  DataStore.prototype.getAll = function() { // instead of looking up the value for a single key
    return promiseResolvedWith(this.data);
  };

  DataStore.prototype.remove = function(key) {
    delete this.data[key]; // The delete operator removes a key/value pair from an object
    return promiseResolvedWith(null);
  };

  App.DataStore = DataStore; //attached DataStore to the App object
  window.App = App; //reassigned the global App property to your newly modified App
})(window);

// *1. To differentiate a constructor from a regular function, you use the keyword 'new' when you call it.

/* Just like createOrder, deliverOrder is only interested in calling the remove method of this.db.
It does not need any details about how remove actually works.*/

// truck module saves all the user`s inputs into dataStore module
(function(window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) { // parameters in a constructor
    this.truckId = truckId; //created instances
    this.db = db;
  }

  // Instances of Truck are designed to work with anything that has the same method names as a DataStore.
  Truck.prototype.createOrder = function(order) { // createOrder is a method
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order); //  returns the Deferreds that RemoteDataStore produces
  };

  // When an order is delivered, the Truck instance should remove the order from its database
  Truck.prototype.deliverOrder = function(customerId) {
    console.log('Delivering order for ' + customerId); // The value of customerId should be the email address associated with an order.
    return this.db.remove(customerId);
  };

  // page 183, 188, 189
  // This method will get an array of all of the customer email addresses, iterate through the array, and console.log the order information
  Truck.prototype.printOrders = function(printFn) { // retrieve all the coffee orders from the db object.
    return this.db.getAll()
      .then(function(orders) {
        var customerIdArray = Object.keys(orders); // Object.keys method to get an array containing the email addresses for the orders

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function(id) { // iterate through the email address array and run a callback function for each element in the array
          console.log(orders[id]);
          if (printFn) {
            printFn(orders[id]);
          }
        }.bind(this)); // function`s method to call the owner to an object, truck instance as its owner
      }.bind(this));
  };

  App.Truck = Truck;
  window.App = App;
})(window);

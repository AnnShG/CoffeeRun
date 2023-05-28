// formHandler intercepts all the user`s inputs (submit event) and send it to a truck module

(function(window) {
    var App = window.App || {}
    var $ = window.jQuery;

    function FormHandler(selector) { // called selector to the FormHandler constructor
      if (!selector) {
        throw new Error('No selector provided');
      }
      this.$formElement = $(selector); // instance variable = passed selector as a string
      if (this.$formElement.length === 0) { // so now the this.$formElement is an object called "jQuery wrapped selection"
        throw new Error('Could not find element selector: ' + selector);
      }
    }
    // listen to submit handler
    FormHandler.prototype.addSubmitHandler = function(fn) {
      console.log('Setting submit handler for form');
      this.$formElement.on('submit', function(event) { //here is a callback function ; event is a parameter, that we use for calling a callback f-n
        event.preventDefault();

        // time for extracting the data from the form and do something with that
        var data = {}; // it is an a object
        $(this).serializeArray().forEach(function(item) { // item is an object argument
          data[item.name] = item.value; // name and value are atributes in html doc
          console.log(item.name + ' is ' + item.value);
        });
        console.log(data);
        fn(data)
          .then(function() {
            this.reset();
            $('range').html(30);
            this.elements[0].focus();
      }.bind(this));
    });
};

FormHandler.prototype.addInputHandler = function(fn) {
  console.log('Setting input handler for form');
  this.$formElement.on('input', '[name="emailAddress"]', function(event) {
    var emailAddress = event.target.value; // extract the value of the email field from the event.target object
    var message = '';
    if (fn(emailAddress)) {
      event.target.setCustomValidity('');
    } else {
      message = emailAddress + ' is not an authorised email address!'
      event.target.setCustomValidity(message);
    }
  });
};

// making a silver challange
// FormHandler.prototype.addOrderHandler = function (fn) {
//   console.log('Setting order input handler for form');
//   this.$formElement.on('input focus', '[name="coffee"]', function (event) {
//     var coffeeOrder = event.target.value;
//
//     var restrictedString = "decaf";
//     var message = '';
//     if (fn(coffeeOrder) = restrictedString) {
//       message = string + ' is not available';
//     }
//     else {
//       event.target.setCustomValidity('');
//       event.target.setCustomValidity(message);
//   });
// }

/*FormHandler.prototype.addSliderHandler = function () {
  this.$formElement.on('input', function() {
    console.log("Setting slider range!")
    var caffeineRate = $(this).val();
    $(this).next().html(caffeineRate);
  });
  console.log();
  // try to create a new handler file again and use all this code, but without submit handler
};
*/

App.FormHandler = FormHandler;
window.App = App;
})(window);
/*
var fh = new App.FormHandler('[slider-range-change="range"]');
fh.addSliderHandler();
*/

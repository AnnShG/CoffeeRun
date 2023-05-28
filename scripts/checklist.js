// Its job is to add a checklist of pending orders to the page
// When the user clicks on checklist item, it will be removed from the page
// and signal the truck to remove it from data store

(function (window) {
  'use strict';

  var App = window.App || {}; // import App namespace and jQuery
  var $ = window.jQuery;

  function CheckList(selector) { // selector is passed in a constructer
    if (!selector) {
      throw new Error('No selector provided');
    }

    CheckList.prototype.addClickHandler = function (fn) {
      this.$element.on('click', 'input', function (event) { // event handler callback
        var email = event.target.value; // the customer`s email address
        fn(email)
          .then(function () {
              this.removeRow(email);
              }.bind(this));
          }.bind(this));
    };

    this.$element = $(selector);
    if (this.$element.length === 0) { // confirm the selector maathces at leaast one element in the DOM
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addRow = function (coffeeOrder) { // coffeeOrder is an object argument
    // Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);

    // create a new instance of a row, using the coffee order info
    var rowElement = new Row(coffeeOrder);

    // add the new row instance`s $element property to the CheckList
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    // we use element instance to search for any descendant elements  whose value attribute matches the email parameter
    this.$element
    .find('[value="' + email + '"]')
    .closest('[data-coffee-order="checkbox"]')
    .remove();
  }

  // CheckList.prototype.changeBackColour = function (colour) {
  //   this.$element
  //   if($(this).val() == caramel) {
  //     $(this).css('backgroundColour', 'red');
  //   }
  // }

  function Row (coffeeOrder) { // coffeeOrder argumnent will be the same data as truck prototype constructor
    // to create three DOM elements using jQoury $ sign
    var $div = $('<div></div>', { // first argument descibing DOM elements
      'data-coffee-order': 'checkbox', // second argument an object with key/value pairs
      'class': 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress // here we associate the checkbox with the customer`s coffee order
    });

    var description = ' [' + coffeeOrder.strength + 'x], ';

    if (coffeeOrder.flavour) {
      description += coffeeOrder.flavour + ', ';
    }

    description += coffeeOrder.size + ', ';
    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')'; // the parenthses and brackets are needed for formatting the text

    var backColour = "";
    switch (coffeeOrder.flavour) {
      case 'caramel': backColour = '#FFE4C4'; break;
      case 'almond': backColour = '#F5F5DC'; break;
      case 'mocha': backColour = '#F0F8FF'; break;
    }
      if (backColour) {
      $label.css('background', backColour);
      }

    // I need to append all the individual parts of the checklist item to one another
    // We will build the subtree
    $label.append($checkbox); // append the $checkbox to the $label
    $label.append(description);
    $div.append($label);

    this.$element = $div; // to make the subtree available as a property of the instance
  }

  App.CheckList = CheckList; // export the CheckList constructor as part of the App namespace
  window.App = App;
})(window);

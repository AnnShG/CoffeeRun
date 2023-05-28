/* The job of this module is to receive the window object for use inside the function body. It also retrieves
the constructors you defined as part of the window.App namespace.*/

( function (window) {
  'use strict'
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var SLIDER_RANGE = '[slider-range-change="range"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]'; // add a var for the selector taaat mathces checklist area
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Truck = App.Truck; // import Truck from the App namespace and assign it to a local variable
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var SliderHandler = App.SliderHandler;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck('ncc-1701', new DataStore());
  //var myTruck = new Truck('ncc-1701', remoteDS);

  //for bronze challange
  // var myTruck = new Truck('Galactica', new DataStore());

  window.myTruck = myTruck; // to interact with the instance of Truck. I exported it to the global namespace
  var formHandler = new FormHandler(FORM_SELECTOR);
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var sliderHandler = new SliderHandler(SLIDER_RANGE);

  // a single submit handler f-n that invokes both createOrder and addRow
  formHandler.addSubmitHandler(function (data) { // excepts a single argument - data
    return myTruck.createOrder.call(myTruck, data)
    .then(function () {
      checkList.addRow.call(checkList, data); //  addRow depends on createOrder completing without errors or exceptions.
    }),
    function () {
      alert('Server unreachable. Try again later.');
    }
  });
  sliderHandler.addSliderHandler();
  formHandler.addInputHandler(Validation.isCompanyEmail);
  // formHandler.addOrderHandler(Validation.coffeeOrder);
  myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);

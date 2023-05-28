// module that sends a request to the server and handles the response
// it will do this in the background using Ajax, without causing the browser to reload.

(function (window) {
'use strict'
var App = window.App || {};
var $ = window.jQuery;

// constructor accepts an argument for a remote server URL
function RemoteDataStore(url) {
  // throw an error if a URL is not passed in
  if (!url) {
    throw new Error('No remore URL supplied.');
  }
  //  you can later access or use the stored serverUrl value
  this.serverUrl = url; // a new object (a new inssstance of the 'RemoteDataStore') with 'serverUrl' property
}

RemoteDataStore.prototype.add = function (key, val) { // identical to the add method of DataStore
  return $.post(this.serverUrl, val, function (serverResponse) { // return Deferred
    console.log(serverResponse);
  });
};
// The getAll method retrieves all the coffee orders on the remote server and passes them to the callback cb function that is passed in.
RemoteDataStore.prototype.getAll = function (cb) {
  return $.get(this.serverUrl, function (serverResponse) { // will not pass it any data, retrieving information instead of saving information
    if (cb) {
    conssole.log(serverResponse);
    cb(serverResponse);
  }
  })
}

RemoteDataStore.prototype.get = function (key, cb) {
  return $.get(this.serverUrl + '/' + key, function (sserverResponse) {
    if (cb) {
    console.log(serverResponse);
    cb(serverResponse);
  }
  })
}

RemoteDataStore.prototype.remove = function (key) {
  return $,ajax(this.serverURl + '/' + key, {
    type: 'DELETE'
  });
}

// exporting the RemoteDataStore to the global namespace
// assigning the RemoteDataStore constructor function to the RemoteDataStore property of the App object.
App.RemoteDataStore = RemoteDataStore;
window.App = App;
}) (window);

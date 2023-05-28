(function (window) {
  var App = window.App || {}
  var $ = window.jQuery;

  function SliderHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element selector: ' + selector);
    }
  }

  SliderHandler.prototype.addSliderHandler = function () {
    console.log("Setting slider range!")
    this.$formElement.on('input', function() {
      var caffeineRate = $(this).val();
      $(this).next().html(caffeineRate);

      // Use green for weaker coffee, yellow for regular strength coffee, and red for very strong coffee.

      // var rangeColor = $(this).val();
      // if (rangeColor <= 30)) {
      //   $(".color").animate({
      //     color: 'rgb('green')';
      //   })
      //}
      // if (rangeColor <= 30) {
      //   rangeColor.style.color = "green";
      // }
    });
    
    // this.$sliderStrengthLevel.on('change', '[name="strength"]' function (event) {
    //
    // })
  };

  App.SliderHandler = SliderHandler;
  window.App = App;
}) (window);

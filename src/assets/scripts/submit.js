define([
  "page",
  "../../templates/layout/submit"
], function(page, submitTpl) {
  "use strict";

  var init = function() {
    var $container = $("#submit_container");
    $container.html(submitTpl);
    $("#submit_button").click(function() {
      // TODO BAD SMELL
      $container.empty();
      page("/detail");
    });
  };

  return {
    init: init
  };
});
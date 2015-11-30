define([
  "page",
  "../templates/layout/submit"
], function(page, submitTpl) {
  "use strict";
  var $body = $("body"),
    $container = $("#submit_container"), $button;

  var initEvents = function() {
    $body.one("destroy", function() {
      $container.empty();
    });
  };

  var init = function() {
    initEvents();
    $container.html(submitTpl);
    $button = $("#submit_button")
      .click(function() {
        $body.trigger("destroy");
        page("/detail");
      });
  };

  return {
    init: init
  };
});
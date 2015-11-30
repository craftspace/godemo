define([
  "../templates/layout/link-detail",
  "../templates/components/link-item"
], function(detailTpl, itemTpl) {
  "use strict";
  var $body = $("body"),
    $container = $("#link_detail_container"), $linkItem;

  var initEvents = function() {
    $body.one("destroy", function() {
      $container.empty();
    });
  };

  var init = function() {
    initEvents();
    $.getJSON("mock/links.json").done(function(result) {
      result.data.length = 1;
      $container.html(detailTpl);
      $linkItem = $("#link_detail_item").html(itemTpl(result));
    });
  };

  return {
    init: init
  };
});
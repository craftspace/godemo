define([
  "../../templates/layout/home-header",
  "../../templates/layout/home-link-list-layout",
  "../../templates/components/link-item",
  "../../templates/components/link-item-recent"
], function(headerTpl, layoutTpl, itemTpl, itemRecentTpl) {
  "use strict";
  var init = function() {
    // TODO BAD SMELL
    $("#home_header").html(headerTpl);
    $("#home_link_list_container").html(layoutTpl);

    var $linkListContainer = $("#link_list");
    $.getJSON("mock/links.json").done(function(result) {
      $linkListContainer.html(itemTpl(result));
    });

    var $linkListRecentContainer = $("#link_list_recent");
    $.getJSON("mock/links.json").done(function(result) {
      $linkListRecentContainer.html(itemRecentTpl(result));
    });
  };

  return {
    init: init
  };
});
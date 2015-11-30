define([
  "../templates/layout/home-header",
  "../templates/layout/home-link-list",
  "../templates/components/link-item",
  "../templates/components/link-item-recent"
], function(headerTpl, layoutTpl, itemTpl, itemRecentTpl) {
  "use strict";
  var $body = $("body"),
    $header = $("#home_header"),
    $container = $("#home_link_list_container"),
    $ListContainer, $listRecentContainer;

  var initEvents = function() {
    $body.one("destroy", function() {
      [
        $header,
        $container,
        $ListContainer,
        $listRecentContainer
      ].forEach(function($elem) {
        $elem.empty();
      });
    });
  };

  var init = function() {
    initEvents();
    $header.html(headerTpl);
    $container.html(layoutTpl);

    $ListContainer = $("#link_list");
    $.getJSON("mock/links.json").done(function(result) {
      $ListContainer.html(itemTpl(result));
    });

    $listRecentContainer = $("#link_list_recent");
    $.getJSON("mock/links.json").done(function(result) {
      $listRecentContainer.html(itemRecentTpl(result));
    });
  };

  return {
    init: init
  };
});
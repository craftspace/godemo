define([
  "../../templates/link-item-recent"
], function(linkItemRecentTemplate) {
  "use strict";
  var $linkListRecentContainer = $("#link_list_recent");

  $.getJSON("mock/links.json").done(function(result) {
    $linkListRecentContainer.html(linkItemRecentTemplate(result));
  });

});
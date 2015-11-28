define(["handlebars", "../../templates/link-item", "../../templates/link-item-recent"], function(hb, linkItemTemplate, linkItemRecentTemplate) {
  "use strict";
  var $ = jQuery,
    $linkListContainer = $("#link_list"),
    $linkListRecentContainer = $("#link_list_recent");
  console.log(hb);
  $.getJSON("mock/links.json").done(function(result) {
    $linkListContainer.html(linkItemTemplate(result));
    $linkListRecentContainer.html(linkItemRecentTemplate(result));
  });
});
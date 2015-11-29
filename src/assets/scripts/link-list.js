define([
  "../../templates/link-item"
], function(linkItemTemplate) {
  "use strict";
  var $linkListContainer = $("#link_list");

  $.getJSON("mock/links.json").done(function(result) {
    $linkListContainer.html(linkItemTemplate(result));
  });

});
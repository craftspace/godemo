define([
  "../../templates/layout/link-detail",
  "../../templates/components/link-item"
], function(detailTpl, itemTpl) {
  "use strict";

  var init = function() {
    $.getJSON("mock/links.json").done(function(result) {
      result.data.length = 1;
      $("#link_detail_container").html(detailTpl);
      $("#link_detail_item").html(itemTpl(result));
    });
  };

  return {
    init: init
  };
});
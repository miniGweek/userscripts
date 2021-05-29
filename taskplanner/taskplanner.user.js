// ==UserScript==
// @name         Microsoft Task Planner Date Filter
// @namespace    https://tasks.office.com/
// @version      1
// @description  Adds some more basic date filtering to MS Task Planner
// @author       dedlok@gmail.com
// @match        https://tasks.office.com/*
// @grant        none
// ==/UserScript==

window.userScript_taskPlanner = {
  loadScript: function (url, sha, callback) {
    //Adding jquery
    var script = document.createElement("script");
    script.setAttribute("src", url);
    script.setAttribute("integrity", sha);
    script.setAttribute("crossorigin", "anonymous");
    script.addEventListener(
      "load",
      function () {
        var script = document.createElement("script");
        if (callback != undefined && callback) {
          script.textContent = "(" + callback.toString() + ")();";
        }
        document.body.appendChild(script);
      },
      false
    );
    document.body.appendChild(script);
    return script;
  },

  loadCss: function (url) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(fileref);
  },

  dateFilter: function (filterDueDate) {
    console.log("Entered filter date as " + filterDueDate);
    var filterIndexRun = 0;
    var interValForFilterRun = setInterval(function () {
      filterIndexRun++;
      jQuery("div.container").each(function (index, element) {
        var container = jQuery(element);
        var dueDateElement = container.find(
          "div.contentAndLabels > div > div.topBar > div.indicatorRow > div > div.dueDate.indicator.clickable > span"
        );
        var dueDate = dueDateElement.text().trim();
        console.log(dueDate);
        console.log("Executing filter. Index is " + filterIndexRun);
        if (filterDueDate != dueDate) {
          container.hide();
        } else {
          container.show();
        }
        if (filterIndexRun == 5) {
          console.log("Index is " + filterIndexRun + ". Clearing setInterval");
          clearInterval(interValForFilterRun);
        }
      }, 200);
    });
  },

  resetFilter: function () {
    jQuery("div.container").show();
  },
};

https: (function () {
  "use strict";
  function addJQuery(callback) {
    //Adding jquery
    userScript_taskPlanner.loadScript(
      "https://code.jquery.com/jquery-3.6.0.min.js",
      "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=",
      callback
    );

    //Adding jquery ui.js
    userScript_taskPlanner.loadScript(
      "https://code.jquery.com/ui/1.12.1/jquery-ui.min.js",
      "sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
    );

    //Adding jquery ui css
    userScript_taskPlanner.loadCss(
      "https://code.jquery.com/ui/1.12.0/themes/smoothness/jquery-ui.css"
    );
  }

  function addMoreFiltersToMSTask() {
    var intervalCheckIfPlannerBoardIsReady = setInterval(function () {
      var topButtons = jQuery("div.rightAlignedSection>div.dropdowns");
      if (topButtons.length > 0 && jQuery("div.taskBoardCard").length > 0) {
        clearInterval(intervalCheckIfPlannerBoardIsReady);
        jQuery("div.rightAlignedSection>div.dropdowns").after(
          "<button id='resetFilter'>Reset Filter</button>"
        );
        jQuery("div.rightAlignedSection>div.dropdowns").after(
          "<label>Filter by date</label><input type='text'  id='dateFilter'/>"
        );

        jQuery("#dateFilter").datepicker({
          dateFormat: "dd/mm/yy",
          onSelect: function (date) {
            var dateObj = jQuery.datepicker.parseDate("dd/mm/yy", date);
            ddmm = dateObj.format("MM/dd");
            console.log("date selected :" + ddmm);
            userScript_taskPlanner.dateFilter(ddmm);
          },
        });

        jQuery("button#resetFilter").click(function () {
          console.log("Reset Filter");
          userScript_taskPlanner.resetFilter();
        });
      }
    }, 200);
  }

  addJQuery(addMoreFiltersToMSTask);
})();

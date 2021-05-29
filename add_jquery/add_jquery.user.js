// ==UserScript==
// @name          Add Jquery To Sites
// @namespace    https://*/
// @version      1
// @description  Adds Jqeury to sites which do not have jquery
// @author       dedlok@gmail.com
// @match        https://*/*
// @grant        none
// ==/UserScript==

window.userScript_jquery = {
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
};

https: (function () {
  "use strict";
  function addJQuery(callback) {
    //Adding jquery
    userScript_jquery.loadScript(
      "https://code.jquery.com/jquery-3.6.0.min.js",
      "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=",
      callback
    );
  }

  if (window.jQuery == undefined) {
    addJQuery(function () {
      console.log("jquery loaded");
    });
  }
})();

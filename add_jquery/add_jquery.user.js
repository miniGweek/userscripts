// ==UserScript==
// @name          Add Jquery To Sites
// @namespace    https://*/
// @version      1
// @description  Adds Jqeury to sites which do not have jquery
// @author       dedlok@gmail.com
// @match        https://*/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    function addJQuery(callback) {
        var script = document.createElement("script");
        script.setAttribute("src", "https://code.jquery.com/jquery-3.5.1.min.js");
        script.addEventListener('load', function () {
            var script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    };

    if (window.jQuery == undefined) {
        addJQuery();
    }
})();
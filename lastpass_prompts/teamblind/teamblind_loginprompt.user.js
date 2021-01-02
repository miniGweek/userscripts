// ==UserScript==
// @name         Teamblind lastpass helper
// @namespace    https://www.teamblind.com/
// @version      1
// @description  Allows Lastpass extension to show lastpass icon on email input field.
// @author       dedlok@gmail.com
// @match        https://www.teamblind.com/*
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

    function periodicallyCheckIfLoginPopupIsPresent() {
        setInterval(function () {
            var isPresent = jQuery('ul.loginform>li>div>input[placeholder="Enter your work email."]').length == 1;
            if (isPresent) {
                jQuery('ul.loginform>li>div>input[placeholder="Enter your work email."]').attr('name', 'workemailid')
            }
        }, 3000);
    }

    addJQuery(periodicallyCheckIfLoginPopupIsPresent);
})();
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview This file initializes the background page by loading a
 * ProxyErrorHandler, and resetting proxy settings if required.
 *
 * @author Mike West <mkwst@google.com>
 */

 // restart app when new update is available 
chrome.runtime.onUpdateAvailable.addListener(function(details) {
  console.log("updating to version " + details.version);
  chrome.runtime.reload();
});


document.addEventListener("DOMContentLoaded", function () {
  var errorHandler = new ProxyErrorHandler();

  // If this extension has already set the proxy settings, then reset it
  // once as the background page initializes.  This is essential, as
  // incognito settings are wiped on restart.
  var persistedSettings = ProxyFormController.getPersistedSettings();
  if (persistedSettings !== null) {
    chrome.proxy.settings.set(
        {'value': persistedSettings.regular});
  }
});


//listener for response details
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "sending_post_body") {
        //chrome.runtime.sendMessage({type: "gaq", target: "insert operation", behavior: "executed"});

          //$('.openapiresults-js').empty();
         // $('.openapiresults-js').append(request.data.content);
          $.ajax({
            type: "POST",
            async: true,
            contentType: "application/json",
            url: "http://127.0.0.1:5050/api-staging/insert",
            data: request.data.content, // convert array to JSON
            timeout: 10000,
            success: function (data) {
             // chrome.runtime.sendMessage({type: "gaq", target: "insert operation", behavior: "passed"});
          
              console.log("XHR SUCCESS : ", data);
              
            },
            error: function (err) {
              //chrome.runtime.sendMessage({type: "gaq", target: "insert operation", behavior: "failed"});
              console.log("XHR ERROR : ", err);
          
            }
          });

      }
  }
);



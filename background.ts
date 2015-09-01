/// <reference path="typings/chrome/chrome.d.ts" />
var auth_token = null;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse: (token: any) => any) {
        if(request == "get_token" && auth_token) {
            sendResponse(auth_token);
        } else if(request == "authorize"){
            chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
                auth_token = token;
                console.log("got token"+token);
                sendResponse(token);
            });
            return true;
        }
    });
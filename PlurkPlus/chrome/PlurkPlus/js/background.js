var lastErrorMessage = '';
var intervalID;

function showCount() {
    var result = PlurkAPI.getUnreadCount();

    if (result.status == 200) {
        var text = '';
        if (result.data.all > 0) {
            text = result.data.all + '';
        }
        if (result.data.private) {
            chrome.browserAction.setIcon({path: 'images/pm.png'});
        } else {
            chrome.browserAction.setIcon({path: 'images/icon16.png'});
        }
        chrome.browserAction.setBadgeText({text: text});
        lastErrorMessage = '';
    } else if (result.status == 400) {
        stopGetCount();
        var username = window.localStorage['username'];
        var password = window.localStorage['password'];

        result = PlurkAPI.login(username, password);
        if (result.status == 200) {
            startGetCount();
        } else {
            lastErrorMessage = result.data.error_text;
        }
    } else {
        chrome.browserAction.setBadgeText({text: ''});
        lastErrorMessage = result.data.error_text;
    }
}

function startGetCount() {
    stopGetCount();

    var username = window.localStorage['username'];
    var password = window.localStorage['password'];
    var enabled = isEnabled();

    if (enabled && username && password) {
        chrome.browserAction.setIcon({path: 'images/icon16.png'});
        chrome.browserAction.setBadgeText({text: '?'});
        var refreshMilliSecs = parseInt(getRefreshRate(), 10) * 1000;
        intervalID = window.setInterval(showCount, refreshMilliSecs);
        return true;
    }
    return false;
}

function stopGetCount() {
    if (intervalID) {
        chrome.browserAction.setIcon({path: 'images/icon16-gray.png'});
        chrome.browserAction.setBadgeText({text: ''});
        window.clearInterval(intervalID);
    }
    intervalID = null;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "isNickLockerEnabled") {
        var isNickLockerEnabled = typeof(window.localStorage['nickLockerEnabled']) == 'undefined'
            ? false
            : window.localStorage['nickLockerEnabled'] == 'true';

        sendResponse({isNickLockerEnabled: isNickLockerEnabled});
    } else {
        sendResponse({});
    }
});
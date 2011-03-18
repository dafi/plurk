var widgets = {};

if (typeof(popup) == 'undefined') {
    var popup = {};
}

(function() {
    this.init = function() {
        var username = window.localStorage['username'];
        var password = window.localStorage['password'];

        widgets.statusText = document.getElementById('status-text');
        widgets.statusContainer = document.getElementById('status-container');
        widgets.enableCount = document.getElementById('enable-count');
        widgets.loginContainer = document.getElementById('login-container');

        this.toggleCountLabel(isEnabled());
        initLabels({'goto-plurk': 'gotoPlurk',
                    'must-login': 'mustLogin',
                    'mark-all-as-read': 'markAllAsRead',
                    'post-plurk': 'postPlurk'});

        widgets.statusText.innerHTML = chrome.extension.getBackgroundPage().lastErrorMessage;

        if (username && password) {
            widgets.statusContainer.style.display = 'block';
            widgets.loginContainer.style.display = 'none';
        } else {
            widgets.statusContainer.style.display = 'none';
            widgets.loginContainer.style.display = 'block';
        }
    }

    this.toggleCountLabel = function(enabled) {
        if (enabled) {
            widgets.enableCount.innerHTML = chrome.i18n.getMessage('disable');
        } else {
            widgets.enableCount.innerHTML = chrome.i18n.getMessage('enable');
        }
    }

    this.toggleCount = function() {
        var enabled = isEnabled();

        if (enabled) {
            window.localStorage['enabled'] = 'false';
            chrome.extension.getBackgroundPage().stopGetCount();
        } else {
            window.localStorage['enabled'] = 'true';
            chrome.extension.getBackgroundPage().startGetCount();
        }
        window.close();
    }

    
    this.openOptions = function() {
        // chrome.extension.getURL("options.html");
        chrome.tabs.create({url: 'options.html'});
        window.close();
    }

    this.openPlurk = function() {
        var plurkUrl = 'http://www.plurk.com/' + window.localStorage['username'];

        chrome.windows.getCurrent(function(win) {
            chrome.tabs.getAllInWindow(win.id, function(tabs) {
                var foundTab = false;
                for (var i in tabs) {
                    var tab = tabs[i];
                    if (tab.url.indexOf(plurkUrl) == 0) {
                        chrome.tabs.update(tab.id, {selected: true});
                        chrome.tabs.executeScript(tab.id, {code: 'document.location.reload()'});
                        foundTab = true;
                        break;
                    }
                }
                if (!foundTab) {
                    chrome.tabs.create({url: plurkUrl});
                }
                window.close();
            });
        });
    }

    this.markAllAsRead = function() {
        var result = PlurkAPI.getUnreadPlurks();

        if (result.status == 200) {
            var arr = result.data.plurks;
            var ids = [];
            for (var i in arr) {
                ids.push(arr[i]['plurk_id']);
            }
            PlurkAPI.markAsRead(ids);
            chrome.extension.getBackgroundPage().showCount();
            window.close();
        } else {
            widgets.statusText.innerHTML = 'Unable to read plurks.';
        }
    }
    
    this.postPlurk = function() {
        chrome.windows.getCurrent(function(winInstance) { 
            chrome.tabs.getSelected(winInstance.id, function(tabInstance) {
                chrome.tabs.create({
                    "windowId": winInstance.id,
                    "index": tabInstance.index + 1,
                    "url": chrome.extension.getURL('post.html'),
                    "selected": true
                });
            });
        });
    }
}).apply(popup);

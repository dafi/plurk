chrome.extension.sendRequest({method: "isNickLockerEnabled"}, function(response) {
    if (response.isNickLockerEnabled) {
        window.addEventListener('DOMNodeInserted', function(event) {
                var target = event.target;
        
                // TODO use event.target to check element
                var n = document.querySelectorAll('div.plurk a.name');
                for (var i = 0; i < n.length; i++) {
                    n[i].firstChild.nodeValue = n[i].href.substring(n[i].href.lastIndexOf('/') + 1);
                }
        }, true);
    }
});

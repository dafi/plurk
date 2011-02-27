var plurkEasyEmoticon = {
    easyDiv: document.getElementById('plurkEasyEmoticonDiv'),
    isBarVisible: false,
    barHeight: 96,
    lastInputFocused: null,
    isEnabled: true,
    allEmoticons: null,

    init: function() {
        var result = PlurkAPI.getEmoticons();
        if (result.status != 200) {
            return;
        }

        if (typeof(window.localStorage['enabled']) == 'undefined') {
            window.localStorage['enabled'] = 'true';
        }
        this.isEnabled = window.localStorage['enabled'] == 'true'

        this.allEmoticons = result.data;
        var karmaEmots = this.allEmoticons['karma'];
        var recruitedEmots = this.allEmoticons['recuited'];

        this.updater = document.getElementById('updater');
        this.updaterZIndex = this.updater ? this.updater.style.zIndex : '';

        this.easyDiv = document.createElement('div');
        this.easyDiv.setAttribute('id', 'plurkEasyEmoticonDiv');
        this.addClass(this.easyDiv, 'bottom-bar');
        var allSets = [];

        // valid only from bookmarklet
        //var karma = typeof(SiteState) != 'undefined'
        //    && SiteState.getSessionUser()
        //    && SiteState.getSessionUser().karma
        //    || 100;
        
        // on plurk mobile allow to see all images without using
        // the real karma value
        // From Chrome we can't access to variables in page so the karma will be always 100
        var karma = document.getElementById('karma');
        karma = karma
            && karma.firstChild
            && karma.firstChild.nodeType == karma.TEXT_NODE
            && parseFloat(karma.firstChild.nodeValue)
            || 100;

        for (var i in karmaEmots) {
            if (karma >= parseFloat(i)) {
                allSets.push(karmaEmots[i]);
            }
        }
        // TODO: add check using API to determine if user can use recruitedEmots
        for (var i in recruitedEmots) {
            allSets.push(recruitedEmots[i]);
        }
        for (var s in allSets) {
            var currSet = allSets[s];
            for (var i in currSet) {
                var eicon = currSet[i];
                var img = document.createElement('img');
                // plurk developers are to lazy to fix the three 'l' typo
                img.setAttribute('alt', eicon[0] == '(eyerolll)' ? '(eyeroll)' : eicon[0]);
                img.setAttribute('src', eicon[1]);
                img.addEventListener('click', function(event) {
                    if (!plurkEasyEmoticon.lastInputFocused) {
                        return;
                    }
                    var text = plurkEasyEmoticon.lastInputFocused.value;
                    if (text.length > 0) {
                        text += ' ';
                    }
                    plurkEasyEmoticon.lastInputFocused.value = text + event.target.getAttribute('alt');
                    plurkEasyEmoticon.lastInputFocused.focus();
                    var pos = plurkEasyEmoticon.lastInputFocused.value.length;
                    plurkEasyEmoticon.lastInputFocused.setSelectionRange(pos, pos);
                }, true);
                this.easyDiv.appendChild(img);
            }
        }
        document.body.appendChild(this.easyDiv);

        var menu = document.getElementById('top_login');
        if (menu) {
            var item = document.createElement('a');
            item.setAttribute('href', '#');
            item.addEventListener('click', function(event) {
                plurkEasyEmoticon.setEnable(!plurkEasyEmoticon.isEnabled);
            }, true);
            var span = document.createElement('span');
            item.setAttribute('id', 'plurkEasyEmoticon-enable-menu');
            span.appendChild(document.createTextNode('Disable Plurk Emoticon'));
            item.appendChild(span);

            var inviteMenu = document.querySelector('a[href="/Friends/inviteFriends"]');
            inviteMenu.style.display = 'none';
            menu.insertBefore(item, inviteMenu);
            this.setEnable(plurkEasyEmoticon.isEnabled);
        }

        this.isBarVisible = true;
        window.addEventListener('mousemove', function(event) {
            var y = document.documentElement.clientHeight - event.clientY - 16;
            if (plurkEasyEmoticon.isEnabled) {
                if (y < plurkEasyEmoticon.barHeight) {
                    plurkEasyEmoticon.easyDiv.style.display = 'block';
                    if (plurkEasyEmoticon.updater) {
                        plurkEasyEmoticon.updater.style.zIndex = '10000';
                    }
                    plurkEasyEmoticon.isBarVisible = true;
                }
            }
        }, true);

        // Using barHeight to hide div is wrong, the div height can be greater
        // than barHeight if window width is small, so we detect the mouseout
        this.easyDiv.addEventListener('mouseout', function(event) {
            var e = event.relatedTarget;
            if (!e || e.parentNode == this || e == this) {
                return;
            }
            if (plurkEasyEmoticon.isBarVisible) {
                plurkEasyEmoticon.easyDiv.style.display = 'none';
                if (plurkEasyEmoticon.updater) {
                    plurkEasyEmoticon.updater.style.zIndex = plurkEasyEmoticon.updaterZIndex;
                }
                plurkEasyEmoticon.isBarVisible = false;
            }
        }, true);
        
        window.addEventListener('focus', function(event) {
            var id = event.target.id;

            if (id == 'input_big'
                || id == 'input_small'
                || event.target.name == 'content') {
                plurkEasyEmoticon.lastInputFocused = event.target;
            }
        }, true);
    },

    setEnable: function(isEnabled) {
        plurkEasyEmoticon.isEnabled = isEnabled;
        window.localStorage['enabled'] = plurkEasyEmoticon.isEnabled ? 'true' : 'false';
        var menuLabel = document.getElementById('plurkEasyEmoticon-enable-menu');
        if (menuLabel) {
            if (plurkEasyEmoticon.isEnabled) {
                menuLabel.innerHTML = 'Disable Plurk Emoticon';
            } else {
                menuLabel.innerHTML = 'Enable Plurk Emoticon';
            }
        }
    },
    
    hasClass: function(el, cls) {
        return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    addClass: function(el, cls) {
        if (!plurkEasyEmoticon.hasClass(el, cls)) el.className += " " + cls;
    },

    removeClass: function(el, cls) {
        if (plurkEasyEmoticon.hasClass(el, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            el.className = el.className.replace(reg,' ');
        }
    }
};

// some nodes are added by plurk from javascript so to be sure we monitor element creation
function onDOMNodeInserted(event) {
    var id = event.target.id;

    if (id == 'karma_div') {
        plurkEasyEmoticon.init();
        window.removeEventListener('DOMNodeInserted', onDOMNodeInserted, true);
    }
}
// On plurk mobile isn't possible to detect karma value so we can start immediately
if (document.getElementById('input_small')) {
    window.addEventListener('DOMNodeInserted', onDOMNodeInserted, true);
} else {
    plurkEasyEmoticon.init();
}

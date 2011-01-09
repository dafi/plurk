const DEFAULT_REFRESH_RATE = "3";

function isEnabled() {
    var enabled = window.localStorage['enabled'];

    if (typeof (enabled) == 'undefined' || enabled == null) {
        enabled = 'true';
    }

    return enabled === 'true';
}

function initLabels(idToLabels) {
    var errors = [];
    for (var id in idToLabels) {
        var labelId = idToLabels[id];
        var widget = document.getElementById(id);

        if (widget) {
            label = chrome.i18n.getMessage(labelId);
            if (label) {
                if (widget.hasAttribute('value')) {
                    widget.setAttribute('value', label);
                } else {
                    widget.innerHTML = label;
                }
            } else {
                errors.push('Unable to find label for "' + labelId + '"');
            }
        } else {
            errors.push('Unable to find widget with id "' + id + '"');
        }
    }
    if (errors.length) {
        alert(errors.join('\n'));
    }
}

function getRefreshRate() {
    var refresh = window.localStorage['refresh'];

    return refresh ? refresh : DEFAULT_REFRESH_RATE;
}
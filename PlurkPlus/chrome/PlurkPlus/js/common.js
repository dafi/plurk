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

function postPlurkFromRequest(request, sender, sendResponse) {
    if (request.typeReq == "post") {
        var qualifier = ':';
        var lines = $.stripEmptyLines(request.content);

        if (lines.length == 0) {
            sendResponse({error: 'No text to publish'});
            return;
        }
        lines = $.wrapLines(lines, 140);

        var result = PlurkAPI.add({content: lines[0],
                                    qualifier: qualifier});
        var data = result.data;
        if (data.error_text) {
            sendResponse({error: data.error_text});
        } else {
            for (var i = 1; i < lines.length; i++) {
                var resultAdd = PlurkAPI.responseAdd({
                    plurk_id: data.plurk_id,
                    content: lines[i],
                    qualifier: qualifier
                });
                if (resultAdd.data.error_text) {
                    sendResponse({error: resultAdd.data.error_text});
                    return;
                }
            }
            sendResponse({splitCount: lines.length});
        }
    } else {
        sendResponse({});
    }
}

function showMessage(htmlText, messageType) {
    messageType = typeof(messageType) == "undefined" ? 'info' : messageType;
    $('#dialog-info-box').hide();
    $('#dialog-error-box').hide();
    $('#dialog-progress-box').hide();

    if (messageType == 'error') {
        $('#dialog-error-box').show();
        $('#dialog-error-message').append(htmlText);
    } else if (messageType == 'info') {
        $('#dialog-info-box').show();
        $('#dialog-info-message').append(htmlText);
    } else if (messageType == 'progress') {
        $('#dialog-progress-box').show();
        $('#dialog-progress-message').append(htmlText);
    }
}

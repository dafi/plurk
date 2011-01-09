function onClick(info, tab, context) {
    var url = '';
    var text = '';
    var wrapInParens = false;

    switch (context) {
        case 'page':
            url = info.pageUrl;
            text = tab.title;
            wrapInParens = true;
            break;
        case 'link':
            url = info.linkUrl;
            text = tab.title;
            wrapInParens = true;
            break;
        case 'image':
            url = info.srcUrl;
            break;
        default:
            alert('Uknown context ' + context);
            return;
    }
    var plurk = getPlurkContent(url, text, wrapInParens);
    var maxChars = 140;
    while (plurk != null && plurk.length > maxChars) {
        var errMessage = chrome.i18n.getMessage('ctx_shareTooManyChars',
                                        [plurk.length + '', maxChars + '']);
        alert(errMessage);
        plurk = getPlurkContent(url, text, wrapInParens);
    }
    if (plurk != null) {
        var result = PlurkAPI.add({content: plurk, qualifier: 'shares'});
        if (result.status != 200) {
            alert(result.data.error_text);
        }
    }
}

function getPlurkContent(url, text, wrapInParens) {
    var plurk = prompt(chrome.i18n.getMessage('ctx_shareText'), text);
    if (plurk !== null) {
        if (wrapInParens && plurk.length > 0) {
            plurk = '(' + plurk + ')';
        }
        plurk = url + ' ' + plurk;
    }
    return plurk;
}

var contexts = ["page", "link", "image"];//, "video", "audio"];

for (var i in contexts) {
    var context = contexts[i];
    var id = chrome.contextMenus.create({
        'title': chrome.i18n.getMessage('ctx_share', chrome.i18n.getMessage('ctx_' + context)),
        'contexts': [context],
        'onclick': (function(info, tab) {
            var c = context;
            return function(info, tab) {onClick(info, tab, c)};
        })()
    });
}

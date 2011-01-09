if (typeof(options) == 'undefined') {
    var options = {};
}

(function() {
    var usernameWidget;
    var passwordWidget;
    var refreshWidget;

    this.init = function() {
        usernameWidget = document.getElementById('username');
        passwordWidget = document.getElementById('password');
        refreshWidget = document.getElementById('refresh-rate');

        refreshWidget.value = getRefreshRate();

        initLabels({'label-nickname': 'label_nickname',
                    'label-password': 'label_password',
                    'label-refresh-rate': 'label_refreshRate',
                    'save': 'label_save'});

        usernameWidget.focus();
    }

    this.save = function() {
        var username = usernameWidget.value;
        var password = passwordWidget.value;
        var refresh = parseInt(refreshWidget.value, 10);
        var errors = [];

        if (isNaN(refresh) || refresh < DEFAULT_REFRESH_RATE) {
            errors.push(chrome.i18n.getMessage('msg_refreshError'));
        }

        if (username && password) {
            var result = PlurkAPI.login(username, password);
            if (result.status != 200) {
                var error = chrome.i18n.getMessage('msg_loginError');
                if (result.data.error_text) {
                    error += '\n' + result.data.error_text;
                }
                errors.push(error);
            }
        } else {
            errors.push(chrome.i18n.getMessage('msg_loginMandatoryFields'));
        }

        if (errors.length) {
            var errorContainer = document.getElementById('error-container');
            errorContainer.removeChild(errorContainer.firstChild);

            var ul = document.createElement('ul');
            for (var i = 0; i < errors.length; i++) {
                var li = document.createElement('li');
                li.appendChild(document.createTextNode(errors[i]));
                ul.appendChild(li);
            }
            errorContainer.appendChild(ul);
            errorContainer.style.display = "block";
        } else {
            window.localStorage['username'] = username;
            window.localStorage['password'] = password;
            window.localStorage['refresh'] = refresh + "";

            chrome.extension.getBackgroundPage().startGetCount();
            window.close();
        }
        return errors.length == 0;
    }
}).apply(options);
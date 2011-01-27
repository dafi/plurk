if (typeof(PlurkAPI) == 'undefined') {
    var PlurkAPI = {};
}

(function() {
    // apiKey should be secret
    var apiKey = '4UO0QjvVVlYeo4PeHL1okGTYfyF712C8';
    var username = '';
    var password = '';

    function doRequest(apiUrl, params) {
        params = typeof(params) == 'undefined' || params === null ? {} : params;

        var xhr = new XMLHttpRequest();
        xhr.open('post', 'http://www.plurk.com' + apiUrl, false);

        xhr.setRequestHeader('content-type',
                                 'application/x-www-form-urlencoded');
        var request = ['api_key=' + apiKey];
        for (var i in params) {
            request.push(i + '=' + encodeURIComponent(params[i]));
        }
        xhr.send(request.join('&'));
        return {status: xhr.status,
                data: JSON.parse(xhr.responseText)};
    }

    this.login = function(username, password) {
        return doRequest('/API/Users/login', {
            username: username, password: password, no_data: '1'});
    }

    this.logout = function(username, password) {
        return doRequest('/API/Users/logout');
    }

    this.getUnreadCount = function() {
        return doRequest('/API/Polling/getUnreadCount');
    }

    this.getUnreadPlurks = function() {
        return doRequest('/API/Timeline/getUnreadPlurks');
    }

    this.markAsRead = function(ids) {
        return doRequest('/API/Timeline/markAsRead', {ids: JSON.stringify(ids)});
    }
    
    this.add = function(params) {
        return doRequest('/API/Timeline/plurkAdd', params);
    }
    
    this.getEmoticons = function(params) {
        return doRequest('/API/Emoticons/get', params);
    }
}).apply(PlurkAPI);
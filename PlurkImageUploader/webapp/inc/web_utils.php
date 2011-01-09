<?php

class web_utils {
    static function get_webapp_url() {
        $pos = strrpos($_SERVER["PHP_SELF"], "/");
        if ($pos === false) {
            $web_context = "/";
        } else {
            if ($pos == 0) {
                $web_context = "/";//$_SERVER["PHP_SELF"];
            } else {
                $web_context = substr($_SERVER["PHP_SELF"], 0, $pos + 1);
            }
        }
        $port = $_SERVER["SERVER_PORT"];

        if (self::is_https()) {
            $protocol = "https://";
            $port = "443" ? "" : ":" . $port;
        } else {
            $protocol = "http://";
            $port = "80" ? "" : ":" . $port;
        }

        return $protocol . $_SERVER["SERVER_NAME"] . $port . $web_context;
    }
    
    static function is_https() {
        return !empty($_SERVER["HTTPS"]);
    }
}
?>

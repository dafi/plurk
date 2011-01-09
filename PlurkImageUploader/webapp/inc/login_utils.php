<?php
require_once 'plurkapi/plurk_api.php';
require_once 'inc/config.php';

session_start();

class login_util {
    static function login($nick_name, $password) {
        $ret_val = false;

        if (!self::is_logged()) {
            $plurk = new mini_plurk_api();

            if (isset($nick_name) && isset($password) && strlen(trim($password)) > 0) {
                if ($plurk->login(API_KEY, $nick_name, $password)) {
                    $_SESSION['plurk'] = $plurk;
                    $ret_val = true;
                }
            }
        }

        return $ret_val;
    }

    static function logout($goto_index = true) {
        //getPlurk()->logout();
        unset($_SESSION['plurk']);

        if ($goto_index) {
            header("location: " . LOGOUT_RETURN_URL);
        }
    }

    static function is_logged() {
        return isset($_SESSION['plurk']) && self::get_plurk_api()->get_login_status();
    }

    static function get_plurk_api() {
        return $_SESSION['plurk'];
    }

    static function do_login() {
        $return_url = DO_LOGIN_RETURN_URL_FAILURE;

        if (isset($_POST['nick']) && isset($_POST['password'])) {
            if (self::login($_POST['nick'], $_POST['password'])) {
                $url = isset($_POST['u']) ? $_POST['u'] : null;
                $return_url = DO_LOGIN_RETURN_URL_SUCCESS . "?u=" . urlencode($url);
            }
        }
        header("location: " . $return_url);
    }
}
?>
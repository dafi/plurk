<?php
    // this file contains the private constants like the API_KEY
    require_once 'config_private.php';
    require_once "inc/web_utils.php";

    define('APP_NAME', 'Plurklet Image Uploader');
    define('APP_URL', web_utils::get_webapp_url() . 'uploader');
    define('APP_VERSION', 'v1.0 beta');
    define('APP_DESCRIPTION', 'Upload Images to Plurk from a bookmarklet');
    define('APP_TITLE', 'Plurklet to upload images');

    define('LOGIN_RETURN_URL', 'login.php');
    define('LOGOUT_RETURN_URL', 'index.php');
    define('DO_LOGIN_RETURN_URL_SUCCESS', 'uploadImage.php');
    define('DO_LOGIN_RETURN_URL_FAILURE', 'login.php');
?>
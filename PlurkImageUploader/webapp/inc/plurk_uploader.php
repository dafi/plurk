<?php

require 'inc/login_utils.php';

class plurk_uploader {
    function __construct() {
    }

    static function get_url_content($url) {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $data = curl_exec($ch);

        curl_close($ch);

        return $data;
    }

    static function save_file($path, $content) {
        $fp = fopen($path, "wb");
        
        if ($fp === false) {
            return false;
        }
        if (fwrite($fp, $content) === false) {
            return false;
        }
        fflush($fp);
        fclose($fp);
        
        return true;
    }

    static function upload_url($url) {
        $image = self::get_url_content(urldecode($url));
        $tempPath = tempnam("/tmp", "plurkuploader");

        if (self::save_file($tempPath, $image)) {
            $result = login_util::get_plurk_api()->upload_picture($tempPath);
        } else {
            $result = array('error_text' => 'Unable to save file');
        }

        unlink($tempPath);

        return $result;
    }
}
?>
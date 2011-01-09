<?php
require 'inc/plurk_uploader.php';

$url = isset($_GET['u']) ? $_GET['u'] : null;

if ($url) {
    if (login_util::is_logged()) {
        $result = plurk_uploader::upload_url($url);

        if (isset($result->error_text)) {
            include 'uploadFailure.php';
        } else {
            include 'uploadSuccess.php';
        }
    } else {
        header("location: " . LOGIN_RETURN_URL . "?u=" . $url);
    }
}
?>

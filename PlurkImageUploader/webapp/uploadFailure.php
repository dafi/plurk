<?php
    require_once 'inc/login_utils.php';
    include "inc/template.php";

    function body_fragment() {
        global $result;
?>
        <?php if (login_util::is_logged()) { ?>
            <br/>
            <a class="button" href="doLogout.php">Logout</a>
        <?php } ?>
<p>Upload failed: <?php echo $result->error_text ?></p>
<br/>
<?php } ?>
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

<div id="d_clip_button">Copy URL To Clipboard</div>
<form>
    <fieldset>
        <legend>Thumbnail image</legend>
        <img src='<?php echo $result->thumbnail ?>'/>
    </fieldset>
    <br/>
    <fieldset>
        <legend>Full image</legend>
        <img src='<?php echo $result->full ?>'/>
    </fieldset>
</form>
<script type="text/javascript" src="js/ZeroClipboard.js"></script>
<script type="text/javascript">
    ZeroClipboard.setMoviePath('js/ZeroClipboard.swf');
    var clip = new ZeroClipboard.Client();
    clip.setText('<?php echo $result->full ?>');

    clip.setHandCursor(true);
    clip.setCSSEffects(true);
    clip.addEventListener('complete', function(client, text) {
        window.close();
    });
    clip.glue('d_clip_button');
</script>
<?php } ?>
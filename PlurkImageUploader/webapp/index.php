<?php
    include "inc/template.php";
    function body_fragment() {
    require_once "inc/web_utils.php";
        $url = web_utils::get_webapp_url() . 'uploadImage.php';?>
    <div class="help">
    <p>What is does</p>
    <p>Upload images to plurk directly from the web, you don't need to save to your disk<p>

    <p>How to use</p>
    <ol>
        <li>Drag the bookmarklet shown below to your browser toolbar</li>
        <li>Visit a page where there is the image to upload</li>
        <li>Show the image in the browser (on Firefox from context menu click 'View Image')</li>
        <li>Click on previously saved bookmarklet</li>
        <li>That's all Folks</li>
    </ol>
    <p>Drag this bookmarklet to you toolbar browser
    <a href="javascript:a=function(){window.open('<?php echo $url; ?>?u='+encodeURIComponent(document.location.href),'uploader','toolbar=0,status=0,resizable=1,width=600,height=450')};if (/Firefox/.test(navigator.userAgent))setTimeout(a,0);else{a()}void(0)">PlurkImageUploader</a>
    </p>
    </div>
<?php } ?>
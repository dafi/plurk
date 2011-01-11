<?php
    if ($argc < 2) {
        echo 'Syntax: jsmin file' . "\n";
        return;
    }
    $jsmin = file_get_contents($argv[1]);
    $jsmin = str_replace("\n\r", ';', $jsmin);
    $jsmin = str_replace("\n", ';', $jsmin);
    $jsmin = str_replace("\r", ';', $jsmin);
?>
    <div class="help">
    <p>What is does</p>
    <p>Show a toolbar button with emoticons to use with plurk.com<p>

    <p>How to use</p>
    <ol>
        <li>Drag the bookmarklet shown below to your browser toolbar</li>
        <li>Goto to plurk.com</li>
        <li>Click on previously saved bookmarklet</li>
        <li>Click on plurk input box</li>
        <li>Move mouse pointer to top of screen</li>
        <li>The toolbar appears, click on image you want to plurk</li>
        <li>That's all Folks</li>
    </ol>
    <p>Drag this bookmarklet to you toolbar browser
    <a href="javascript:<?php echo $jsmin?>;if (/Firefox/.test(navigator.userAgent))setTimeout(function(){plurkEasyEmoticon.init();},0);else{plurkEasyEmoticon.init()}void(0)">PlurkEasyEmoticon</a>
    </p>
    </div>

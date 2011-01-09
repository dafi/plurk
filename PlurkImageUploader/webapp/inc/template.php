<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=iso-8859-1" />

    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" type="text/css" href="css/jquery.autocomplete.css" />
    <link rel="stylesheet" type="text/css" href="css/copycb.css" />

    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.validate.js"></script>

<?php require_once "config.php" ?>
    <title><?php echo APP_TITLE ?></title>
</head>
<body>
    <div class="title"><?php echo APP_NAME ?> <?php echo APP_VERSION ?> - <?php echo APP_DESCRIPTION ?></div>

    <?php body_fragment(); ?>
    <?php include "inc/credits.php" ?>
</body>
</html>
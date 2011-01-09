Plurk Image Uploader
=====

Bookmarklet using Plurk API
-----------------------------------------

Plurk Image Uploader allows to upload images to plurk directly from the browser.

When you want to share an image on Plurk, you must upload the image form the 'Daily Photo' menu but if image is on the web
you must before save it on your disk.

Using this bookmarklet you don't need to save locally, it returns the link to uploaded image, then allow to copy to clipboard and finally you can share with your friends pasting on a plurk post.


Installation
-----------------------------------------

**Prerequisites**: PHP 5.x

Drop the webapp directory on server and go to the url

Example

http://localhost/plurkimageuploader/

You must create a file config_private.php inside inc directory containing the constant with you Plurk API key.

For example

<?php
    define('API_KEY', 'YOUR_API_KEY_STRING');
?>

Visit the GitHub Wiki for more information: <http://wiki.github.com/dafi/PlurkImageUploader/>
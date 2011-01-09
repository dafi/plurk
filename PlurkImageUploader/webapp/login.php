<?php
    include "inc/template.php";

    function body_fragment() { ?>
    <script type="text/javascript">
      $(function() {
        $('#loginForm').validate({
            rules: {
              nick: "required",
              password: "required"
            },
            messages: {
              nick: "Please specify the nick",
              password: "Please specify the password"
            },
            submitHandler: function(form) {
                form.submit();
            },
            errorPlacement: function(error, element) {
                var errorEl = $("#" + element.attr("id") + "-error");
                error.appendTo(errorEl);
            }
          });


         $('#nick').focus();
      });
    </script>
    <div class="warning">
    <strong>We do NOT store password</strong><br/>
    This is an open source project and you can download the source code from GitHub<br/>
    If you still don't feel safe enough and you have a private time line you can also change your password temporarily so that even if we stored it (we promise we don't) we wouldn't be able to access your data
    </div>
    <br />

    <form class="infobox" id="loginForm" action="doLogin.php" method="post">
        <input type="hidden" name="u" value="<?php echo urlencode($_GET['u']) ?>"/>
        <div class="fields">
            <label for="nick">Nick name</label>
            <br/>
            <input type="text" id="nick" name="nick" value=""/>
            <span id="nick-error"></span>
        </div>

        <div class="fields">
            <label for="password">Password</label>
            <br/>
            <input type="password" id="password" name="password"/>
            <span id="password-error"></span>
        </div>

        <div class="buttons-panel">
            <input name="login" id="login" value="Login" type="submit" class="submit-button button"/>
        </div>
    </form>
<?php } ?>
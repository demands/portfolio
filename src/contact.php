
<?php require "header.php"; ?>

<section id="contact">
  <hgroup>
    <h1>Send me a message.</h1>
    <h2>What can I do for you?</h2>
  </hgroup>
  <form action=contact method=post>
    <label for=message>Type your message:</label>
    <?php
      if(isset($contact_message)) {

        function prepend($arg) {
          return "response-$arg";
        }

        $classes = array_map('prepend', $contact_message['details']);
        $classes = implode(' ', $classes);

        print "<p class=\"$classes response\">";
        print $contact_message['text'];
        print "</p>";
        print "<textarea name=\"message\">";
        print $_POST['message'];
        print "</textarea>";
      }
      else {
        print "<textarea name=message class=message id=message></textarea>";
      }

      print "<label for=captcha>How many letters are in my first name?</label>";

      if(
         isset($contact_message) &&
         $contact_message['details'][0] == 'error' &&
         $contact_message['details'][1] == 'captcha'
        )
      {
        print "<input type=text name=captcha class=\"error captcha\" id=captcha />";
      }

      else {
        print "<input type=text name=captcha class=captcha id=captcha />";
      }

      print "<label for=captcha>(So that I know you're not a robot.)</label>";

    ?>
    </label>
    <input type=submit value=Send! class=submit>
  </form>
</section>

<?php require "footer.php"; ?>


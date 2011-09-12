
<?php require "header.php"; ?>

<?php
  /* Calculate number of seconds since I became a developer. */
  date_default_timezone_set('America/Los_Angeles');
  $DATE_I_BECAME_A_DEV = strtotime('August 1 1996');
  $seconds = time() - $DATE_I_BECAME_A_DEV;
  $minutes = $seconds / 60;
  $formatted = number_format($minutes, 2);
?>

<section id="about_me">
	<div class="speech-bubble">
    <h1>It's awesome to meet you!</h1>
    <p>I am a <strong>web application developer</strong> who enjoys exploring the world and learning new things. I have been in this business for <span class="minutes-in-business"><?php print $formatted; ?></span> minutes and I still love it.</p>
    <p>Currently, I live in <strong>San Francisco California</strong>, and I work for <strong><a href="http://markerseven.org">Marker Seven Interactive</a></strong>.</p>
  </div>
  <div id=portrait>
    <img src=img/me.png alt="A picture of me!" height=426 width=219 title="Maybe sometime I'll think of something funny to say here." />
	</div>
</section>

<?php require "footer.php"; ?>


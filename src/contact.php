<?php
  if(isset($_POST['captcha'])) {
    require_once 'contact-submit.php';
  }
?><!doctype html>
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">

	<meta http-equiv="cleartype" content="on">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Max Edmands, web developer || Contact me</title>
  <meta name="description" content="My online portfolio and blog.">
  <meta name="author" content="Max Edmands">

	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1">
	
  <!-- For iPhone 4 -->
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/h/apple-touch-icon.png">
	<!-- For iPad 1-->
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/m/apple-touch-icon.png">
	<!-- For iPhone 3G, iPod Touch and Android -->
	<link rel="apple-touch-icon-precomposed" href="img/l/apple-touch-icon-precomposed.png">
	<!-- For Nokia -->
	<link rel="shortcut icon" href="img/l/apple-touch-icon.png">
	<!-- For everything else -->
	<link rel="shortcut icon" href="/favicon.ico">
	
	<link rel="canonical" href="/">

	<link href='http://fonts.googleapis.com/css?family=Tinos:regular,italic,bold,bolditalic' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Cabin+Sketch:bold' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/style.css?v=2">


  <link rel="stylesheet" media="handheld" href="css/handheld.css?v=2">

  <script src="js/libs/modernizr-1.7.min.js"></script>

</head>

<body>

  <div id="container">
    <header>
			<hgroup>
				<a href="index.html" id="home-link">
				  <img src="img/fish.png" alt="Flying fish!">
				  <h1>max edmands</h1>
				  <h2>web developer</h2>
				</a>
			</hgroup>
			<nav>
				<ul>
					<li id='portfolio-link'>
					  <a href="index.html#portfolio">
					    <span class="title">Portfolio</span>
					    <span class="description">Look at some of the stuff I've worked on</span>
					  </a>
					</li>
					<!--li id='sandbox-link'>
					  <a href="sandbox.html">
					    <span class="title">Sandbox</span>
					    <span class="description">A place for my projects</span>
					  </a>
					</li-->
					<li id='blog-link'>
					  <a href="http://blog.maxedmands.com">
					    <span class="title">Blog</span>
					    <span class="description">Thoughts about environmentalism, mostly</span>
					  </a>
					</li>
					<li id='contact-link'>
					  <a href="contact.php">
					    <span class="title">Contact</span>
					    <span class="description">Leave me a note</span>
					  </a>
					</li>
				</ul>
			</nav>
    </header>
    <section id="contact">
			<hgroup>
				<h1>Contact Me</h1>
				<h2>[Various ways you can get in touch]</h2>
			</hgroup>
      <ul class="outbound-links">
        <li><a href="http://www.linkedin.com/in/maxedmands">Read my resume on LinkedIn</a></li>
        <li><a href="http://twitter.com/thismax">Check my twitter feed</a></li>
      </ul>
      <form action="contact.php" method="post">
        <h2>Send me a message directly:</h2>
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
            print "<textarea name=\"message\"></textarea>";
          }

          print "<label>";
          print "How many letters are in my first name?";

          if(
             isset($contact_message) &&
             $contact_message['details'][0] == 'error' &&
             $contact_message['details'][1] == 'captcha'
            )
          {
            print "<input type=\"text\" name=\"captcha\" class=\"error captcha\" />";
          }
          else {
            print "<input type=\"text\" name=\"captcha\" class=\"captcha\" />";
          }

          print "(So that I know you're not a robot.)";
          print "</label>";
        ?>
        </label>
        <input type="submit" value="Send!">
      </form>
    </section>

  </div> <!--! end of #container -->

  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if necessary -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js"></script>
  <script>window.jQuery || document.write("<script src='js/libs/jquery-1.5.1.min.js'>\x3C/script>")</script>
  
  <!-- scripts concatenated and minified via ant build script-->
  <script src="js/plugins.js"></script>
  <script src="js/contact.js"></script>
  <!-- end scripts-->

  <!--[if lt ie 7 ]>
    <script src="js/libs/dd_belatedpng.js"></script>
    <script>DD_belatedPNG.fix("img, .png_bg"); // Fix any <img> or .png_bg bg-images. </script>
  <![endif]-->

  <!-- Piwik --> 
  <script type="text/javascript">
  var pkBaseURL = (("https:" == document.location.protocol) ? "https://www.analytics.maxedmands.com/" : "http://www.analytics.maxedmands.com/");
  document.write(unescape("%3Cscript src='" + pkBaseURL + "piwik.js' type='text/javascript'%3E%3C/script%3E"));
  </script><script type="text/javascript">
  try {
    var piwikTracker = Piwik.getTracker(pkBaseURL + "piwik.php", 2);
    piwikTracker.trackPageView();
    piwikTracker.enableLinkTracking();
  } catch( err ) {}
  </script><noscript><p><img src="http://www.analytics.maxedmands.com/piwik.php?idsite=2" style="border:0" alt="" /></p></noscript>
  <!-- End Piwik Tracking Tag -->

</body>
</html>

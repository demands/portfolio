<?php

  // Deal with form submissions
  if(isset($_POST['captcha'])) {
    require_once 'contact-submit.php';
  }

  // Page title
  if(isset($title)) {
    $title = "$title | Max Edmands, web developer";
  }
  else {
    $title = "Max Edmands, web developer";
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

  <title><?php print $title; ?></title>
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

  <!-- CSS concatenated and minified via ant build script-->
  <link rel="stylesheet" href="css/style.css">
  <!-- end CSS-->

  <?php /* only load typekit if we're on the correct domain or subdomain. */ ?>
  <?php if(strpos($_SERVER['HTTP_HOST'], 'maxedmands.com')): ?>
    <script type="text/javascript" src="http://use.typekit.com/mvo2bzs.js"></script>
    <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
  <?php endif; ?>

  <script src="js/libs/modernizr-1.7.min.js"></script>

</head>

<body>

  <div id="container">
    <header>
      <div class="wrap">
        <hgroup>
          <a href="/" id="home-link">
            <h1>Max Edmands</h1>
            <img src="img/fish.gif" alt="My 'flying fish' logo.">
          </a>
        </hgroup>
        <nav>
          <ul>
            <li id='about_me-link'>
              <a href="index.php" class="about_me-link">
                <span class="title">About me.</span>
              </a>
            </li>
	    <li id='portfolio-link'>
              <a href="portfolio.php" class="portfolio-link">
                <span class="title">Portfolio.</span>
              </a>
            </li>
            <li id='essays-link'>
              <a href="essays.php" class="essays-link">
                <span class="title">Essays.</span>
              </a>
            </li>
            <li id='contact-link'>
              <a href="contact.php" class="contact-link">
                <span class="title">Contact.</span>
              </a>
            </li>
          </ul>
        </nav>
      </div> <!-- end wrap -->
    </header>

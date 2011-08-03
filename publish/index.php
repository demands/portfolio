<?php
  if(isset($_POST['captcha'])) {
    require_once 'contact-submit.php';
  }
?><!doctype html>
<!--[if lt IE 7 ]><html class="no-js ie6" lang=en><![endif]-->
<!--[if IE 7 ]><html class="no-js ie7" lang=en><![endif]-->
<!--[if IE 8 ]><html class="no-js ie8" lang=en><![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class=no-js lang=en> <!--<![endif]-->
<head>
  <meta charset=utf-8>

	<meta http-equiv=cleartype content=on>
  <meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1">

  <title>Max Edmands, web developer</title>
  <meta name=description content="My online portfolio and blog.">
  <meta name=author content="Max Edmands">

	<meta name=HandheldFriendly content=True>
	<meta name=MobileOptimized content=320>
	<meta name=viewport content="width=device-width, target-densitydpi=160dpi, initial-scale=1">
	
  
	<link rel=apple-touch-icon-precomposed sizes=114x114 href="img/h/apple-touch-icon.png">
	
	<link rel=apple-touch-icon-precomposed sizes=72x72 href="img/m/apple-touch-icon.png">
	
	<link rel=apple-touch-icon-precomposed href="img/l/apple-touch-icon-precomposed.png">
	
	<link rel="shortcut icon" href="img/l/apple-touch-icon.png">
	
	
	
	<link rel=canonical href="/">

  <link rel=stylesheet href="css/style.css">


  <link rel=stylesheet media=handheld href="css/handheld.css">
  <script type="text/javascript" src="http://use.typekit.com/mvo2bzs.js"></script>
  <script type="text/javascript">try{Typekit.load()}catch(e){};</script>
  <script src="js/libs/modernizr-1.7.min.js"></script>

</head>

<body>

  <div id=container>
    <header>
      <div class=wrap>
        <hgroup>
          <a href="/" id=home-link>
            <h1>Max Edmands</h1>
            <img src="img/fish.gif" alt="My 'flying fish' logo.">
          </a>
        </hgroup>
        <nav>
          <ul>
            <li id=about-me-link>
              <a href="/#about-me" class=about-me-link>
                <span class=title>About me.</span>
              </a>
            </li>
  <li id=portfolio-link>
              <a href="/#portfolio" class=portfolio-link>
                <span class=title>Portfolio.</span>
              </a>
            </li>
            <li id=essays-link>
              <a href="/#essays" class=essays-link>
                <span class=title>Essays.</span>
              </a>
            </li>
            <li id=projects-link>
              <a href="/#projects">
                <span class=title>Projects.</span>
              </a>
            </li>
            <li id=contact-link>
              <a href="/#contact" class=contact-link>
                <span class=title>Contact.</span>
              </a>
            </li>
          </ul>
        </nav>
      </div> 
    </header>
    <section id=about-me>
      <div class=speech-bubble>
        <h1>It's awesome to meet you!</h1>
        <p>I am a <strong>web application developer</strong> who enjoys exploring the world and learning new things. I have been in this business for <span class=minutes-in-business>2039918.32</span> minutes and I still love it.</p>
        <p>Currently, I live in <strong>San Francisco California</strong>, and I work for <strong><a href="http://markerseven.org">Marker Seven Interactive</a></strong>.</p>
      </div>
      <div id=portrait>
        <img src="img/me.png" alt="A picture of me!" title="Maybe sometime I'll think of something funny to say here."/>
      </div>
    </section>
    <section id=portfolio>
			<hgroup>
				<h1>Portfolio</h1>
				<h2>I built this stuff!</h2>
			</hgroup>
			<article>
			  <header>
  				<h2>Artspan</h2>
  			</header>
  			<section class=images>
				  <img class=spot src="img/screenshots/artspan/artspan-initial.gif">
				</section>
				<section class=description>
        <p>While working for <a href="http://www.markerseven.com">Marker Seven</a>, I built this interactive social networking site for Artspan, a nonprofit whose mission is to support and connect artists in San Francisco. The site is tightly integrated with a CRM, so that Artspan can easily keep track of volunteers, donors, event participants, and local artists.</p>
				</section>
        
			</article>
			<article>
			  <header>
  				<h2>Focus the Nation</h2>
  			</header>
  			<section class=images>
  				<img class=spot src="img/screenshots/ftn/ftn-initial.gif">
  			</section>
  			<section class=description>
  				<p>Built for an environmental club at Clarkson University, this site included an Obama-style "<a href="http://www.whitehouse.gov/Openforquestions/">open for questions</a>" section, where people could submit questions that were then answered in a community meeting.</p>
  			</section>
			</article>
			<article>
			  <header>
  				<h2>Travel Learn Change</h2>
  			</header>
  			<section class=images>
  			  <img class=spot src="img/screenshots/tlc/tlc-initial.png">
  			</section>
  			<section class=description>
  				<p>The Web site for a charity that donates money to schools in Ghana and Kenya. Integrates with PayPal. Includes the functionality to create and print a customized greeting card if you have made a donation.</p>
  			</section>
			</article>
			<article>
			  <header>
  				<h2>Digital Lifelines</h2>
  			</header>
  			<section class=images>
  				<img class=spot src="img/screenshots/lifelines/lifelines-initial.png">
  			</section>
  			<section class=description>
  				<p>A program written for the Google Android, for the Android Developers Contest, V1. I worked on this with a small but awesome team of students from Clarkson University. We didn't win, but we were in the top 25% of finalists.</p>
  			</section>
			</article>
			<article>
			  <header>
  				<h2>Puzmagraphs</h2>
  			</header>
  			<section class=images>
  				<img class=spot src="img/screenshots/puzmagraphs/puzmagraphs-initial.gif">
  			</section>
  			<section class=description>
  				<p>A game similar to Picross, a classic puzzle game. Players are presented with a challenging puzzle that tests both halves of the brain. Peter Taylor Jones supplied the art, I supplied the code.</p>
  			</section>
			</article>
			<article>
			  <header>
  				<h2>Blog CMS</h2>
  			</header>
  			<section class=images>
  				<img class=spot src="img/screenshots/blog/blog-initial.gif">
  			</section>
  			<section class=description>
  				<p><a href="http://blog.maxedmands.com">My blog still runs on this hand-coded CMS.</a> I had some very specific requirements for that no existing CMS could provide, including per-post css, customizable text post-processing and a very clean, simple admin interface.</p>
  			</section>
			</article>
			<article>
			  <header>
  				<h2>Maverick Massage and Skincare Studio</h2>
  			</header>
  			<section class=images>
  				<img class=spot src="img/screenshots/spa/spa-initial.gif">
  			</section>
  			<section class=description>
  				<p>I built this Web site for a <a href="http://maverickmassageandskincare.com">family member's business</a>. It's a static site with some interesting client-facing functionality, including an interactive google map that provides you with personalized directions, and a novel take on an interactive product catalog.</p>
  			</section>
			</article>
			<article>
			  <header>
  				<h2>Kingston Midtown Business Organization</h2>
  			</header>
  			<section class=images>
  				<img class=spot src="img/screenshots/kmba/kmba-initial.gif">
  			</section>
  			<section class=description>
  				<p>An interactive Web project for a local business in my old hometown. They need a site that is easy to update, and requires minimal fuss and configuration, so I am working with them to build a custom <a href="http://wordpress.org">WordPress</a> theme.</p>
  			</section>
			</article>
		</section>
    <section id=essays>
			<hgroup>
				<h1>Essays.</h1>
				<h2>Read my thoughts, or at least some of them.</h2>
			</hgroup>
      <article class=spotlight>
        <a href="essays/08/12/20/my-life-minus-a-car/">
          <img src="essays/08/12/20/my-life-minus-a-car/main.jpg" alt="Amtrak Train">
          <hgroup>
            <h1>My life minus a car, part two</h1>
            <time datetime=2008-12-20 pubdate>December 20, 2008</time>
          </hgroup>
        </a>
      </article>

      <section class=archives>
        <h1>Archive by topic:</h1>
        <ul>
          <li><a href="essays/environment">Environment</a></li>
          <li><a href="essays/javascript">JavaScript</a></li>
          <li><a href="essays/policy">Policy</a></li>
          <li><a href="essays/music">Music</a></li>
        </ul>
        <h1>Archive by year:</h1>
        <ul>
          <li><a href="essays/11">2011</a></li>
          <li><a href="essays/10">2010</a></li>
          <li><a href="essays/09">2009</a></li>
          <li><a href="essays/08">2008</a></li>
        </ul>
      </section>
      <section class=article-list>
        <h1>Recent Essays</h1>
        <ul>
          <li><a href="essays/09/01/01/rules-for-neurotic-environmentalists/">Rules for Neurotic Environmentalists, or how to consume without feeling guilty about it.</a></li>
          <li><a href="essays/10/12/02/treehuggers-are-not-effective-environmentalists">Treehuggers are not effective environmentalists.</a></li>
          <li><a href="essays/10/02/18/imaginary-but-awesome-car-communication">Imaginary but awesome: Car Communication</a></li>
        </ul>
      </section>
    </section>
    <section id=contact>
			<hgroup>
				<h1>Contact me.</h1>
				<h2>Hopefully I'll write back!</h2>
			</hgroup>
      <form action=contact method=post>
        <label>Type your message:
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
            print "<textarea name=\"message\" class=\"message\"></textarea>";
          }
          print "</label>";

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
        <input type=submit value="Send!" class=submit>
      </form>
    </section>

  </div> 


  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
  <script>window.jQuery||document.write("<script src='js/libs/jquery-1.5.1.min.js'>\x3C/script>");</script>
  
  
  <script src='js/mylibs/jquery.scrollTo-min.js'></script>
  <script src='js/mylibs/jquery.isotope.min.js'></script>

  <script src='js/4ae8795e83545af870e096e3d8f7784e57b35488.js'></script>

  <!--[if lt IE 7 ]><script src="js/libs/dd_belatedpng.js"></script>
    <script>DD_belatedPNG.fix("img, .png_bg");</script><![endif]-->

   
  <script type="text/javascript">var pkBaseURL=(("https:"==document.location.protocol)?"https://www.analytics.maxedmands.com/":"http://www.analytics.maxedmands.com/");document.write(unescape("%3Cscript src='"+pkBaseURL+"piwik.js' type='text/javascript'%3E%3C/script%3E"));</script><script type="text/javascript">try{var piwikTracker=Piwik.getTracker(pkBaseURL+"piwik.php",2);piwikTracker.trackPageView();piwikTracker.enableLinkTracking()}catch(err){};</script><noscript><p><img src="http://www.analytics.maxedmands.com/piwik.php?idsite=2" style="border:0" alt=""/></p></noscript>
  

</body>
</html>
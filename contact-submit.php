<?php

$db = array(
  'host' => 'mysql.maxedmands.com',
  'user' => 'maxedmands',
  'pass' => 'wordpressy',
  'db' => 'blog_maxedmands'
);

$messages = array(
  'success' => array(
    'details' => array('success'),
    'text' => 'I got your message! I\'ll get back to you as soon as I can.'
  ),
  'db' => array(
    'details' => array('error', 'db'),
    'text' => 'I\'m sorry, something went wrong on my end while saving your message. I recommend trying again in an hour, or contacting me via <a href=\'http://www.linkedin.com/in/maxedmands\'>LinkedIn</a> or <a href=\'http://twitter.com/thismax\'>Twitter</a>.',
  ),
  'captcha' => array(
    'details' => array('error', 'captcha'),
    'text' => 'Oops, that\'s not the right answer to the question I asked to make sure you weren\'t a robot. You can try again though. I\'ll give you a hint: My name is the title of this site. It\'s one word, and it starts with M.'
  )
);

// Make sure the answer to the captcha question is valid
function captcha_pass($value) {
  $valid_answers = array('3', 'three', 'tres', 'drei', 'san', '11', 'eleven');
  return in_array(strtolower($value), $valid_answers);
}

// Post to database
function save_message($dbinfo, $message, $ip) {
  // Database
  $db = mysql_connect($dbinfo['host'], $dbinfo['user'], $dbinfo['pass']);
  mysql_select_db($dbinfo['db'], $db);

  // Sanitize
  $content = mysql_real_escape_string($message);
  $ip = mysql_real_escape_string($ip);

  // Save
  $result = mysql_query("INSERT INTO contact_form (content, ip) VALUES ('$message', '$ip');", $db);
  
  if(mysql_affected_rows($db) == 1) {
    return TRUE;
  }
  else {
    return mysql_error($db);
  }
}

// Figure out what to print back
function respond($js, $message) {
  if($js) {
    print json_encode($message);
    die;
  }
  else {
    global $contact_message;
    $contact_message = $message;
  }
}

// How do we respond to the user?
$js = ($_POST['js'] == 'true');

if( captcha_pass($_POST['captcha']) ) {
  $response = save_message($db, $_POST['message'], $_SERVER['REMOTE_ADDR']);
  if($response == TRUE) {
    respond($js, $messages['success']);
  }
  else {
    $message = $messages['db'];
    $message['error'] = $response;
    respond($js, $messages['db']);
  }
}
else {
  respond($js, $messages['captcha']);
}


<?php
/**
 * Using 'myapi' module
 * this page is entirely output using the 'myapi module'
 */
?>

<?php
if ($messages):
  print $messages;
endif;

/**
 * Login Form
 */
if (!$variables['logged_in']) {
  $elements = drupal_get_form("user_login");
  $form = drupal_render($elements);
  echo $form;
}

?>

<?php
  $base_url = $GLOBALS['base_url'];
  $current_path = '/' . current_path();
  $url = $base_url . $current_path;
  $context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
?>

<script>
  //bootstrap the data so no initial ajax call is required

  /**
   * Node contains all the information about blocks and views so no querie
   * string is needed just the request for the page and node ID
   * Something should contain some global data gotten from the theme settings or
   * something like that...in steve's site this would be used for the homepage text,
   * the title of the site and the contact footer bit...
   */
  <?php if (isset($node_info)) :?>
  	var bootstrap = <?php echo file_get_contents("{$base_url}/api/page/{$node_info['nid']}",false,$context) ;?>
  <?php endif; ?>

</script>



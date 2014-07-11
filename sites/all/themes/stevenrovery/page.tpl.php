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
?>


<?php
  $base_url = $GLOBALS['base_url'];
  $current_path = '/' . current_path();
  $url = $base_url . $current_path;
  $context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
  $path_to_theme = path_to_theme();


/**
 * Login Form
 */
if (!$variables['logged_in'] && $current_path === '/login') {
  $elements = drupal_get_form("user_login");
  $form = drupal_render($elements);
  echo $form;
}


?>
<header>
  <h1>{{siteName}}</h1>
</header>

<section ng-view></section>
<site-nav></site-nav>

<footer class="site__footer">
  <p>{{contactBlurb}}</p>
  <p>Contact me at <a href="#">{{contactEmail}}</a> or <a href="#">{{contactPhone}}</a></p>
</footer>

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

  	var bootstrap = <?php echo file_get_contents("{$base_url}/api/page/{$node_info['nid']}",false,$context) ;?>;
    bootstrap.tplsPath = <?php echo "\"/{$path_to_theme}/templates\""; ?>;

  <?php else: ?>

    var bootstrap = {
      tplsPath: <?php echo "\"/{$path_to_theme}/templates\""; ?>,
      menu: <?php echo file_get_contents("{$base_url}/api/menu/main-menu",false,$context); ?>,
      node: {
        nid: 0
      }
    }

  <?php endif;?>



  bootstrap.siteTitle = '<?php print $site_name; ?>';
  bootstrap.contactInfo = {
    blurb: '<?php print theme_get_setting('contact_blurb'); ?>',
    email: '<?php print theme_get_setting('contact_email'); ?>',
    phone: '<?php print theme_get_setting('contact_phone'); ?>'
  }



</script>



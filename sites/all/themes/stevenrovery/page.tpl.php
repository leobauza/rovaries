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

<section ng-controller="AppCtrl">

  <ng-view></ng-view>

  <site-nav></site-nav>

</section>



<?php
  $base_url = $GLOBALS['base_url'];
  $current_path = '/' . current_path();
  $url = $base_url . $current_path;
  $context = stream_context_create(array('http' => array('header'=>'Connection: close\r\n')));
  $path_to_theme = path_to_theme();
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
  	var bootstrap = <?php echo file_get_contents("{$base_url}/api/page/{$node_info['nid']}",false,$context) ;?>;

    bootstrap.tplsPath = <?php echo "\"{$path_to_theme}/templates\""; ?>;
  <?php else: ?>
    var bootstrap = {
      tplsPath: <?php echo "\"{$path_to_theme}/templates\""; ?>,
      menu: {
        links: []
      }
    }
  <?php endif;?>
</script>



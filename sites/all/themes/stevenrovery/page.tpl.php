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
<div class="wrapper"><div class="wrapper__inner">
  <header class="site__header" ng-cloak>
    <h1>{{siteName}}</h1>
    <a class="hamburger" href="/">
      <span></span>
      <span></span>
      <span></span>
    </a>
  </header>

  <section view-parent="{{animationAux}}" class="view-parent">
    <section ng-view ng-cloak  class="site__main {{animationClass}} {{animationAux}}"></section>
  </section>


  <nav ng-cloak class="site__nav">
    <ul>
      <li ng-class="{active:link.nid === nid, last:$last}" ng-repeat='link in links' >
        <a href="{{link.path}}">{{link.title}}</a>
      </li>
    </ul>
  </nav>

  <aside class="push"></aside>
</div></div>

<!-- <site-nav ng-cloak></site-nav> -->
<footer class="footer-wrap">
  <div class="site__footer" ng-cloak>
    <div class="footer__contact">
      <p>{{contactBlurb}}</p>
      <p>Contact me at <a class="contact__item" href>{{contactEmail}}</a> or <a class="contact__item" href>{{contactPhone}}</a></p>
    </div>
  </div>
</footer>

<!-- <div class="loading" ng-cloak></div> -->

<script>
  <?php if (isset($node_info)) :?>

  	bootstrap = <?php echo json_encode($response['page']); ?>;
    bootstrap.tplsPath = <?php echo "\"/{$path_to_theme}/templates\""; ?>;

  <?php else: ?>

    var bootstrap = {
      tplsPath: <?php echo "\"/{$path_to_theme}/templates\""; ?>,
      menu: <?php echo json_encode($response['menu']); ?>,
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
  bootstrap.views = {
    ux: <?php echo json_encode($response['ux']); ?>,
    design: <?php echo json_encode($response['design']); ?>
  };

</script>

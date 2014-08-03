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

<!-- <site-nav ng-cloak></site-nav> -->

<footer class="site__footer" ng-cloak>
  <div class="footer__contact">
    <p>{{contactBlurb}}</p>
    <p>Contact me at <a class="contact__item" href>{{contactEmail}}</a> or <a class="contact__item" href>{{contactPhone}}</a></p>
  </div>
</footer>

<!-- <div class="loading" ng-cloak></div> -->





<?php

  function multiRequest($data, $options = array()) {

    // array of curl handles
    $curly = array();
    // data to be returned
    $result = array();

    // multi handle
    $mh = curl_multi_init();

    // loop through $data and create curl handles
    // then add them to the multi-handle
    foreach ($data as $id => $d) {

      $curly[$id] = curl_init();

      $url = (is_array($d) && !empty($d['url'])) ? $d['url'] : $d;
      curl_setopt($curly[$id], CURLOPT_URL,            $url);
      curl_setopt($curly[$id], CURLOPT_HEADER,         0);
      curl_setopt($curly[$id], CURLOPT_RETURNTRANSFER, 1);

      // post?
      if (is_array($d)) {
        if (!empty($d['post'])) {
          curl_setopt($curly[$id], CURLOPT_POST,       1);
          curl_setopt($curly[$id], CURLOPT_POSTFIELDS, $d['post']);
        }
      }

      // extra options?
      if (!empty($options)) {
        curl_setopt_array($curly[$id], $options);
      }

      curl_multi_add_handle($mh, $curly[$id]);
    }

    // execute the handles
    $running = null;
    do {
      curl_multi_exec($mh, $running);
    } while($running > 0);


    // get content and remove handles
    foreach($curly as $id => $c) {
      $result[$id] = curl_multi_getcontent($c);
      curl_multi_remove_handle($mh, $c);
    }

    // all done
    curl_multi_close($mh);

    return $result;

  } //end multi

  if (isset($node_info)) {
    $api_urls = array(
      "{$base_url}/api/page/{$node_info['nid']}",
      "{$base_url}/api/view/ux_projects",
      "{$base_url}/api/view/design_projects"
    );
  } else {
    $api_urls = array(
      "{$base_url}/api/menu/main-menu",
      "{$base_url}/api/view/ux_projects",
      "{$base_url}/api/view/design_projects"
    );
  }

  $r = multiRequest($api_urls);

  // echo '<pre>';
  // print_r($r);



?>



<script>
  <?php if (isset($node_info)) :?>

  	var bootstrap = <?php echo $r[0] ;?>;
    bootstrap.tplsPath = <?php echo "\"/{$path_to_theme}/templates\""; ?>;

  <?php else: ?>

    var bootstrap = {
      tplsPath: <?php echo "\"/{$path_to_theme}/templates\""; ?>,
      menu: <?php echo $r[0]; ?>,
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
    ux: <?php echo $r[1]; ?>,
    design: <?php echo $r[2]; ?>
  }

</script>



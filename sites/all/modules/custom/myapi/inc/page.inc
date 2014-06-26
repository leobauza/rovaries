<?php
/**
 * Returns a bootstrap object
 *
 * @Resource URL
 * /api/page/ [sample: /api/page/1]
 *
 * @param $id
 * ID for the page
 */
function getPage($id) {
  // $type = node_type_load('page');
  // print json_encode($type);
  $g = $_GET;
  // foreach ($g as $k => $v) {
  //   print("{$k} is {$v} -- AND -- ");
  // }
  //print_r($g);

  $node = getNode($id);
  $menu = getMenu('main-menu');
  $views = NULL;
  $blocks = NULL;


  if(!$node) {
    return array();
  }

  //I don't need get parameters at all because I have all the
  //node information!!
  $node_lang = $node->language;
  if (isset($node->assoc_views) && isset($node->assoc_views[$node_lang])) {
    $views = $node->assoc_views[$node_lang][0]['value'];
    $views = getViews($views);
  } else {
    $views = 'no views or not a type that supports views';
  }

  if (isset($node->assoc_blocks) && isset($node->assoc_blocks[$node_lang])) {
    $blocks = $node->assoc_blocks[$node_lang][0]['value'];
    $block_parts = explode(':', $blocks);
    $blocks = getBlock($blocks);
    $blocks = array(
      $block_parts[1] => $blocks
    );
  } else {
    $blocks = 'no blocks or not a type that supports blocks';
  }


  //return $node->assoc_blocks;

  $output = array(
    'querie' => $g['q'],
    'node' => $node,
    'menu' => $menu,
    'blocks' => $blocks,
    'views' => $views
  );

  if (isset($_GET['views'])) {
    $view_names = $_GET['views'];
    $output['views'] = getViews($view_names);
  }

  return $output;
}

<?php
/**
 * Returns a json object of links in title:path format
 *
 * @Resource URL
 * /api/menu/ [sample: /api/menu/main-menu]
 *
 * @param $name
 * The name of the menu
  */
function getMenu($name) {
  $menu = menu_load_links($name);

  $menu_tree = menu_tree_all_data($name);

  $links = array();
  $children = array();

  foreach ($menu as $link) {
    $path = $link['link_path'];
    $id = $link['mlid'];
    $pid = $link['plid'];
    $title = $link['link_title'];
    $depth = $link['depth'];
    $has_children = $link['has_children'];
    $weight = $link['weight'];
    $nid = '';

    if ($path === '<front>' || $path === '') {
      $front_url = variable_get('site_frontpage', 'node');
      $front_url = drupal_get_normal_path($front_url);
      $nid = $front_url;

      $path = '/';
    } else {
      $nid = $path;

      $path = '/' . drupal_get_path_alias($path);
    }

    if ($title === '') {
      $title = 'UNTITLED';
    }

    $nid_split = explode('/', $nid);
    if ($nid_split[0] === 'node' && isset($nid_split[1])) {
      $nid = $nid_split[1];
    } else {
      $nid = NULL;
    }

    //create array
    $links[$id] = array(
      'key' => $id,
      'title' => $title,
      'path' => $path,
      'weight' => $weight,
      'nid' => $nid
    );

    if ($depth === '1' && $has_children == '1') {
      $links[$id]['has_children'] = '1';
      $links[$id]['children'] = array();
      $links[$id]['below'] = array();
    }
    if ($depth !== '1') {
      $links[$id]['depth'] = $depth;
      $children[$id] = $pid;
      // for ($i = 0; $i < $depth; $i++) {
      //   $links[$id]['p' . ($i + 1)] = $link['p' . ($i + 1)];
      // }
    }
  }


  foreach ($children as $id => $pid) {
    $links[$pid]['children'][] = array(
      'id' => (string)$id,
      'pid' => (string)$pid
    );
  }

  foreach ($links as $key => $value) {
    if (isset($links[$key]['children'])) {
      $child_ids = $links[$key]['children'];
      foreach ($child_ids as $child_id) {
        $child_id = $child_id['id'];
        $links[$key]['below'][] = $links[$child_id];
      }
    }
  }

  foreach ($links as $key => $value) {
    if (isset($links[$key]['depth'])) {
      unset($links[$key]);
    }
  }


  function cmp($a, $b) {
    if ($a['weight'] === $b['weight']) {
      return 0;
    }
    return ($a['weight'] < $b['weight']) ? -1 : 1;
  }

  usort($links, "cmp");

  $output = array(
    'links' => $links
  );

  return $output;
  //echo json_encode($menu_tree);

}